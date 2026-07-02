package utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET =
            "mySuperSecureJwtSecretKeyForMultiVendorEcommerce2026Project123456";

    private static final SecretKey KEY =
            Keys.hmacShaKeyFor(
                    SECRET.getBytes(StandardCharsets.UTF_8)
            );

    private static final long EXPIRATION =
            1000L * 60 * 60 * 24;

    public static String generateToken(String email, String role) {

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis() + EXPIRATION
                        )
                )
                .signWith(KEY)
                .compact();
    }
    public static String extractRole(String token) {

        Claims claims =
                Jwts.parser()
                        .verifyWith(KEY)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

        return claims.get("role", String.class);
    }
    public static String extractEmail(String token) {

        Claims claims =
                Jwts.parser()
                        .verifyWith(KEY)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

        return claims.getSubject();
    }

    public static boolean validateToken(String token) {

        try {

            Jwts.parser()
                    .verifyWith(KEY)
                    .build()
                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}