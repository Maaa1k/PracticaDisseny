package db;

import model.Drawing;

import java.util.ArrayList;
import java.util.List;

public class DrawingDAOInMemory implements DrawingDAO{

    static List<Drawing> drawings = new ArrayList<>();
    private int id = 0;

    public void addDraw (Drawing drawing){
//        int id = drawings.size();
        id++;
        Drawing draw = new Drawing(drawing.getName(),
                drawing.getId_user(), drawing.getUser(), drawing.getShape());
        draw.setId(id);
        drawings.add(draw);

        System.out.println("DIBUJO CREADO, PROPIETARIO: " + drawing.getUser());
    }

    public List<Drawing> getAllDrawings (){
        return  drawings;
    }

    public void printDrawsName(){
        for (Drawing d : drawings){
            System.out.println("PRINT NAME: " + d.getName());
        }
    }

    public void deleteDraw(Drawing drawing){
        drawings.removeIf(d -> d.getId() == drawing.getId());
    }
}
