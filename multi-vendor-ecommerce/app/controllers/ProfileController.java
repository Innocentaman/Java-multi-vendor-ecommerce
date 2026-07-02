package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.User;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import repositories.UserRepository;
import security.Secured;
import security.SecurityAttrs;

import javax.inject.Inject;

public class ProfileController extends Controller {

    private final UserRepository userRepository;

    @Inject
    public ProfileController(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Secured
    public Result profile(Http.Request request) {

        String email =
                request.attrs()
                        .get(SecurityAttrs.EMAIL);

        User user =
                userRepository.findByEmail(email);

        ObjectNode response =
                Json.newObject();

        response.put(
                "email",
                user.getEmail()
        );

        response.put(
                "role",
                user.getRole().name()
        );

        return ok(response);
    }
}