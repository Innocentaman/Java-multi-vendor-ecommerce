package services;

import dto.request.RegisterRequest;
import exceptions.BusinessException;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import models.User;
import models.enums.Role;
import models.enums.UserStatus;
import repositories.UserRepository;

@Singleton
public class UserService {

    private final UserRepository userRepository;

    @Inject
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest request) {

        User existingUser =
                userRepository.findByEmail(request.getEmail());

        if (existingUser != null) {
            throw new BusinessException("Email already registered");
        }

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        // Temporary
        user.setPasswordHash(request.getPassword());

        user.setPhone(request.getPhone());

        user.setRole(Role.CUSTOMER);
        user.setStatus(UserStatus.ACTIVE);

        userRepository.save(user);

        return user;
    }
}