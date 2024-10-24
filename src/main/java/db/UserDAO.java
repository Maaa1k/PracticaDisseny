package db;
import model.User;

public interface UserDAO {
    User findByUsernameAndPassword(String username, String password);

    User findByUsername(String username);

    User findUserById(int id);
}