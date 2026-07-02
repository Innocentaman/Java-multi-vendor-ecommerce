# --- !Ups

CREATE TABLE carts (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,

                       user_id BIGINT NOT NULL UNIQUE,

                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,

                       CONSTRAINT fk_cart_user
                           FOREIGN KEY (user_id)
                               REFERENCES users(id)
);

CREATE TABLE cart_items (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,

                            cart_id BIGINT NOT NULL,

                            product_id BIGINT NOT NULL,

                            quantity INT NOT NULL,

                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP,

                            CONSTRAINT fk_cart_item_cart
                                FOREIGN KEY (cart_id)
                                    REFERENCES carts(id),

                            CONSTRAINT fk_cart_item_product
                                FOREIGN KEY (product_id)
                                    REFERENCES products(id)
);

# --- !Downs

DROP TABLE cart_items;
DROP TABLE carts;