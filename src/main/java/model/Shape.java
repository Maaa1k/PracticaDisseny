package model;

public class Shape {
    String type;
    String x;
    String x2;
    String y;
    String y2;
    String size;
    String fillColor;
    boolean useFill;
    String lineWidth;

    public Shape(String type, String x, String y, String x2, String y2,  String size, String fillColor, boolean useFill, String lineWidth) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
        this.size = size;
        this.fillColor = fillColor;
        this.useFill = useFill;
        this.lineWidth = lineWidth;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getFillColor() {
        return fillColor;
    }

    public void setFillColor(String fillColor) {
        this.fillColor = fillColor;
    }

    public boolean isUseFill() {
        return useFill;
    }

    public void setUseFill(boolean useFill) {
        this.useFill = useFill;
    }

    public String getX2() {
        return x2;
    }

    public void setX2(String x2) {
        this.x2 = x2;
    }

    public String getY2() {
        return y2;
    }

    public void setY2(String y2) {
        this.y2 = y2;
    }

    public String getLineWidth() {
        return lineWidth;
    }

    public void setLineWidth(String lineWidth) {
        this.lineWidth = lineWidth;
    }
}
