package services;

import dto.request.ProductRequest;
import models.Category;
import models.Product;
import models.User;
import models.enums.ProductStatus;
import repositories.CategoryRepository;
import repositories.ProductRepository;
import repositories.UserRepository;
import java.util.List;
import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Inject
    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository,
                          UserRepository userRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }
    public List<Product> getAll() {

        return productRepository
                .findActiveProducts();
    }
    public Product getById(Long id) {

        Product product =
                productRepository.findById(id);

        if (product == null) {

            throw new RuntimeException(
                    "Product not found"
            );
        }

        return product;
    }
    public List<Product> getSellerProducts(
            String sellerEmail
    ) {

        User seller =
                userRepository.findByEmail(
                        sellerEmail
                );

        return productRepository.findBySeller(
                seller.getId()
        );
    }
    public String update(Long id,
                         ProductRequest request,
                         String sellerEmail) {

        Product product =
                productRepository.findById(id);

        if (product == null) {

            throw new RuntimeException(
                    "Product not found"
            );
        }

        if (!product.getSeller()
                .getEmail()
                .equals(sellerEmail)) {

            throw new RuntimeException(
                    "You can update only your products"
            );
        }

        Category category =
                categoryRepository.findById(
                        request.getCategoryId()
                );

        if (category == null) {

            throw new RuntimeException(
                    "Category not found"
            );
        }

        product.setName(
                request.getName()
        );

        product.setDescription(
                request.getDescription()
        );

        product.setPrice(
                request.getPrice()
        );

        product.setStockQuantity(
                request.getStockQuantity()
        );

        product.setImageUrl(
                request.getImageUrl()
        );

        product.setCategory(
                category
        );

        productRepository.update(product);

        return "Product updated successfully";
    }
    public String delete(Long id,
                         String sellerEmail) {

        Product product =
                productRepository.findById(id);

        if (product == null) {

            throw new RuntimeException(
                    "Product not found"
            );
        }

        if (!product.getSeller()
                .getEmail()
                .equals(sellerEmail)) {

            throw new RuntimeException(
                    "You can delete only your products"
            );
        }

        product.setStatus(
                ProductStatus.INACTIVE
        );

        productRepository.update(product);

        return "Product deactivated successfully";

    }

    public String create(ProductRequest request,
                         String sellerEmail) {

        User seller =
                userRepository.findByEmail(
                        sellerEmail
                );

        if (seller == null) {
            throw new RuntimeException(
                    "Seller not found"
            );
        }

        Category category =
                categoryRepository.findById(
                        request.getCategoryId()
                );

        if (category == null) {
            throw new RuntimeException(
                    "Category not found"
            );
        }

        Product product = new Product();

        product.setName(
                request.getName()
        );

        product.setDescription(
                request.getDescription()
        );

        product.setPrice(
                request.getPrice()
        );

        product.setStockQuantity(
                request.getStockQuantity()
        );

        product.setImageUrl(
                request.getImageUrl()
        );

        product.setSeller(
                seller
        );

        product.setCategory(
                category
        );

        product.setStatus(
                ProductStatus.ACTIVE
        );

        productRepository.save(
                product
        );

        return "Product created successfully";
    }
    public List<Product> search(
            String keyword,
            Long categoryId,
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        return productRepository.search(
                keyword,
                categoryId,
                page,
                size,
                sortBy,
                direction
        );
    }

}