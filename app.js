const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height= 700;

ctx.strokeStyle = "#2c2c2c"; //시작 색상
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(evnet){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    console.log(event.target.style);
}


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));
//Array 내 원소들중 하나씩을 color로 설정, 그 color에 대하여 addEventListener 실행

