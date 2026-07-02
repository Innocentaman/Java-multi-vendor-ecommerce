package security;

import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Results;
import utils.JwtUtil;
import models.enums.Role;
import java.util.Arrays;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class RoleAuthenticator extends Action<RoleSecured> {

    @Override
    public CompletionStage<Result> call(Http.Request request) {

        String header =
                request.getHeaders()
                        .get("Authorization")
                        .orElse(null);

        if (header == null || !header.startsWith("Bearer ")) {

            return CompletableFuture.completedFuture(
                    Results.unauthorized("Missing token")
            );
        }

        String token =
                header.substring(7);

        if (!JwtUtil.validateToken(token)) {

            return CompletableFuture.completedFuture(
                    Results.unauthorized("Invalid token")
            );
        }

        String role =
                JwtUtil.extractRole(token);


        System.out.println("ROLE = " + role);
        String email =
                JwtUtil.extractEmail(token);

        boolean allowed =
                Arrays.stream(configuration.value())
                        .anyMatch(
                                r -> r.name().equals(role)
                        );

        if (!allowed) {

            return CompletableFuture.completedFuture(
                    Results.forbidden("Access denied")
            );
        }

        Http.Request updatedRequest =
                request.addAttr(
                        SecurityAttrs.EMAIL,
                        email
                );

        return delegate.call(updatedRequest);
    }
}