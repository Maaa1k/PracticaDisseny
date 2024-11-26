<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ver Dibujo</title>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <h1>Detalles del Dibujo</h1>
    <p><b>Nombre del Dibujo:</b> ${drawing.name}</p>
    <p><b>Creado por:</b> ${drawing.user} (ID: ${drawing.id_user})</p>
    <canvas id="drawingCanvas" width="800" height="600"></canvas>

    <button onclick="window.history.back()">Volver</button>

    <script>
        // Obtener el canvas y su contexto
        const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext('2d');


        // Datos del dibujo pasados desde el servidor
        const shapes = [
            <c:forEach var="shape" items="${drawing.shape}">
                {
                    type: '${shape.type}',
                    x: parseFloat('${shape.x != null ? shape.x : 0}'),
                    y: parseFloat('${shape.y != null ? shape.y : 0}'),
                    size: parseFloat('${shape.size != null ? shape.size : 0}'),
                    fillColor: '${shape.fillColor != null ? shape.fillColor : "black"}',
                    useFill: ${shape.useFill != null ? shape.useFill : false},
                    lineWidth: parseFloat('${shape.lineWidth != null ? shape.lineWidth : 1}'),
                    radius: parseFloat('${shape.radius != null ? shape.radius : 0}'),
                    outerRadius: parseFloat('${shape.outerRadius != null ? shape.outerRadius : 0}'),
                    innerRadius: parseFloat('${shape.innerRadius != null ? shape.innerRadius : 0}'),
                    points: <c:if test="${shape.points != null}">
                                                    [
                                                        <c:forEach var="point" items="${shape.points}" varStatus="status">
                                                            { x: parseFloat('${point.x}'), y: parseFloat('${point.y}') }
                                                            <c:if test="${!status.last}">,</c:if>
                                                        </c:forEach>
                                                    ]
                                                </c:if>
                                                <c:if test="${shape.points == null}">
                                                    []
                                                </c:if>                },
            </c:forEach>
        ];


        // Función para dibujar las formas
        function drawShapes(shapes) {
            shapes.forEach(shape => {
                ctx.lineWidth = shape.lineWidth || 1;
                ctx.strokeStyle = shape.fillColor || 'black';
                ctx.fillStyle = shape.useFill ? shape.fillColor || 'black' : 'transparent';
                if (shape.type === 'square') {
                    ctx.beginPath();
                    ctx.rect(shape.x, shape.y, shape.size || shape.width, shape.size || shape.height);
                    if (shape.useFill) ctx.fill();
                    ctx.stroke();
                }
                if (shape.type === 'triangle') {
                    ctx.beginPath();
                    ctx.rect(shape.x, shape.y, shape.size, shape.size);
                    if (shape.useFill) ctx.fill();
                    ctx.stroke();
                } else if (shape.type === 'circle') {
                    ctx.beginPath();
                    ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
                    if (shape.useFill) ctx.fill();
                    ctx.stroke();
                } else if (shape.type === 'free') {
                      drawFreeShape(shape);
                  } else if (shape.type === 'star') {
                    drawStar(shape);
                }
            });
        }

        // Función auxiliar para dibujar una estrella
        function drawStar(shape) {
            ctx.beginPath();
                for (let i = 0; i < 14; i++) {
                    const angle = (i * Math.PI) / 7;
                    const radius = i % 2 === 0 ? shape.outerRadius : shape.innerRadius;
                    ctx.lineTo(shape.x + Math.cos(angle) * radius, shape.y + Math.sin(angle) * radius);
                }
                ctx.closePath();
                if (shape.useFill) {
                    ctx.fillStyle = shape.fillColor;
                    ctx.fill();
                } else {
                    ctx.strokeStyle = shape.fillColor;
                    ctx.lineWidth = shape.lineWidth || 2;
                    ctx.stroke();
                }
        }

        function drawFreeShape(shape) {
            if (shape.points.length < 2) return; // Asegurarse de que hay al menos dos puntos para dibujar

            ctx.strokeStyle = shape.fillColor;
            ctx.lineWidth = shape.lineWidth || 2;
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(shape.points[0].x, shape.points[0].y); // Primer punto

            for (let i = 1; i < shape.points.length; i++) {
                ctx.lineTo(shape.points[i].x, shape.points[i].y); // Crear líneas continuas
            }
            ctx.stroke();
        }

        // Dibujar las formas en el canvas
        console.log("Shapes a renderizar:", shapes);
        shapes.forEach(shape => console.log(shape));
        drawShapes(shapes);
    </script>
</body>
</html>
