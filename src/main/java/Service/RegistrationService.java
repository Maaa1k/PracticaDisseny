package Service;

import java.awt.*;
import java.util.regex.Pattern;
import db.*;
import errorhandler.*;

public class RegistrationService {

    public boolean passRegex(String password) {
        String regex = "^.{5,20}$";

        Pattern pattern = Pattern.compile(regex);
        return pattern.matcher(password).matches();
    }

    public ErrorCodes checkPass(String pass) {
        if (!passRegex(pass)) {
            //TODO Lógica de password
            if (pass.length() < 5
            ) {
                return ErrorCodes.SHORTPASS;
            }
            if (pass.length() > 20) {
                return ErrorCodes.LONGPASS;
            }
        }
        return ErrorCodes.OK;
    }

    public ErrorCodes registerUser(String username, String password) {
        UserDAOInMemory db = new UserDAOInMemory();
        if (db.findByUsername(username) == null)/* CHECK IF USER EXIST*/ {
            if (!passRegex(password)) {
                //TODO Lógica de password
                if (password.length() < 5
                ) {
                    return ErrorCodes.SHORTPASS;
                }
                if (password.length() > 20) {
                    return ErrorCodes.LONGPASS;
                }
            }
            db.addUser(username, password);
            System.out.println("ADD USER");
            return ErrorCodes.OK;
        }
        return ErrorCodes.USERNXIST;
    }
}
