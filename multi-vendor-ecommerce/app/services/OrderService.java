package services;

import models.*;
import models.enums.OrderStatus;
import repositories.CartRepository;
import repositories.OrderRepository;
import repositories.UserRepository;
import repositories.ProductRepository;
import javax.inject.Inject;
import javax.inject.Singleton;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    @Inject
    public OrderService(
            OrderRepository orderRepository,
            CartRepository cartRepository,
            UserRepository userRepository,
            ProductRepository productRepository
    ) {

        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    public List<Order> sellerOrders(String email) {

        User seller =
                userRepository.findByEmail(email);

        return orderRepository.findBySeller(
                seller.getId()
        );
    }
    public Order checkout(String email) {

        User customer =
                userRepository.findByEmail(email);
        if(customer.getRole().name().equals("SELLER")) {

            throw new RuntimeException(
                    "Seller cannot place orders"
            );
        }
        Cart cart =
                cartRepository.findByUser(customer);

        if (cart == null ||
                cart.getCartItems() == null ||
                cart.getCartItems().isEmpty()) {

            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();

        order.setCustomer(customer);

        order.setStatus(OrderStatus.PENDING);

        BigDecimal total =
                BigDecimal.ZERO;

        List<OrderItem> orderItems =
                new ArrayList<>();

        for (CartItem cartItem : cart.getCartItems()) {

            Product product = cartItem.getProduct();

            if (product.getStockQuantity() < cartItem.getQuantity()) {

                throw new RuntimeException(
                        "Insufficient stock for product: "
                                + product.getName()
                );
            }

            product.setStockQuantity(
                    product.getStockQuantity()
                            - cartItem.getQuantity()
            );

            productRepository.save(product);

            OrderItem item = new OrderItem();

            item.setOrder(order);

            item.setProduct(product);

            item.setQuantity(
                    cartItem.getQuantity()
            );

            BigDecimal price =
                    BigDecimal.valueOf(
                            product.getPrice()
                    );

            item.setPrice(price);

            total = total.add(
                    price.multiply(
                            BigDecimal.valueOf(
                                    cartItem.getQuantity()
                            )
                    )
            );

            orderItems.add(item);
        }

        order.setTotalAmount(total);

        order.setOrderItems(orderItems);

        orderRepository.save(order);

        for (CartItem item : cart.getCartItems()) {
            item.delete();
        }

        cart.getCartItems().clear();

        cartRepository.save(cart);

        return order;
    }
    public Order cancelOrder(
            Long orderId,
            String email
    ) {

        Order order =
                orderRepository.findById(orderId);

        if (order == null) {
            throw new RuntimeException(
                    "Order not found"
            );
        }

        if (!order.getCustomer()
                .getEmail()
                .equals(email)) {

            throw new RuntimeException(
                    "Unauthorized"
            );
        }

        if (order.getStatus() ==
                OrderStatus.SHIPPED
                ||
                order.getStatus() ==
                        OrderStatus.DELIVERED
                ||
                order.getStatus() ==
                        OrderStatus.CANCELLED) {

            throw new RuntimeException(
                    "Order cannot be cancelled"
            );
        }

        for (OrderItem item :
                order.getOrderItems()) {

            Product product =
                    item.getProduct();

            product.setStockQuantity(
                    product.getStockQuantity()
                            + item.getQuantity()
            );

            productRepository.save(product);
        }

        order.setStatus(
                OrderStatus.CANCELLED
        );

        order.save();

        return order;
    }
    public List<Order> myOrders(String email) {

        User customer =
                userRepository.findByEmail(email);

        return orderRepository.findByCustomer(customer);
    }
    public Order updateStatus(
            Long orderId,
            OrderStatus newStatus
    ) {

        Order order =
                orderRepository.findById(orderId);

        if(order == null) {
            throw new RuntimeException(
                    "Order not found"
            );
        }

        OrderStatus current =
                order.getStatus();

        if(current == OrderStatus.PENDING &&
                newStatus != OrderStatus.CONFIRMED &&
                newStatus != OrderStatus.CANCELLED) {

            throw new RuntimeException(
                    "PENDING order can only be CONFIRMED or CANCELLED"
            );
        }

        if(current == OrderStatus.CONFIRMED &&
                newStatus != OrderStatus.SHIPPED &&
                newStatus != OrderStatus.CANCELLED) {

            throw new RuntimeException(
                    "CONFIRMED order can only be SHIPPED or CANCELLED"
            );
        }

        if(current == OrderStatus.SHIPPED &&
                newStatus != OrderStatus.DELIVERED) {

            throw new RuntimeException(
                    "SHIPPED order can only be DELIVERED"
            );
        }

        if(current == OrderStatus.DELIVERED ||
                current == OrderStatus.CANCELLED) {

            throw new RuntimeException(
                    "Order already completed"
            );
        }

        if(newStatus == OrderStatus.CANCELLED) {

            for(OrderItem item :
                    order.getOrderItems()) {

                Product product =
                        item.getProduct();

                product.setStockQuantity(
                        product.getStockQuantity()
                                + item.getQuantity()
                );

                productRepository.save(product);
            }
        }

        order.setStatus(newStatus);

        order.save();

        return order;
    }
}