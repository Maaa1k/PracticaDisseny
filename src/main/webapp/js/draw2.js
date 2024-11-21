const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

let currentShape = null;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let shapes = [];
let shapeSize = 50;
let fillColor = '#000000'; // Color por defecto negro
let currentStrokeColor = '#000000'; // Color por defecto negro para el trazo
let useFill = true; // Variable para controlar si se debe usar el relleno

// Configurar la forma que se desea dibujar
function setShape(shape) {
    currentShape = shape;
    isDrawing = false; // Desactivar dibujo al cambiar forma
}

// Alternar entre relleno y no relleno
function toggleFill() {
    useFill = !useFill; // Alternar entre true y false
}

// Function to clear and redraw the canvas
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Dibujar todas las figuras en el orden en que están en el array `shapes`
    shapes.forEach(shape => {
        if (shape.type === 'free') {
            // Lógica para dibujar las líneas a mano alzada
            drawFreeShape(shape);
        } else if (shape.type === 'square') {
            if (shape.useFill) {
                ctx.fillStyle = shape.fillColor;
                ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
            } else {
                ctx.strokeStyle = currentStrokeColor;
                ctx.lineWidth = 2;
                ctx.strokeRect(shape.x, shape.y, shape.size, shape.size);
            }
        } else if (shape.type === 'circle') {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
            if (shape.useFill) {
                ctx.fillStyle = shape.fillColor;
                ctx.fill();
            } else {
                ctx.strokeStyle = currentStrokeColor;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        } else if (shape.type === 'star') {
            ctx.beginPath();
            for (let i = 0; i < 24; i++) {
                const angle = i * Math.PI / 12;
                const radius = i % 2 === 0 ? shape.outerRadius : shape.innerRadius;
                ctx.lineTo(shape.x + Math.cos(angle) * radius, shape.y + Math.sin(angle) * radius);
            }
            ctx.closePath();
            if (shape.useFill) {
                ctx.fillStyle = shape.fillColor;
                ctx.fill();
            } else {
                ctx.strokeStyle = currentStrokeColor;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        } else if (shape.type === 'triangle') {
            const height = shape.size * Math.sqrt(3) / 2;
            ctx.beginPath();
            ctx.moveTo(shape.x, shape.y - height / 2);
            ctx.lineTo(shape.x - shape.size / 2, shape.y + height / 2);
            ctx.lineTo(shape.x + shape.size / 2, shape.y + height / 2);
            ctx.closePath();
            if (shape.useFill) {
                ctx.fillStyle = shape.fillColor;
                ctx.fill();
            } else {
                ctx.strokeStyle = currentStrokeColor;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
    });
}

// Event listeners for mouse interactions
canvas.addEventListener('mousedown', (e) => {
    const { x, y } = getMousePos(e);
    if (currentShape === 'free') {
        isDrawing = true;
        [lastX, lastY] = [x, y];
        shapes.push({
            type: 'free',
            points: [{ x: lastX, y: lastY }],
            shapeSize: shapeSize,
            strokeColor: currentStrokeColor
        });
    } else {
        drawShape(x, y);
    }
});

canvas.addEventListener('mouseup', () => {
    if (isDrawing && currentShape === 'free') {
        updateHistory(); // Solo actualizamos el historial después de terminar el trazo
    }
    isDrawing = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing && currentShape === 'free') {
        const newX = e.offsetX;
        const newY = e.offsetY;
        drawSmoothLine(lastX, lastY, newX, newY, shapeSize);
        shapes[shapes.length - 1].points.push({ x: newX, y: newY });
        [lastX, lastY] = [newX, newY];
    }
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

// Funciones para dibujar las figuras
function drawShape(x, y) {
    switch (currentShape) {
        case 'square':
            drawSquare(x, y);
            break;
        case 'circle':
            drawCircle(x, y);
            break;
        case 'star':
            drawStar(x, y);
            break;
        case 'triangle':
            drawTriangle(x, y);
            break;
        default:
            break;
    }
}

function drawSquare(x, y) {
    const shape = {
        type: 'square',
        x: x - shapeSize / 2,
        y: y - shapeSize / 2,
        size: shapeSize,
        fillColor: fillColor,
        useFill: useFill
    };
    shapes.push(shape);

    if (shape.useFill) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
    } else {
        ctx.strokeStyle = currentStrokeColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(shape.x, shape.y, shape.size, shape.size);
    }

    updateHistory(); // Actualizar historial después de dibujar la figura
}

function drawCircle(x, y) {
    const shape = {
        type: 'circle',
        x: x,
        y: y,
        radius: shapeSize / 2,
        fillColor: fillColor,
        useFill: useFill
    };
    shapes.push(shape);

    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
    if (shape.useFill) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    } else {
        ctx.strokeStyle = currentStrokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    updateHistory(); // Actualizar historial después de dibujar la figura
}

function drawTriangle(x, y) {
    const shape = {
        type: 'triangle',
        x: x,
        y: y,
        size: shapeSize,
        fillColor: fillColor,
        useFill: useFill
    };
    shapes.push(shape);

    const height = shape.size * Math.sqrt(3) / 2;

    ctx.beginPath();
    ctx.moveTo(shape.x, shape.y - height / 2);
    ctx.lineTo(shape.x - shape.size / 2, shape.y + height / 2);
    ctx.lineTo(shape.x + shape.size / 2, shape.y + height / 2);
    ctx.closePath();

    if (shape.useFill) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    } else {
        ctx.strokeStyle = currentStrokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    updateHistory(); // Actualizar historial después de dibujar la figura
}

function drawStar(x, y) {
    const shape = {
        type: 'star',
        x: x,
        y: y,
        outerRadius: shapeSize / 2,
        innerRadius: shapeSize / 4,
        fillColor: fillColor,
        useFill: useFill
    };
    shapes.push(shape);

    ctx.beginPath();
    for (let i = 0; i < 24; i++) {
        const angle = i * Math.PI / 12;
        const radius = i % 2 === 0 ? shape.outerRadius : shape.innerRadius;
        ctx.lineTo(shape.x + Math.cos(angle) * radius, shape.y + Math.sin(angle) * radius);
    }
    ctx.closePath();

    if (shape.useFill) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    } else {
        ctx.strokeStyle = currentStrokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    updateHistory(); // Actualizar historial después de dibujar la figura
}

// Dibujo de la línea suave para el trazo a mano alzada
function drawSmoothLine(x, y, x2, y2, lineWidth) {
    const shape = {
            type: 'free',
            x: x,
            y: y,
            outerRadius: shapeSize / 2,
            innerRadius: shapeSize / 4,
            fillColor: fillColor,
            useFill: useFill
        };
    ctx.strokeStyle = currentStrokeColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Actualizar el historial de las figuras
function updateHistory() {
    const historialDiv = document.getElementById('historial');
    historialDiv.innerHTML = ''; // Limpiar historial existente

    shapes.forEach((shape, index) => {
        const historialItem = document.createElement('div');
        const miniCanvas = document.createElement('canvas');
        const deleteButton = document.createElement('button');
        const ctxMini = miniCanvas.getContext('2d');

        // Configuración del mini lienzo
        miniCanvas.classList.add('mini-canvas');
        miniCanvas.width = 30;
        miniCanvas.height = 30;

        if (shape.type === 'free') {
            // Dibujar el trazo a mano alzada en miniatura
            ctxMini.strokeStyle = shape.strokeColor;
            ctxMini.lineWidth = shape.shapeSize / 10; // Reducir tamaño proporcional al mini-canvas
            ctxMini.lineCap = 'round';

            ctxMini.beginPath();
            shape.points.forEach((point, i) => {
                if (i === 0) {
                    ctxMini.moveTo(point.x / 10, point.y / 10);
                } else {
                    ctxMini.lineTo(point.x / 10, point.y / 10);
                }
            });
            ctxMini.stroke();
        } else {
            // Dibujar figuras geométricas en el mini lienzo
            if (shape.type === 'square') {
                if (shape.useFill) {
                    ctxMini.fillStyle = shape.fillColor;
                    ctxMini.fillRect(5, 5, 20, 20);
                } else {
                    ctxMini.strokeStyle = shape.strokeColor;
                    ctxMini.lineWidth = 2;
                    ctxMini.strokeRect(5, 5, 20, 20);
                }
            } else if (shape.type === 'circle') {
                ctxMini.beginPath();
                ctxMini.arc(15, 15, 10, 0, Math.PI * 2);
                if (shape.useFill) {
                    ctxMini.fillStyle = shape.fillColor;
                    ctxMini.fill();
                } else {
                    ctxMini.strokeStyle = shape.strokeColor;
                    ctxMini.lineWidth = 2;
                    ctxMini.stroke();
                }
            } else if (shape.type === 'triangle') {
                ctxMini.beginPath();
                ctxMini.moveTo(15, 5);
                ctxMini.lineTo(5, 25);
                ctxMini.lineTo(25, 25);
                ctxMini.closePath();
                if (shape.useFill) {
                    ctxMini.fillStyle = shape.fillColor;
                    ctxMini.fill();
                } else {
                    ctxMini.strokeStyle = shape.strokeColor;
                    ctxMini.lineWidth = 2;
                    ctxMini.stroke();
                }
            }
        }

        // Configuración del botón de eliminar
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => {
            shapes.splice(index, 1); // Eliminar figura del array
            updateHistory(); // Actualizar historial
            redrawCanvas(); // Redibujar el canvas
        };

        // Ensamblar el historial
        historialItem.appendChild(miniCanvas);
        historialItem.appendChild(deleteButton);
        historialDiv.appendChild(historialItem);
    });
}

