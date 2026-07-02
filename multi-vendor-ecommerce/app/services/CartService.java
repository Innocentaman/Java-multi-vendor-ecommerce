package services;

import dto.request.CartItemRequest;
import exceptions.BusinessException;
import exceptions.ResourceNotFoundException;
import models.*;
import repositories.*;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class CartService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Inject
    public CartService(
            UserRepository userRepository,
            ProductRepository productRepository,
            CartRepository cartRepository,
            CartItemRepository cartItemRepository
    ) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }
    public String removeItem(
            Long cartItemId,
            String email
    ) {

        User user =
                userRepository.findByEmail(email);

        Cart cart =
                cartRepository.findByUser(user);

        if (cart == null) {

            throw new ResourceNotFoundException(
                    "Cart not found"
            );
        }

        CartItem item =
                cartItemRepository.findById(
                        cartItemId
                );

        if (item == null) {

            throw new ResourceNotFoundException(
                    "Cart item not found"
            );
        }

        if (!item.getCart()
                .getId()
                .equals(cart.getId())) {

            throw new BusinessException(
                    "Unauthorized"
            );
        }

        cartItemRepository.delete(item);

        return "Item removed from cart";
    }
    public String updateQuantity(
            Long cartItemId,
            Integer quantity,
            String email
    ) {

        User user =
                userRepository.findByEmail(email);

        Cart cart =
                cartRepository.findByUser(user);

        if (cart == null) {

            throw new ResourceNotFoundException(
                    "Cart not found"
            );
        }

        CartItem cartItem =
                cartItemRepository.findById(
                        cartItemId
                );

        if (cartItem == null) {

            throw new ResourceNotFoundException(
                    "Cart item not found"
            );
        }

        if (!cartItem.getCart()
                .getId()
                .equals(cart.getId())) {

            throw new BusinessException(
                    "Unauthorized"
            );
        }

        if (quantity <= 0) {

            cartItemRepository.delete(
                    cartItem
            );

            return "Item removed";
        }

        Product product =
                cartItem.getProduct();

        if (product.getStockQuantity() <= 0) {

            throw new BusinessException(
                    "This product is out of stock."
            );
        }

        if (quantity >
                product.getStockQuantity()) {

            throw new BusinessException(
                    "Only "
                            + product.getStockQuantity()
                            + " item(s) available in stock."
            );
        }

        cartItem.setQuantity(
                quantity
        );

        cartItemRepository.update(
                cartItem
        );

        return "Quantity updated";
    }
    public String addToCart(
            String email,
            CartItemRequest request
    ) {

        User user =
                userRepository.findByEmail(email);

        if (!user.getRole()
                .name()
                .equals("CUSTOMER")) {

            throw new BusinessException(
                    "Only customers can use cart."
            );
        }

        Product product =
                productRepository.findById(
                        request.getProductId()
                );

        if (product == null) {

            throw new ResourceNotFoundException(
                    "Product not found."
            );
        }

        if (product.getStockQuantity() <= 0) {

            throw new BusinessException(
                    "This product is out of stock."
            );
        }

        Cart cart =
                cartRepository.findByUser(user);

        if (cart == null) {

            cart = new Cart();

            cart.setUser(user);

            cartRepository.save(cart);
        }

        CartItem existing =
                cartItemRepository.findByCartAndProduct(
                        cart,
                        product
                );

        if (existing != null) {

            int newQuantity =
                    existing.getQuantity()
                            + request.getQuantity();

            if (newQuantity >
                    product.getStockQuantity()) {

                throw new BusinessException(
                        "Only "
                                + product.getStockQuantity()
                                + " item(s) available in stock."
                );
            }

            existing.setQuantity(
                    newQuantity
            );

            cartItemRepository.update(
                    existing
            );

        } else {

            if (request.getQuantity() >
                    product.getStockQuantity()) {

                throw new BusinessException(
                        "Only "
                                + product.getStockQuantity()
                                + " item(s) available in stock."
                );
            }

            CartItem cartItem =
                    new CartItem();

            cartItem.setCart(cart);

            cartItem.setProduct(product);

            cartItem.setQuantity(
                    request.getQuantity()
            );

            cartItemRepository.save(
                    cartItem
            );
        }

        return "Item added to cart";
    }

    public List<CartItem> viewCart(
            String email
    ) {

        User user =
                userRepository.findByEmail(email);

        Cart cart =
                cartRepository.findByUser(user);

        if (cart == null) {
            return List.of();
        }

        return cartItemRepository.findByCart(cart);
    }
}