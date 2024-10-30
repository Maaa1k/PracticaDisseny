package Servlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@WebServlet("/dashboard")
public class DashboardServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession();


        List<String> elementos = (List<String>) session.getAttribute("elementos");
        //List<String> elementos = new ArrayList<>(Arrays.asList("Elemento 1", "Elemento 2", "Elemento 3"));

        if (elementos == null) {
            elementos = new ArrayList<>();
            // Agregar elementos adicionales
            elementos.add("test");
            elementos.add("test");
            elementos.add("test");
            elementos.add("test");
            session.setAttribute("elementos", elementos); // Almacena en la sesión
        }
        // Agregar la lista al request
        req.setAttribute("elementos", elementos);
        RequestDispatcher requestDispatcher =
                req.getRequestDispatcher("/WEB-INF/jsp/dashboard.jsp");
        requestDispatcher.forward(req, resp);

    }
}
