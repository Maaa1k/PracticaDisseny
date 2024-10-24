import java.util.ArrayList;
import java.util.List;


//TODO Crear la clase registro y añadir el ID autoincremental
public class UserDAOInMemory  implements  UserDAO {
    static List<User> users = new ArrayList<>();

    static {
        System.out.println("-------------------------------------------------------------");
        users.add(new User("bill", "1234", 1));
        users.add(new User("libb", "4321", 2));
        users.add(new User("jhon", "dddd", 3));
        users.add(new User("bill2", "1234321", 4));
    }

    public void addUser(String username, String password){
        int id = users.size();
        id++;
        users.add(new User(username, password, id));
        for (User u : users){
            System.out.println("USERNAME: " + u.getUsr() + " PASSWORD: " + u.getPsw() + " ID: " + u.getId());
        }
    }


    @Override
    public User findByUsernameAndPassword(String username, String password) {
        for (User u : users) {
            if (u.getUsr().equals(username) && u.getPsw().equals(password)) {
                return u;
            }
        }
        //TODO Debe devolver un mensaje de error
        return null;
    }

    @Override
    public User findByUsername(String username) {
        for (User u: users){
            if(u.getUsr().equals(username)) {
                return u;
            }
        }
        return null;
    }

    //TODO Cotnrol de Errores
    @Override
    public User findUserById(int id) {
        return null;
    }
}