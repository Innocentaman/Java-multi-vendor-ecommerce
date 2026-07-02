package repositories;

import io.ebean.DB;
import models.Order;

import javax.inject.Singleton;
import java.util.List;

@Singleton
public class SellerOrderRepository {

    public List<Order> findOrdersBySeller(Long sellerId) {

        return DB.find(Order.class)
                .fetch("orderItems")
                .fetch("orderItems.product")
                .where()
                .eq("orderItems.product.seller.id", sellerId)
                .findList();
    }

    public Order findById(Long id) {

        return DB.find(Order.class)
                .fetch("orderItems")
                .fetch("orderItems.product")
                .where()
                .eq("id", id)
                .findOne();
    }

    public void save(Order order) {
        order.save();
    }
}