package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import security.AllowedRole;
import security.RoleSecured;

public class TestController extends Controller {

    @RoleSecured({AllowedRole.ADMIN})
    public Result adminApi() {

        return ok("Admin API");
    }

    @RoleSecured({AllowedRole.SELLER})
    public Result sellerApi() {

        return ok("Seller API");
    }

    @RoleSecured({AllowedRole.CUSTOMER})
    public Result customerApi() {

        return ok("Customer API");
    }
}