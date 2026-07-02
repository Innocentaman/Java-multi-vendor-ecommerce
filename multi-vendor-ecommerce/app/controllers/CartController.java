package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import dto.request.CartItemRequest;
import exceptions.BusinessException;
import exceptions.ResourceNotFoundException;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import security.Secured;
import security.SecurityAttrs;
import services.CartService;

import javax.inject.Inject;

public class CartController extends Controller {

    private final CartService cartService;

    @Inject
    public CartController(
            CartService cartService
    ) {
        this.cartService = cartService;
    }

    @Secured
    public Result addItem(
            Http.Request request
    ) {

        try {

            String email =
                    request.attrs()
                            .get(
                                    SecurityAttrs.EMAIL
                            );

            JsonNode json =
                    request.body().asJson();

            CartItemRequest cartRequest =
                    Json.fromJson(
                            json,
                            CartItemRequest.class
                    );

            return ok(
                    cartService.addToCart(
                            email,
                            cartRequest
                    )
            );

        } catch (BusinessException e) {

            return badRequest(
                    e.getMessage()
            );

        } catch (ResourceNotFoundException e) {

            return notFound(
                    e.getMessage()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return internalServerError(
                    "Something went wrong"
            );
        }
    }

    @Secured
    public Result removeItem(
            Long cartItemId,
            Http.Request request
    ) {

        try {

            String email =
                    request.attrs()
                            .get(
                                    SecurityAttrs.EMAIL
                            );

            return ok(
                    cartService.removeItem(
                            cartItemId,
                            email
                    )
            );

        } catch (BusinessException e) {

            return badRequest(
                    e.getMessage()
            );

        } catch (ResourceNotFoundException e) {

            return notFound(
                    e.getMessage()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return internalServerError(
                    "Something went wrong"
            );
        }
    }

    @Secured
    public Result updateQuantity(
            Long cartItemId,
            Http.Request request
    ) {

        try {

            JsonNode json =
                    request.body().asJson();

            Integer quantity =
                    json.get("quantity")
                            .asInt();

            String email =
                    request.attrs()
                            .get(
                                    SecurityAttrs.EMAIL
                            );

            return ok(
                    cartService.updateQuantity(
                            cartItemId,
                            quantity,
                            email
                    )
            );

        } catch (BusinessException e) {

            return badRequest(
                    e.getMessage()
            );

        } catch (ResourceNotFoundException e) {

            return notFound(
                    e.getMessage()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return internalServerError(
                    "Something went wrong"
            );
        }
    }

    @Secured
    public Result viewCart(
            Http.Request request
    ) {

        try {

            String email =
                    request.attrs()
                            .get(
                                    SecurityAttrs.EMAIL
                            );

            return ok(
                    Json.toJson(
                            cartService.viewCart(
                                    email
                            )
                    )
            );

        } catch (BusinessException e) {

            return badRequest(
                    e.getMessage()
            );

        } catch (ResourceNotFoundException e) {

            return notFound(
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