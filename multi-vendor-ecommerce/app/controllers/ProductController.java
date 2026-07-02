package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import dto.request.ProductRequest;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import security.AllowedRole;
import security.RoleSecured;
import security.SecurityAttrs;
import services.ProductService;

import javax.inject.Inject;
import java.util.concurrent.CompletableFuture;

public class ProductController extends Controller {

    private final ProductService productService;

    @Inject
    public ProductController(
            ProductService productService
    ) {
        this.productService = productService;
    }

    @RoleSecured({AllowedRole.SELLER})
    public Result create(Http.Request request) {

        JsonNode json =
                request.body().asJson();

        ProductRequest productRequest =
                Json.fromJson(
                        json,
                        ProductRequest.class
                );

        String email =
                request.attrs()
                        .get(SecurityAttrs.EMAIL);

        return ok(
                productService.create(
                        productRequest,
                        email
                )
        );
    }
    public Result getAll() {

        return ok(
                Json.toJson(
                        productService.getAll()
                )
        );
    }
    @RoleSecured({AllowedRole.SELLER})
    public Result sellerProducts(
            Http.Request request
    ) {

        String email =
                request.attrs()
                        .get(SecurityAttrs.EMAIL);

        return ok(
                Json.toJson(
                        productService.getSellerProducts(
                                email
                        )
                )
        );
    }
    public Result search(
            Http.Request request
    ) {

        String keyword =
                request.getQueryString(
                        "keyword"
                );

        String category =
                request.getQueryString(
                        "category"
                );

        String pageParam =
                request.getQueryString(
                        "page"
                );

        String sizeParam =
                request.getQueryString(
                        "size"
                );

        String sortBy =
                request.getQueryString(
                        "sort"
                );

        String direction =
                request.getQueryString(
                        "direction"
                );

        int page =
                pageParam == null
                        ? 0
                        : Integer.parseInt(pageParam);

        int size =
                sizeParam == null
                        ? 10
                        : Integer.parseInt(sizeParam);

        if (sortBy == null) {
            sortBy = "id";
        }

        if (direction == null) {
            direction = "asc";
        }

        Long categoryId =
                category == null
                        ? null
                        : Long.parseLong(category);

        return ok(
                Json.toJson(
                        productService.search(
                                keyword,
                                categoryId,
                                page,
                                size,
                                sortBy,
                                direction
                        )
                )
        );
    }
    public Result getById(Long id) {

        return ok(
                Json.toJson(
                        productService.getById(id)
                )
        );
    }
    @RoleSecured({AllowedRole.SELLER})
    public Result update(Long id,
                         Http.Request request) {

        JsonNode json =
                request.body().asJson();

        ProductRequest productRequest =
                Json.fromJson(
                        json,
                        ProductRequest.class
                );

        String email =
                request.attrs()
                        .get(SecurityAttrs.EMAIL);

        return ok(
                productService.update(
                        id,
                        productRequest,
                        email
                )
        );
    }
    @RoleSecured({AllowedRole.SELLER})
    public Result delete(Long id,
                         Http.Request request) {

        String email =
                request.attrs()
                        .get(SecurityAttrs.EMAIL);

        return ok(
                productService.delete(
                        id,
                        email
                )
        );
    }
}