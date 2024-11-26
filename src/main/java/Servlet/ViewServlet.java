package Servlet;

import Service.DrawingService;
import db.DrawingDAOInMemory;
import model.Drawing;

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

@WebServlet("/newview")
public class ViewServlet extends HttpServlet {
    DrawingService drawingService = new DrawingService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Obtener el parámetro 'id' del dibujo
        String idParam = req.getParameter("id");
        System.out.println("ID DIBUJO: "+idParam);
        if (idParam == null || idParam.isEmpty()) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID de dibujo no proporcionado.");
            return;
        }

        try {
            int id = Integer.parseInt(idParam);

            // Buscar el dibujo por ID
            Drawing drawing = drawingService.getDrawingById(id);
            if (drawing == null) {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND, "Dibujo no encontrado.");
                return;
            }

            // Pasar el dibujo al JSP
            req.setAttribute("drawing", drawing);
            RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/jsp/newview.jsp");
            dispatcher.forward(req, resp);

        } catch (NumberFormatException e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID de dibujo inválido.");
        }
    }
}
