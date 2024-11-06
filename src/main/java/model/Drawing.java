package model;

public class Drawing {
    private String name;
    private int id_user;
    private String user;
    private String drawingData;

    public Drawing(String name, int id_user, String user, String drawingData) {
        this.name = name;
        this.id_user = id_user;
        this.user = user;
        this.drawingData = drawingData;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getters y Setters
    public int getId_user() {
        return id_user;
    }

    public void setId_user(int id_user) {
        this.id_user = id_user;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getDrawingData() {
        return drawingData;
    }

    public void setDrawingData(String drawingData) {
        this.drawingData = drawingData;
    }
}

