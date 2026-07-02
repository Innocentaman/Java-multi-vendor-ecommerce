package repositories;

import io.ebean.DB;
import models.Category;

import javax.inject.Singleton;
import java.util.List;

@Singleton
public class CategoryRepository {

    public void save(Category category) {
        DB.save(category);
    }

    public Category findById(Long id) {
        return DB.find(Category.class, id);
    }

    public List<Category> findAll() {
        return DB.find(Category.class).findList();
    }

    public void delete(Category category) {
        DB.delete(category);
    }
    public void update(Category category) {
        DB.update(category);
    }
    public Category findByName(String name) {
        return DB.find(Category.class)
                .where()
                .eq("name", name)
                .findOne();
    }
    public long countAll() {

        return DB.find(Category.class)
                .findCount();
    }
}