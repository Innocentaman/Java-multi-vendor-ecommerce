package controllers;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import security.AllowedRole;
import security.RoleSecured;
import services.AdminService;

import javax.inject.Inject;

public class AdminController extends Controller {

    private final AdminService adminService;

    @Inject
    public AdminController(
            AdminService adminService
    ) {
        this.adminService = adminService;
    }

    @RoleSecured({AllowedRole.ADMIN})
    public Result dashboard() {

        return ok(
                Json.toJson(
                        adminService.dashboard()
                )
        );
    }


}