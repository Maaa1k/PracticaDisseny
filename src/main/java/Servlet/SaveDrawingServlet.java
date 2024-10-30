package Servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/saveDrawing")
public class SaveDrawingServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession();
        String drawingData = req.getParameter("drawingData");

        // Obtener la lista de dibujos de la sesión
        List<String> drawings = (List<String>) session.getAttribute("drawings");
        if (drawings == null) {
            drawings = new ArrayList<>(); // Crea la lista si no existe
            session.setAttribute("drawings", drawings); // Almacena en la sesión
        }

        // Añade el nuevo dibujo a la lista
        drawings.add(drawingData);

        // Redirige al dashboard
        resp.sendRedirect("dashboard");
    }
}
