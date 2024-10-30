<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dibujo en Canvas</title>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <h1>Dibujo en Canvas</h1>
    <canvas id="miCanvas" width="500" height="500"></canvas>
    <br>
    <button onclick="clearCanvas()">Limpiar Canvas</button>
    <button onclick="window.location.href='dashboard'">Volver al Dashboard</button>
    <button onclick="saveCanvas()">Guardar Dibujo</button>

    <form id="saveForm" action="saveDrawing" method="POST" style="display:none;">
        <input type="hidden" name="drawingData" id="drawingData">
    </form>

    <script>
        const canvas = document.getElementById('miCanvas');
        const ctx = canvas.getContext('2d');

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });

        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            ctx.beginPath();
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function saveCanvas() {
            const dataURL = canvas.toDataURL(); // Convierte el canvas a una imagen en base64
            document.getElementById('drawingData').value = dataURL; // Asigna la imagen al campo oculto
            document.getElementById('saveForm').submit(); // Envía el formulario
        }
    </script>
</body>
</html>
