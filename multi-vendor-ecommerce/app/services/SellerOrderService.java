package services;

import dto.request.UpdateOrderStatusRequest;
import models.Order;
import models.User;
import repositories.SellerOrderRepository;
import repositories.UserRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class SellerOrderService {

    private final SellerOrderRepository sellerOrderRepository;
    private final UserRepository userRepository;

    @Inject
    public SellerOrderService(
            SellerOrderRepository sellerOrderRepository,
            UserRepository userRepository
    ) {
        this.sellerOrderRepository = sellerOrderRepository;
        this.userRepository = userRepository;
    }

    public List<Order> getSellerOrders(String email) {

        User seller = userRepository.findByEmail(email);

        return sellerOrderRepository.findOrdersBySeller(
                seller.getId()
        );
    }

    public Order updateOrderStatus(
            Long orderId,
            UpdateOrderStatusRequest request
    ) {

        Order order = sellerOrderRepository.findById(orderId);

        if (order == null) {
            throw new RuntimeException("Order not found");
        }

        order.setStatus(request.getStatus());

        sellerOrderRepository.save(order);

        return order;
    }
}