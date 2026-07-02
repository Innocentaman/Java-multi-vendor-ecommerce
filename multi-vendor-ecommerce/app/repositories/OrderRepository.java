package repositories;

import io.ebean.DB;
import models.Order;
import models.User;

import javax.inject.Singleton;
import java.util.List;

@Singleton
public class OrderRepository {

    public void save(Order order) {
        order.save();
    }
    public Order findById(Long orderId) {

        return DB.find(Order.class)
                .fetch("orderItems")
                .fetch("orderItems.product")
                .where()
                .idEq(orderId)
                .findOne();
    }
    public long countAll() {

        return DB.find(Order.class)
                .findCount();
    }
    public List<Order> findBySeller(Long sellerId) {

        return DB.find(Order.class)
                .fetch("customer")
                .fetch("orderItems")
                .fetch("orderItems.product")
                .where()
                .eq(
                        "orderItems.product.seller.id",
                        sellerId
                )
                .findList();
    }
    public List<Order> findByCustomer(User customer) {

        return DB.find(Order.class)
                .fetch("orderItems")
                .fetch("orderItems.product")
                .where()
                .eq("customer", customer)
                .findList();
    }
}