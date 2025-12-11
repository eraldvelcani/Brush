const canvas = document.getElementById('canvas');
const size = document.getElementById('size');
const sizeUp = document.getElementById('sizeUp');
const sizeDown = document.getElementById('sizeDown');
const colWheel = document.getElementById('colWheel');
const purge = document.getElementById('purge');
const ctx = canvas.getContext('2d');

let brushSize = 15;
let selectedColor = 'black';

let mouseDown = false;
let x = null;
let y = null;

function updateSize() {
    size.innerText = brushSize;
};

sizeUp.addEventListener('click', () => {
    brushSize += 5;
    if (brushSize > 50) {
        brushSize = 50;
    };
    updateSize();
});

sizeDown.addEventListener('click', () => {
    brushSize -= 5;
    if (brushSize < 5) {
        brushSize = 5;
    };
    updateSize();
});

colWheel.addEventListener('change', (e) => selectedColor = e.target.value);

purge.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))

canvas.addEventListener('mousedown', (e) => {   
    mouseDown = true;
    x = e.offsetX;
    y = e.offsetY;
})

canvas.addEventListener('mouseout', () => mouseDown = false);

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
    x = null;
    y = null;
})

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        const xMove = e.offsetX;
        const yMove = e.offsetY;
        drawCircle(xMove, yMove);
        drawLine(x, y, xMove, yMove);
        x = xMove;
        y = yMove
    }
})

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2, true); //from ctx docu: x y starting points, cricle rad, start/end angle, counter(clockwise)    
    ctx.fillStyle = selectedColor;
    ctx.fill();
}

function drawLine(xStart, yStart, xEnd, yEnd) {
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.lineWidth = brushSize * 2; //circle radius * 2
    ctx.strokeStyle = selectedColor;
    ctx.stroke();
}

