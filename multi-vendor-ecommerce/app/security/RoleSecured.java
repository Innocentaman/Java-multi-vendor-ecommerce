package security;

import java.lang.annotation.*;
import play.mvc.With;

@With(RoleAuthenticator.class)
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface RoleSecured {

    AllowedRole[] value();
}