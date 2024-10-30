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
import java.util.List;

@WebServlet("/dashboard")
public class DashboardServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession();
        List<String> elementos = (List<String>) session.getAttribute("elementos");
        List<String> drawings = (List<String>) session.getAttribute("drawings"); // Obtener dibujos

        if (elementos == null) {
            elementos = new ArrayList<>();
            session.setAttribute("elementos", elementos);
        }

        req.setAttribute("elementos", elementos);
        req.setAttribute("drawings", drawings); // Pasar dibujos al JSP

        RequestDispatcher requestDispatcher =
                req.getRequestDispatcher("/WEB-INF/jsp/dashboard.jsp");
        requestDispatcher.forward(req, resp);
    }
}
