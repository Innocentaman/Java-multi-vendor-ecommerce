package services;

import dto.request.CategoryRequest;
import models.Category;
import repositories.CategoryRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;

@Singleton
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Inject
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public String create(CategoryRequest request) {

        Category existing =
                categoryRepository.findByName(
                        request.getName()
                );

        if (existing != null) {
            throw new RuntimeException(
                    "Category already exists"
            );
        }

        Category category = new Category();

        category.setName(request.getName());
        category.setDescription(
                request.getDescription()
        );

        categoryRepository.save(category);

        return "Category created successfully";
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Category getById(Long id) {

        Category category =
                categoryRepository.findById(id);

        if (category == null) {
            throw new RuntimeException(
                    "Category not found"
            );
        }

        return category;
    }
    public String update(Long id, CategoryRequest request) {

        Category category =
                categoryRepository.findById(id);

        if (category == null) {
            throw new RuntimeException(
                    "Category not found"
            );
        }

        Category existing =
                categoryRepository.findByName(
                        request.getName()
                );

        if (existing != null &&
                !existing.getId().equals(id)) {

            throw new RuntimeException(
                    "Category name already exists"
            );
        }

        category.setName(
                request.getName()
        );

        category.setDescription(
                request.getDescription()
        );

        categoryRepository.update(category);

        return "Category updated successfully";
    }

    public String delete(Long id) {

        Category category =
                categoryRepository.findById(id);

        if (category == null) {
            throw new RuntimeException(
                    "Category not found"
            );
        }

        categoryRepository.delete(category);

        return "Category deleted successfully";
    }
}