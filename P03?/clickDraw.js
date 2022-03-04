// Code copied from geeks4geeks :p


// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', () => {

    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
});

const canvas = document.querySelector('#canvas');

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');

var saves = document.getElementById("saves");
var frames = [];
var saveBtn = document.getElementById("save");
var clearBtn = document.getElementById("clear");
var restoreBtn = document.getElementById("restore");
var height = canvas.height;
var width = canvas.width;
var frameNum = 0;

saveBtn.addEventListener("click", saveDrawing, false);
clearBtn.addEventListener("click", clear, false);


// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to
// trigger drawing
let paint = false;

// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

// The following functions toggle the flag to start
// and stop drawing
function startPainting(event) {
    paint = true;
    getPosition(event);
}
function stopPainting() {
    paint = false;
}

function sketch(event) {
    if (!paint) return;
    ctx.beginPath();

    ctx.lineWidth = 5;

    // Sets the end of the lines drawn
    // to a round shape.
    ctx.lineCap = 'round';

    ctx.strokeStyle = 'black';

    // The cursor to start drawing
    // moves to this coordinate
    ctx.moveTo(coord.x, coord.y);

    // The position of the cursor
    // gets updated as we move the
    // mouse around.
    getPosition(event);

    // A line is traced from start
    // coordinate to this coordinate
    ctx.lineTo(coord.x, coord.y);

    // Draws the line.
    ctx.stroke();
}

// stores drawing data in a global variable
function saveDrawing(e) {
    frameNum++;
    console.log("save attempted");
    frames.concat(ctx.getImageData(0, 0, width, height));
    var thisFrame = document.createElement("button");
    thisFrame.innerHTML = "load frame " + frameNum;
    thisFrame.addEventListener("click", restore(frameNum));
    saves.appendChild(thisFrame);
}

// clears the canvas
function clear(e) {
    console.log("clear attempted");
    ctx.clearRect(0, 0, width, height);
}

// restores the drawing using putImageData()
function restore(i) {
    console.log("restore attempted")
    ctx.putImageData(frames[i], 0, 0);
}

var restore = function(i){
    console.log("restore attempted")
    ctx.putImageData(frames[i], 0, 0);
}