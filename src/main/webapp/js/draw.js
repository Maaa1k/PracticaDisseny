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
let isMoving = false; // Estado de mover
let selectedShape = null; // Forma seleccionada para mover
let offsetX, offsetY; // Desplazamiento para mover
let useFill = true; // Variable para controlar si se debe usar el relleno

function setShape(shape) {
    currentShape = shape;
    isDrawing = false; // Desactivar dibujo al cambiar forma
}

function toggleFill() {
    useFill = !useFill; // Alternar entre true y false
}

// Event listeners for mouse interactions
canvas.addEventListener('mousedown', (e) => {
    const { x, y } = getMousePos(e);
    if (isMoving) {
        selectShape(x, y); // Intentar seleccionar una figura
        if (selectedShape) {
            offsetX = x - selectedShape.x; // Calcular desplazamiento
            offsetY = y - selectedShape.y;
        }
    } else if (currentShape === 'free') {
        isDrawing = true;
        [lastX, lastY] = [x, y];
        shapes.push({ type: 'free', points: [{ x: lastX, y: lastY }], shapeSize: shapeSize, strokeColor: currentStrokeColor });
    } else {
        drawShape(x, y);
    }
});

canvas.addEventListener('mouseup', () => {
    if (isDrawing && currentShape === 'free') {
        updateHistory();
    }
    isDrawing = false;
    selectedShape = null; // Desmarcar forma seleccionada al soltar el ratón
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing && currentShape === 'free') {
        const newX = e.offsetX;
        const newY = e.offsetY;
        drawSmoothLine(lastX, lastY, newX, newY, shapeSize);
        shapes[shapes.length - 1].points.push({ x: newX, y: newY });
        [lastX, lastY] = [newX, newY];
    } else if (isMoving) {
        if (selectedShape) {
            selectedShape.x = e.offsetX - offsetX;
            selectedShape.y = e.offsetY - offsetY;
        } else {
            moveFreeDraw(e.offsetX, e.offsetY);
        }
        redrawCanvas();
    }
});

// Function to get mouse position
function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Drawing functions
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
        useFill: useFill // Guardar el estado de relleno actual
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

    updateHistory();
}

function drawCircle(x, y) {
    const shape = {
        type: 'circle',
        x: x,
        y: y,
        radius: shapeSize / 2,
        fillColor: fillColor,
        useFill: useFill // Guardar el estado de relleno actual
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
    updateHistory();
}

function drawTriangle(x, y) {
    const shape = {
        type: 'triangle',
        x: x,
        y: y,
        size: shapeSize,
        fillColor: fillColor,
        useFill: useFill // Guardar el estado de relleno actual
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

    updateHistory();
}

function drawStar(x, y) {
    const shape = {
        type: 'star',
        x: x,
        y: y,
        outerRadius: shapeSize / 2,
        innerRadius: shapeSize / 4,
        fillColor: fillColor,
        useFill: useFill // Guardar el estado de relleno actual
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

    updateHistory();
}

function drawSmoothLine(x1, y1, x2, y2, lineWidth) {
    ctx.strokeStyle = currentStrokeColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Function to update the history display
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

        // Dibujar la miniatura de la figura
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
        } else if (shape.type === 'star') {
            ctxMini.beginPath();
            for (let i = 0; i < 10; i++) {
                const angle = i * Math.PI / 5;
                const radius = i % 2 === 0 ? 10 : 5;
                ctxMini.lineTo(15 + Math.cos(angle) * radius, 15 + Math.sin(angle) * radius);
            }
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

        // Configuración del botón de eliminar
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => {
            shapes.splice(index, 1); // Eliminar figura del array
            updateHistory(); // Actualizar el historial
            redrawCanvas(); // Redibujar el canvas
        };

        // Ensamblar el historial
        historialItem.appendChild(miniCanvas);
        historialItem.appendChild(deleteButton);
        historialDiv.appendChild(historialItem);
    });
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

// Lógica para dibujar líneas a mano alzada
function drawFreeShape(shape) {
    ctx.strokeStyle = currentStrokeColor;
    ctx.lineWidth = shape.shapeSize;
    ctx.lineCap = 'round';
    ctx.beginPath();
    shape.points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    ctx.stroke();
}

        function clearHistory() {
            shapes = [];
            updateHistory();
        }

        function updateSize() {
            shapeSize = document.getElementById('size').value;
            redrawCanvas();
        }

        function updateColors() {
            fillColor = document.getElementById('colorPicker').value;
            currentStrokeColor = fillColor; // Establecer el color del trazo igual al color de la figura
        }

        function toggleMove(active) {
            isMoving = active;
            selectedShape = null; // Resetear selección al cambiar estado
            const button = document.getElementById('moveButton');
            button.textContent = isMoving ? 'Detener Mover' : 'Mover'; // Cambiar texto del botón
        }

        function selectShape(x, y) {
            shapes.forEach(shape => {
                if (shape.type !== 'free' && isPointInShape(shape, x, y)) {
                    selectedShape = shape;
                }
            });
        }

        function isPointInShape(shape, x, y) {
            if (shape.type === 'square') {
                return x >= shape.x && x <= shape.x + shape.size && y >= shape.y && y <= shape.y + shape.size;
            } else if (shape.type === 'circle') {
                const dx = x - shape.x;
                const dy = y - shape.y;
                return (dx * dx + dy * dy <= shape.radius * shape.radius);
            } else if (shape.type === 'star') {
                const distance = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
                return distance <= shape.outerRadius; // Colisión simple
            }
            return false;
        }

        function moveFreeDraw(x, y) {
            shapes.forEach(shape => {
                if (shape.type === 'free') {
                    shape.points.forEach(point => {
                        point.x += x - lastX;
                        point.y += y - lastY;
                    });
                }
            });
        }

        function saveCanvas() {
                          const dataURL = document.getElementById('miCanvas').toDataURL();

                          const drawing = {
                              id: 1,
                              name: "GERVASIO",
                              user:
                              id_user: 123,
                              drawingData: shapes
                          };

                          const dataJson = JSON.stringify(drawing);
                          document.getElementById('dataJson').value = dataJson;
                          document.getElementById('saveForm').submit();
                      }
