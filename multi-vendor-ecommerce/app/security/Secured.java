package security;

import play.mvc.With;

import java.lang.annotation.*;

@With(JwtAuthenticator.class)
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Secured {
}