package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import dto.request.LoginRequest;
import dto.request.RegisterRequest;
import exceptions.BusinessException;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import services.AuthService;

import javax.inject.Inject;

public class AuthController extends Controller {

    private final AuthService authService;

    @Inject
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    public Result register(Http.Request request) {

        try {

            JsonNode json =
                    request.body().asJson();

            RegisterRequest registerRequest =
                    Json.fromJson(
                            json,
                            RegisterRequest.class
                    );

            String result =
                    authService.register(
                            registerRequest
                    );

            return ok(result);

        } catch (BusinessException e) {

            return badRequest(
                    e.getMessage()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return internalServerError(
                    "Something went wrong"
            );
        }
    }

    public Result login(Http.Request request) {

        try {

            JsonNode json =
                    request.body().asJson();

            LoginRequest loginRequest =
                    Json.fromJson(
                            json,
                            LoginRequest.class
                    );

            String token =
                    authService.login(
                            loginRequest
                    );

            return ok(token);

        } catch (BusinessException e) {

            return unauthorized(
                    e.getMessage()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return internalServerError(
                    "Something went wrong"
            );
        }
    }
}