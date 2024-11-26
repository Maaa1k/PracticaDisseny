const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

let currentShape = null;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let shapes = [];
let shapeSize = 50;
let fillColor = '#000000'; // Color por defecto negro
// let currentStrokeColor = fillColor;
let useFill = true;

// Definir la función addShape para agregar una figura al historial
function addShape(type, x, y, size, fillColor, useFill, lineWidth, radius, outerRadius, innerRadius, points) {
    const shape = { type, x, y, size, fillColor, useFill, lineWidth, radius, outerRadius, innerRadius, points };
    shapes.push(shape);
    updateHistory();
    redrawCanvas();
}

// Configurar la forma que se desea dibujar
function setShape(shape) {
    currentShape = shape;
    isDrawing = false; // Desactivar dibujo al cambiar forma
}

function updateSize() {
    shapeSize = document.getElementById('size').value;
    redrawCanvas();
}

// Alternar entre relleno y no relleno
function toggleFill() {
    useFill = !useFill; // Alternar entre true y false
}

function drawShape(x, y) {
    if (currentShape === 'square') {
        addShape('square', x, y, shapeSize, fillColor, useFill, 2, null, null, null, null);
    } else if (currentShape === 'circle') {
        addShape('circle', x, y, shapeSize, fillColor, useFill, 2, shapeSize / 2, null, null, null);
    } else if (currentShape === 'triangle') {
        addShape('triangle', x, y, shapeSize, fillColor, useFill, 2, null, null, null, null);
    } else if (currentShape === 'star') {
        addShape('star', x, y, shapeSize, fillColor, useFill, 2, null, shapeSize / 2, shapeSize / 4), null;
    }
     else if (currentShape === 'free'){
     addShape('free', x, y, shapeSize, fillColor, useFill, 2, null, null, null, null);}
    redrawCanvas();
}

// Function to clear and redraw the canvas
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Dibujar todas las figuras en el orden en que están en el array `shapes`
    shapes.forEach(shape => {
        if (shape.type === 'free') {
            drawFreeShape(shape);
        } else if (shape.type === 'square') {
            drawSquare(shape);
        } else if (shape.type === 'circle') {
            drawCircle(shape);
        } else if (shape.type === 'star') {
            drawStar(shape);
        } else if (shape.type === 'triangle') {
            drawTriangle(shape);
        }
    });
}

// Ajustes en las funciones de dibujo para usar las propiedades del objeto `shape`
function drawSquare(shape) {
    if (shape.useFill) {
        ctx.fillStyle = shape.fillColor;
        ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
    } else {
        ctx.strokeStyle = shape.fillColor;
        ctx.lineWidth = shape.lineWidth || 2;
        ctx.strokeRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
    }
}


function drawCircle(shape) {
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.radius || shape.size / 2, 0, Math.PI * 2);
    if (shape.useFill) {
        ctx.fillStyle = shape.fillColor;
        ctx.fill();
    } else {
        ctx.strokeStyle = shape.fillColor;
        ctx.lineWidth = shape.lineWidth || 2;
        ctx.stroke();
    }
}

function drawTriangle(shape) {
    const height = (shape.size * Math.sqrt(3)) / 2;
    ctx.beginPath();
    ctx.moveTo(shape.x, shape.y - height / 2);
    ctx.lineTo(shape.x - shape.size / 2, shape.y + height / 2);
    ctx.lineTo(shape.x + shape.size / 2, shape.y + height / 2);
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

// Eventos del canvas ajustados
canvas.addEventListener('mousedown', (e) => {
    const { x, y } = getMousePos(e);
    if (currentShape === 'free') {
        isDrawing = true;
        [lastX, lastY] = [x, y];
        shapes.push({
            type: 'free',
            points: [{ x: lastX, y: lastY }],
            lineWidth: shapeSize, // Usar shapeSize como el grosor del trazo
            fillColor: fillColor,
        });
    } else {
        drawShape(x, y); // Llama a `addShape` y agrega la figura al historial
    }
});


canvas.addEventListener('mouseup', () => {
    if (isDrawing && currentShape === 'free') {
        updateHistory();
    }
    isDrawing = false;
});




canvas.addEventListener('mousemove', (e) => {
    if (isDrawing && currentShape === 'free') {
        const newX = e.offsetX;
        const newY = e.offsetY;

        // Agregar puntos al trazo actual
        const currentFreeShape = shapes[shapes.length - 1];
        currentFreeShape.points.push({ x: newX, y: newY });

        // Dibujar la nueva línea directamente
        ctx.strokeStyle = currentFreeShape.fillColor;
        ctx.lineWidth = currentFreeShape.lineWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(newX, newY);
        ctx.stroke();

        // Actualizar las coordenadas
        [lastX, lastY] = [newX, newY];
    }
});

canvas.addEventListener('mouseup', () => {
    if (isDrawing && currentShape === 'free') {
        const currentFreeShape = shapes[shapes.length - 1];

        // Asegurarse de que el trazo tenga al menos dos puntos
        if (currentFreeShape.points.length < 2) {
            shapes.pop(); // Eliminar si no hay puntos suficientes
        } else {
            updateHistory();
        }
    }
    isDrawing = false;
});

// Función para obtener la posición del ratón en el canvas
function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function clearHistory() {
    shapes = [];
    updateHistory();
    redrawCanvas();
}

function drawSmoothLine(x, y, x2, y2) {
    ctx.strokeStyle = fillColor;
    ctx.lineWidth = shapeSize; // Usar shapeSize como el ancho dinámico
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function updateColors() {
            fillColor = document.getElementById('colorPicker').value;

        }
// Actualizar el historial
function updateHistory() {
    const historialDiv = document.getElementById('historial');
    historialDiv.innerHTML = ''; // Limpiar historial existente

    shapes.forEach((shape, index) => {
        const historialItem = document.createElement('div');
        const miniCanvas = document.createElement('canvas');
        const deleteButton = document.createElement('button');
        const ctxMini = miniCanvas.getContext('2d');

        miniCanvas.classList.add('mini-canvas');
        miniCanvas.width = 30;
        miniCanvas.height = 30;

        if (shape.type === 'square') {
            ctxMini.fillStyle = shape.fillColor;
            ctxMini.fillRect(5, 5, 20, 20);
        } else if (shape.type === 'circle') {
            ctxMini.beginPath();
            ctxMini.arc(15, 15, 10, 0, Math.PI * 2);
            ctxMini.fillStyle = shape.fillColor;
            ctxMini.fill();
        }

        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => {
            shapes.splice(index, 1);
            redrawCanvas();
            updateHistory();
        };

        historialItem.appendChild(miniCanvas);
        historialItem.appendChild(deleteButton);
        historialDiv.appendChild(historialItem);
    });
}
function saveCanvas() {
  const dataURL = document.getElementById('miCanvas').toDataURL();
  const dataJson = JSON.stringify(shapes);
  document.getElementById('dataJson').value = dataJson;
  document.getElementById('saveForm').submit();
 }
