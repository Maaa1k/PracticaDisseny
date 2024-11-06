package Servlet;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import db.DrawingDAOInMemory;
import model.Drawing;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;


@WebServlet("/saveDrawing")
public class SaveDrawingServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String dataJson = request.getParameter("drawingData");
        DrawingDAOInMemory db = new DrawingDAOInMemory();

        if (dataJson != null && !dataJson.isEmpty()) {

            Gson gson = new Gson();
            try {
                Drawing drawing = gson.fromJson(dataJson, Drawing.class);

                db.addDraw(drawing);
                System.out.println(drawing.getName());
                db.printDrawsName();

                //Type figureType = new TypeToken<List<Drawing>>() {}.getType();

                //List<Drawing> drawingList = gson.fromJson(dataJson, figureType);

               /* List<Drawing> drawings = (List<Drawing>) request.getAttribute("drawings");
                if (drawings == null) {
                    drawings = new ArrayList<>();
                }
                drawings.add(drawing);
                for (Drawing drawing1 : drawings){
                    System.out.println("DIBUJO "+drawing1);
                }
                */
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


