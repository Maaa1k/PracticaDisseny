public interface UserDAO {
    User findByUsernameAndPassword(String username, String password, int id);
}