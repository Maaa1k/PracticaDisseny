import java.util.ArrayList;
import java.util.List;


//TODO Crear la clase registro y añadir el ID autoincremental
public class UserDAOInMemory  implements  UserDAO{
    static List<User> users = new ArrayList<>();

    static {
        System.out.println("-------------------------------------------------------------");
        users.add(new User("bill", "1234", 1));
        users.add(new User("libb", "4321", 2));
        users.add(new User("jhon", "dddd", 4) );
        users.add(new User("bill2", "1234321", 4));
    }

    @Override
    public User findByUsernameAndPassword(String username, String password){
        for (User u: users){
            if(u.getUsr().equals(username)&& u.getPsw().equals(password)){
                return u;
            }
        }
        return null;
    };

}