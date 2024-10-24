import java.util.regex.Pattern;

public class RegistrationServlet {


    public boolean checkPassword(String password){
        String regex = "^.{5,}$";

        Pattern pattern = Pattern.compile(regex);
        return pattern.matcher(password).matches();
    }
    public boolean registerUser(String username, String password) {
        UserDAOInMemory db = new UserDAOInMemory();
        // Lógica para guardar el usuario en la base de datos
        // Aquí debes comprobar si el usuario ya existe y si no, crear uno nuevo
        // Devuelve true si el registro fue exitoso, de lo contrario false
        // Ejemplo simple, deberías usar una base de datos
        //TODO

        if (db.findByUsername(username) == null)/* usuario ya existe */ {
            if(!checkPassword(password)) {
                System.out.println("ERROR SHORT PASSWORD");
                return false;
            }
            db.addUser(username, password);
            return true;
        }
        // Guardar el nuevo usuario
        System.out.println("DATABASE ERROR");
        return false;
    }
}
