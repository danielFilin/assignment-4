let color = "";
let canvas = document.querySelector(".canvas");
let body = document.querySelector("body");
let spray = document.querySelector(".spray");
let spraySingle = document.querySelector(".spray-single");
let eraser = document.querySelector(".eraser");
let line = document.querySelector(".line");
let parent = document.querySelector(".parent");
let colorsHome = document.querySelector(".colors-column");
let pointSize = document.querySelector(".my-pointer-selector");
let zIndex = 0;
let lineActive = false;
let sprayActive = false;
let width = 20;
let height = 20;
let lineWidth = 2;


// Create the colors dynamically. 

let myColors = ['blue', 'green', 'yellow', 'red', 'purple', 'pink', 'orange', 'black'];
let pictures = ["https://www.onlygfx.com/wp-content/uploads/2018/01/blue-paint-brush-stroke-12.png", 'https://previews.123rf.com/images/kubais/kubais1309/kubais130900520/22245493-green-paint-splash-isolated-on-white-background.jpg', 'https://st2.depositphotos.com/4067179/11002/i/950/depositphotos_110020396-stock-photo-splash-of-yellow-paint-isolated.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97g1ToFLpngq36J24wNm1fL98spzMFxrEyInR4K1TdT1MSAJd', 'https://ak7.picdn.net/shutterstock/videos/2230837/thumb/2.jpg', 'https://www.pngkit.com/png/detail/0-5760_clipart-download-splatter-texture-diyismybae-on-deviantart-paint.png', 'https://www.seekpng.com/png/detail/21-215129_brush-strokes-orange-paint-brush-png.png', 'https://banner2.kisspng.com/20180330/gse/kisspng-painting-deviantart-drawing-white-splash-5abe782fe68411.1197398115224320479442.jpg']

for (let i = 0; i < myColors.length; i++) {
    let el = document.createElement('div');
    el.classList.add('allColors');
    el.style.backgroundImage = `url(${pictures[i]})`
    colorsHome.appendChild(el);
    el.addEventListener('click', () => {
        color = myColors[i];
    })
}

pointSize.addEventListener("click", () => {
    for (let i = 0; i < pointSize.children.length; i++) {
        if (pointSize.children[i].selected) {
            width = pointSize.children[i].value;
            height = pointSize.children[i].value;
        }
    }
})

let lineSize = document.querySelector(".my-line-selector");

lineSize.addEventListener("click", () => {
    for (let i = 0; i < lineSize.children.length; i++) {
        if (lineSize.children[i].selected) {
            lineWidth = lineSize.children[i].value;
        }
    }
})

var mouseDown = false;
body.addEventListener('mousedown', () => {
    mouseDown = true;
})

body.addEventListener('mouseup', () => {
    mouseDown = false;
})

sprayMe = (kind) => {
    canvas.addEventListener(kind, (e) => {
        if (kind === "mousemove") {
            if (mouseDown)
                startWork(e);
        } else {
            startWork(e);
        }
    })
}

startWork = (e) => {
    if (!lineActive) {
        zIndex++;
        let numX = e.clientX + e.movementX;
        let numY = e.clientY + e.movementY;
        let dot = document.createElement("div");
        dot.style.backgroundColor = color;
        dot.style.zIndex = zIndex;
        dot.classList.add("painter");
        dot.style.top = -10 + numY - canvas.offsetTop + "px";
        dot.style.left = -10 + numX - canvas.offsetLeft + "px";
        dot.style.position = "absolute";
        dot.style.height = width + "px";
        dot.style.width = height + "px";
        dot.style.borderRadius = "100%";
        canvas.appendChild(dot);
    }
}

let lineCoordinates = [];
drawLine = (x1, y1, x2, y2) => {

    if (lineActive) {
        let line = document.createElement("span");

        let distance = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
        //Middle point
        let xMiddle = (x1 + x2) / 2;
        let yMiddle = (y1 + y2) / 2;

        //salope of the line
        let slopeInRadian = Math.atan2(y1 - y2, x1 - x2);
        slopeInDegrees = (slopeInRadian * 180) / Math.PI;
        //css implementation
        line.style.width = distance + "px";
        line.style.position = "absolute";
        line.style.height = lineWidth + "px";
        line.style.top = yMiddle + "px";
        line.style.left = (xMiddle - (distance / 2)) + "px";
        line.style.transform = "rotate(" + slopeInDegrees + "deg)";
        line.style.backgroundColor = color;
        canvas.appendChild(line);
    }
}

eraser.addEventListener("click", () => {
    color = "white";
})

// draws the line
line.addEventListener('click', () => {
    lineActive = true;
    if (lineActive) {
        canvas.addEventListener("click", (e) => {
            if (lineActive) {
                let numX = e.clientX + e.movementX;
                let numY = e.clientY + e.movementY;
                let y = numY - canvas.offsetTop;
                let x = numX - canvas.offsetLeft;
                console.log(y, x)
                let myDot = {
                    x: x,
                    y: y
                }
                lineCoordinates.push(myDot);
                if (lineCoordinates.length === 2) {
                    let x1 = lineCoordinates[0].x;
                    let x2 = lineCoordinates[1].x;
                    let y1 = lineCoordinates[0].y;
                    let y2 = lineCoordinates[1].y;
                    lineCoordinates = [];
                    drawLine(x1, y1, x2, y2);
                }
            }
        })
    }
});


spray.addEventListener('click', () => {
    sprayActive = true;
    lineActive = false;
    sprayMe('mousemove')
})

spraySingle.addEventListener('click', () => {
    sprayActive = true;
    lineActive = false;
    sprayMe('click');
})

// change the canvas size;
document.querySelector(".btn-secondary").addEventListener("click", () => {
    canvas.style.width = document.querySelector(".canvas-width").value + "px";
    canvas.style.height = document.querySelector(".canvas-height").value + "px";
    let parentHeight = parseInt(document.querySelector(".canvas-height").value) + 30;
    let parentWidth = parseInt(document.querySelector(".canvas-width").value) + 30;
    parent.style.width = parentWidth + "px";
    parent.style.height = parentHeight + "px";

})

// cleares the bord

document.querySelector(".btn-danger").addEventListener("click", () => {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
})

//create the colors via JS.


// rotate function

let deg = 0;
document.querySelector(".btn-info").addEventListener("click", () => {
    deg += 90;
    canvas.style.transform = `rotate(${deg}deg)`;
    canvas.style.transition = `transform 350ms ease`;
})