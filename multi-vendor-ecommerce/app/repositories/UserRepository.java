package repositories;

import io.ebean.DB;
import models.User;

import javax.inject.Singleton;

@Singleton
public class UserRepository {

    public User findByEmail(String email) {
        return DB.find(User.class)
                .where()
                .eq("email", email)
                .findOne();
    }
    public User findById(Long id) {
        return DB.find(User.class, id);
    }
    public long countAll() {

        return DB.find(User.class)
                .findCount();
    }

    public long countByRole(String role) {

        return DB.find(User.class)
                .where()
                .eq("role", role)
                .findCount();
    }
    public void save(User user) {
        DB.save(user);
    }
}