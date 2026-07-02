package repositories;

import io.ebean.DB;
import models.Cart;
import models.CartItem;
import models.Product;

import javax.inject.Singleton;
import java.util.List;

@Singleton
public class CartItemRepository {

    public CartItem findByCartAndProduct(
            Cart cart,
            Product product
    ) {

        return DB.find(CartItem.class)
                .where()
                .eq("cart.id", cart.getId())
                .eq("product.id", product.getId())
                .findOne();
    }

    public void save(CartItem cartItem) {
        DB.save(cartItem);
    }

    public void update(CartItem cartItem) {
        DB.update(cartItem);
    }
    public CartItem findById(Long id) {

        return DB.find(
                CartItem.class,
                id
        );
    }

    public void delete(
            CartItem cartItem
    ) {

        DB.delete(cartItem);
    }
    public List<CartItem> findByCart(Cart cart) {

        return DB.find(CartItem.class)
                .fetch("product")
                .where()
                .eq("cart.id", cart.getId())
                .findList();
    }
}