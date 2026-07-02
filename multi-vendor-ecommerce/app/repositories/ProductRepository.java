package repositories;

import io.ebean.DB;
import io.ebean.Query;
import models.Product;
import models.enums.ProductStatus;

import javax.inject.Singleton;
import java.util.List;

@Singleton
public class ProductRepository {

    public void save(Product product) {
        DB.save(product);
    }

    public Product findById(Long id) {
        return DB.find(Product.class, id);
    }
    public List<Product> findAll() {
        return DB.find(Product.class).findList();
    }
    public List<Product> search(
            String keyword,
            Long categoryId,
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        var query = DB.find(Product.class);

        if (keyword != null && !keyword.isBlank()) {
            query.where().icontains("name", keyword);
        }

        if (categoryId != null) {
            query.where().eq("category.id", categoryId);
        }
        query.where()
                .eq("status", ProductStatus.ACTIVE);
        query.orderBy(sortBy + " " + direction);

        query.setFirstRow(page * size);
        query.setMaxRows(size);

        return query.findList();
    }
    public List<Product> findBySeller(Long sellerId) {

        return DB.find(Product.class)
                .where()
                .eq("seller.id", sellerId)
                .findList();
    }
    public long countAll() {

        return DB.find(Product.class)
                .findCount();
    }
    public List<Product> findActiveProducts() {

        return DB.find(Product.class)
                .where()
                .eq("status", ProductStatus.ACTIVE)
                .findList();
    }
    public void update(Product product) {
        DB.update(product);
    }

    public void delete(Product product) {
        DB.delete(product);
    }

}