package repositories;

import io.ebean.DB;
import models.Cart;
import models.User;

import javax.inject.Singleton;

@Singleton
public class CartRepository {

    public Cart findByUser(User user) {

        return DB.find(Cart.class)
                .where()
                .eq("user.id", user.getId())
                .findOne();
    }

    public void save(Cart cart) {
        DB.save(cart);
    }
}