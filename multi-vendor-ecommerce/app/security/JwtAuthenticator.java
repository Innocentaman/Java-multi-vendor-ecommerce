package security;

import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Results;
import utils.JwtUtil;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class JwtAuthenticator extends Action<Secured> {

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

        String email =
                JwtUtil.extractEmail(token);

        Http.Request updatedRequest =
                request.addAttr(
                        SecurityAttrs.EMAIL,
                        email
                );

        return delegate.call(updatedRequest);
    }
}