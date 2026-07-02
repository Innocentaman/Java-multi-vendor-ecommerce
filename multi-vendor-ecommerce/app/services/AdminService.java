package services;

import dto.response.AdminDashboardResponse;
import repositories.CategoryRepository;
import repositories.OrderRepository;
import repositories.ProductRepository;
import repositories.UserRepository;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class AdminService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OrderRepository orderRepository;

    @Inject
    public AdminService(
            UserRepository userRepository,
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            OrderRepository orderRepository
    ) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.orderRepository = orderRepository;
    }

    public AdminDashboardResponse dashboard() {

        AdminDashboardResponse response =
                new AdminDashboardResponse();

        response.setTotalUsers(
                userRepository.countAll()
        );

        response.setTotalCustomers(
                userRepository.countByRole("CUSTOMER")
        );

        response.setTotalSellers(
                userRepository.countByRole("SELLER")
        );

        response.setTotalProducts(
                productRepository.countAll()
        );

        response.setTotalCategories(
                categoryRepository.countAll()
        );

        response.setTotalOrders(
                orderRepository.countAll()
        );

        return response;
    }
}