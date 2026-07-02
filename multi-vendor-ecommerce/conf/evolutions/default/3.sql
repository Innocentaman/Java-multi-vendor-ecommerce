# --- !Ups

CREATE TABLE products (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,

                          name VARCHAR(255) NOT NULL,

                          description TEXT,

                          price DECIMAL(12,2) NOT NULL,

                          stock_quantity INT NOT NULL,

                          image_url VARCHAR(500),

                          status VARCHAR(30) NOT NULL,

                          seller_id BIGINT NOT NULL,

                          category_id BIGINT NOT NULL,

                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,

                          CONSTRAINT fk_product_seller
                              FOREIGN KEY (seller_id)
                                  REFERENCES users(id),

                          CONSTRAINT fk_product_category
                              FOREIGN KEY (category_id)
                                  REFERENCES categories(id)
);

# --- !Downs

DROP TABLE products;