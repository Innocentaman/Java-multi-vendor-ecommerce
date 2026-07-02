# --- !Ups

CREATE TABLE orders (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,

                        customer_id BIGINT NOT NULL,

                        total_amount DECIMAL(12,2) NOT NULL,

                        status VARCHAR(30) NOT NULL,

                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP,

                        CONSTRAINT fk_order_customer
                            FOREIGN KEY (customer_id)
                                REFERENCES users(id)
);

CREATE TABLE order_items (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,

                             order_id BIGINT NOT NULL,

                             product_id BIGINT NOT NULL,

                             quantity INT NOT NULL,

                             price DECIMAL(12,2) NOT NULL,

                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                             CONSTRAINT fk_order_item_order
                                 FOREIGN KEY (order_id)
                                     REFERENCES orders(id),

                             CONSTRAINT fk_order_item_product
                                 FOREIGN KEY (product_id)
                                     REFERENCES products(id)
);

# --- !Downs

DROP TABLE order_items;
DROP TABLE orders;