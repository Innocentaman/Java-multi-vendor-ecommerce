package services;

import dto.request.LoginRequest;
import dto.request.RegisterRequest;
import exceptions.BusinessException;
import models.User;
import models.enums.Role;
import models.enums.UserStatus;
import repositories.UserRepository;
import utils.JwtUtil;
import utils.PasswordUtil;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class AuthService {

    private final UserRepository userRepository;

    @Inject
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(RegisterRequest request) {

        User existing =
                userRepository.findByEmail(
                        request.getEmail()
                );

        if (existing != null) {
            throw new BusinessException(
                    "Email already exists"
            );
        }

        User user = new User();

        user.setFirstName(
                request.getFirstName()
        );

        user.setLastName(
                request.getLastName()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPasswordHash(
                PasswordUtil.hashPassword(
                        request.getPassword()
                )
        );

        user.setPhone(
                request.getPhone()
        );

        user.setRole(
                Role.valueOf(
                        request.getRole()
                                .toUpperCase()
                )
        );

        user.setStatus(
                UserStatus.ACTIVE
        );

        userRepository.save(user);

        return "User registered successfully";
    }

    public String login(LoginRequest request) {

        User user =
                userRepository.findByEmail(
                        request.getEmail()
                );

        if (user == null) {

            throw new BusinessException(
                    "Invalid email or password"
            );
        }

        boolean valid =
                PasswordUtil.verifyPassword(
                        request.getPassword(),
                        user.getPasswordHash()
                );

        if (!valid) {

            throw new BusinessException(
                    "Invalid email or password"
            );
        }

        return JwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );
    }
}