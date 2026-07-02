package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import dto.request.CategoryRequest;
import models.Category;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import security.AllowedRole;
import security.RoleSecured;
import services.CategoryService;

import javax.inject.Inject;
import java.util.List;

public class CategoryController extends Controller {

    private final CategoryService categoryService;

    @Inject
    public CategoryController(
            CategoryService categoryService
    ) {
        this.categoryService = categoryService;
    }

    @RoleSecured({AllowedRole.ADMIN})
    public Result create(Http.Request request) {

        JsonNode json =
                request.body().asJson();

        CategoryRequest categoryRequest =
                Json.fromJson(
                        json,
                        CategoryRequest.class
                );

        return ok(
                categoryService.create(
                        categoryRequest
                )
        );
    }

    public Result getAll() {

        List<Category> categories =
                categoryService.getAll();

        return ok(Json.toJson(categories));
    }
    @RoleSecured({AllowedRole.ADMIN})
    public Result update(Long id,
                         Http.Request request) {

        JsonNode json =
                request.body().asJson();

        CategoryRequest categoryRequest =
                Json.fromJson(
                        json,
                        CategoryRequest.class
                );

        return ok(
                categoryService.update(
                        id,
                        categoryRequest
                )
        );
    }
    public Result getById(Long id) {

        Category category =
                categoryService.getById(id);

        return ok(Json.toJson(category));
    }

    @RoleSecured({AllowedRole.ADMIN})
    public Result delete(Long id) {

        return ok(
                categoryService.delete(id)
        );
    }
}