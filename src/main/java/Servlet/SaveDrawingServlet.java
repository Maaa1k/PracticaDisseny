package Servlet;

import Service.DrawingService;
import Service.LoginService;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import model.Drawing;
import model.Shape;
import model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

@WebServlet("/saveDrawing")
public class SaveDrawingServlet extends HttpServlet {
    DrawingService db = new DrawingService();
    LoginService udb = new LoginService();


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String dataJson = request.getParameter("drawingData");
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }
        String username = (String) request.getSession().getAttribute("user");
        User user = udb.getUserByName(username);
        if (dataJson != null && !dataJson.isEmpty()) {

            Gson gson = new Gson();
            try {
                Type figureType = new TypeToken<List<Shape>>() {}.getType();
                List<Shape> shapes = gson.fromJson(dataJson, figureType);
                Drawing drawing = new Drawing(user.getName(), user.getId(), user.getUsr(), shapes);
                db.addDraw(drawing);
                request.setAttribute("drawings", drawing);

                response.sendRedirect("dashboard");
            } catch (JsonSyntaxException e) {
                e.printStackTrace();
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Error al procesar el JSON.");
            }
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "El dibujo no se recibió correctamente.");
        }
    }
}


