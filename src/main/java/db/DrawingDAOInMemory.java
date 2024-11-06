package db;

import model.Drawing;

import java.util.ArrayList;
import java.util.List;

public class DrawingDAOInMemory implements DrawingDAO{

    static List<Drawing> drawings = new ArrayList<>();
    static {
        drawings.add(new Drawing("TEST", 0, "asdaa", "asdasda"));
    }

    public void addDraw (Drawing drawing){
        drawings.add(new Drawing(drawing.getName(), drawing.getId_user(), drawing.getUser(), drawing.getDrawingData()));
        System.out.println("DIBUJO CREADO, PROPIETARIO: " + drawing.getUser() + " " + drawing.getDrawingData() );
    }

    public List<Drawing> getAllDrawings (){
        List<Drawing> drawList = new ArrayList<>(List.of());
        if (drawings.isEmpty()) return drawList;

        for (Drawing d : drawings){
            drawList.add(d);
            System.out.println("LIST_NAME: " + d.getName() + " LIST_ID: " + d.getId_user() +
            " LIST_USER: "  + d.getUser());
        }
        return  drawList;
    }

    public void printDrawsName(){
        for (Drawing d : drawings){
            System.out.println("PRINT NAME: " + d.getName());
        }
    }
    public String  findByDrawUsername(String username) {
        for (Drawing d: drawings){
            if(d.getUser().equals(username)) {
                System.out.println("HYSTRAGSEWRY%UHSGFAARG");
                return d.getUser();
            }
        }
        return null;
    }
}
