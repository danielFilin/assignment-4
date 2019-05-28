let color = "";
let canvas = document.querySelector(".canvas");
let spray = document.querySelector(".spray");
let spraySingle = document.querySelector(".spray-single");
let blue = document.querySelector(".blue");
let green = document.querySelector(".green");
let yellow = document.querySelector(".yellow");
let red = document.querySelector(".red");
let purple = document.querySelector(".purple");
let eraser = document.querySelector(".eraser");
let line = document.querySelector(".line");


//simple points construction

sprayMe = (kind) => {
    canvas.addEventListener(kind, (e) => {
    
    
        let dot = document.createElement("span");
        let x = e.clientX - 156;
        let y = e.clientY;
        //let x = e.offsetX;
        //let y = e.offsetY;
        dot.style.backgroundColor = color;
        dot.style.top = -10+y+"px";
        dot.style.left = -10+x+"px"; 
        dot.style.position = "absolute";
        dot.style.height = "20px";
        dot.style.width = "20px";
        dot.style.borderRadius = "100%";
        canvas.appendChild(dot);
    })
}


let lineCoordinates = [];



drawLine = (x1, y1, x2, y2) => {
    let line = document.createElement("div");

    let distance = Math.sqrt( ((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)));
    //Middle point
    let xMiddle = (x1+x2)/2;
    let yMiddle = (y1+y2)/2;

    //salope of the line
    let slopeInRadian = Math.atan2(y1-y2, x1-x2);
    slopeInDegrees = (slopeInRadian * 180) / Math.PI;
    //css implementation
    line.style.width = distance+"px";
    line.style.position = "absolute";
    line.style.height = 2+"px";
    line.style.top = yMiddle+"px";
    line.style.left = (xMiddle - (distance/2))+"px";
    line.style.transform = "rotate("+slopeInDegrees+"deg)";
    line.style.backgroundColor = "black";
    canvas.appendChild(line);
    console.log(line);
}

// drawLine = (dots) => {

//     let line = document.createElement("div");
//     line.style.display = "inline-block";
//     line.style.position = "relative";
//     console.log(dots[0].x);
//     line.style.height = dots[1].x - dots[0].x+"px";
//     line.style.width = "5px";
//     line.style.backgroundColor = "red";
//     line.style.marginTop = dots[0].x + "px"; 
//     line.style.marginLeft = dots[0].y + "px";
//     rect = line.getBoundingClientRect(); 
//     console.log(rect.top, rect.right, rect.bottom, rect.left);
//     console.log(line);
//     canvas.appendChild(line);

    
// }

blue.addEventListener("click", () => {
    color = "blue";
})
green.addEventListener("click", () => {
    color = "green";
})
yellow.addEventListener("click", () => {
    color = "yellow";
})
red.addEventListener("click", () => {
    color = "red";
})
purple.addEventListener("click", () => {
    color = "purple";
})
eraser.addEventListener("click", () => {
    color = "white";
})
line.addEventListener('click', () => {
    sprayMe('no!');
    canvas.addEventListener("click", (e) => {
       
        let myDot = {
            x: e.offsetX,
            y: e.offsetY
        }
        lineCoordinates.push(myDot);
      
        if(lineCoordinates.length === 2){
        
            let x1 = lineCoordinates[0].x;
            let x2 = lineCoordinates[1].x;
            let y1 = lineCoordinates[0].y;
            let y2 = lineCoordinates[1].y;
            drawLine(x1,y1,x2,y2);
            lineCoordinates.length = [];
        }
        
    })
});

spray.addEventListener('click', () => {
    console.log("ha")
   sprayMe('mousemove');
})

spraySingle.addEventListener('click', () => {

   sprayMe('click');
})




