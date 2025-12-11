const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let brushSize = 20;
let selectedColor = 'black';

let mouseDown = false;
let x = null;
let y = null;



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