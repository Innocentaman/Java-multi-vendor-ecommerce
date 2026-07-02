package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import dto.request.UpdateOrderStatusRequest;
import models.Order;
import play.libs.Json;
import play.mvc.*;
import security.RoleSecured;
import security.AllowedRole;
import services.SellerOrderService;

import javax.inject.Inject;
import java.util.List;

public class SellerOrderController extends Controller {

    private final SellerOrderService sellerOrderService;

    @Inject
    public SellerOrderController(
            SellerOrderService sellerOrderService
    ) {
        this.sellerOrderService = sellerOrderService;
    }

    @RoleSecured({AllowedRole.SELLER})
    public Result getSellerOrders(Http.Request request) {

        String email = request.attrs()
                .get(security.SecurityAttrs.EMAIL);

        List<Order> orders =
                sellerOrderService.getSellerOrders(email);

        return ok(Json.toJson(orders));
    }

    @RoleSecured({AllowedRole.SELLER})
    public Result updateStatus(
            Long orderId,
            Http.Request request
    ) {

        JsonNode json = request.body().asJson();

        UpdateOrderStatusRequest dto =
                Json.fromJson(
                        json,
                        UpdateOrderStatusRequest.class
                );

        Order order =
                sellerOrderService.updateOrderStatus(
                        orderId,
                        dto
                );

        return ok(Json.toJson(order));
    }
}