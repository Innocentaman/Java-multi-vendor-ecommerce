package controllers;

import models.Order;
import security.AllowedRole;
import play.libs.Json;
import play.mvc.*;
import security.RoleSecured;
import security.SecurityAttrs;
import services.OrderService;
import dto.request.UpdateOrderStatusRequest;
import play.libs.Json;
import play.mvc.Http;
import security.AllowedRole;
import javax.inject.Inject;
import java.util.List;

public class OrderController extends Controller {

    private final OrderService orderService;

    @Inject
    public OrderController(
            OrderService orderService
    ) {
        this.orderService = orderService;
    }
    @RoleSecured({AllowedRole.SELLER})
    public Result sellerOrders(Http.Request request) {

        String email =
                request.attrs().get(
                        security.SecurityAttrs.EMAIL
                );

        return ok(
                Json.toJson(
                        orderService.sellerOrders(email)
                )
        );
    }
    @RoleSecured({AllowedRole.CUSTOMER})
    public Result cancelOrder(
            Long orderId,
            Http.Request request
    ) {

        String email =
                request.attrs()
                        .get(
                                SecurityAttrs.EMAIL
                        );

        return ok(
                Json.toJson(
                        orderService.cancelOrder(
                                orderId,
                                email
                        )
                )
        );
    }
    @RoleSecured({AllowedRole.CUSTOMER})
    public Result checkout(Http.Request request) {

        String email =
                request.attrs()
                        .get(
                                security.SecurityAttrs.EMAIL
                        );

        Order order =
                orderService.checkout(email);

        return ok(
                Json.toJson(order)
        );
    }
    @RoleSecured({AllowedRole.SELLER})
    public Result updateOrderStatus(
            Long orderId,
            Http.Request request
    ) {

        UpdateOrderStatusRequest dto =
                Json.fromJson(
                        request.body().asJson(),
                        UpdateOrderStatusRequest.class
                );

        return ok(
                Json.toJson(
                        orderService.updateStatus(
                                orderId,
                                dto.getStatus()
                        )
                )
        );
    }
    @RoleSecured({AllowedRole.CUSTOMER})
    public Result myOrders(Http.Request request) {

        String email =
                request.attrs()
                        .get(
                                security.SecurityAttrs.EMAIL
                        );

        List<Order> orders =
                orderService.myOrders(email);

        return ok(
                Json.toJson(orders)
        );
    }
}