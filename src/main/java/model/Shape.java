package model;

import java.util.List;

public class Shape {
    String type;
    String x;
    String y;
    String size;
    String fillColor;
    boolean useFill;
    String lineWidth;
    double radius;
    double outerRadius;
    double innerRadius;
    List<Points> points;


    public Shape(String type, String x, String y, String size, String fillColor, boolean useFill, String lineWidth, double radius , double outerRadius, double innerRadius, List<Points> points) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.size = size;
        this.fillColor = fillColor;
        this.useFill = useFill;
        this.lineWidth = lineWidth;
        this.radius = radius;
        this.outerRadius = outerRadius;
        this.innerRadius = innerRadius;
        this.points = points;
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

    public String getLineWidth() {
        return lineWidth;
    }

    public void setLineWidth(String lineWidth) {
        this.lineWidth = lineWidth;
    }

    public double getOuterRadius() {
        return outerRadius;
    }

    public void setOuterRadius(double outerRadius) {
        this.outerRadius = outerRadius;
    }

    public double getInnerRadius() {
        return innerRadius;
    }

    public void setInnerRadius(double innerRadius) {
        this.innerRadius = innerRadius;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public List<Points> getPoints() {
        return points;
    }

    public void setPoints(List<Points> points) {
        this.points = points;
    }
}
