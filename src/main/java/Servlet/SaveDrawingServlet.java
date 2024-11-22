package Servlet;

import Service.DrawingService;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import db.DrawingDAO;
import db.DrawingDAOInMemory;
import model.Drawing;
import model.Shape;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

@WebServlet("/saveDrawing")
public class SaveDrawingServlet extends HttpServlet {
    DrawingService db = new DrawingService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String dataJson = request.getParameter("drawingData");
        String user = (String) request.getSession().getAttribute("user");
        if (user == null){
            user = "lol";
        }
        //Función para hacer id al dibujo
        if (dataJson != null && !dataJson.isEmpty()) {

            Gson gson = new Gson();
            try {
                Type figureType = new TypeToken<List<Shape>>() {}.getType();
                List<Shape> shapes = gson.fromJson(dataJson, figureType);
                Drawing drawing = new Drawing(1,user, 1, user, shapes);
                //db.addDraw(drawing);
                //Drawing drawing = gson.fromJson(dataJson, Drawing.class);
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


