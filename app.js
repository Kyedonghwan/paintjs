const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height= CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);//기본적으로 캔버스 바탕을 하얗게 표현
ctx.strokeStyle = INITIAL_COLOR; //시작 색상
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling =false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
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
    ctx.strokeStyle=color;
    ctx.fillStyle = color;
}

function handleCanvasClick(){
    if(filling)ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    
if(filling===true){
    filling=false;
    mode.innerText = "Fill";
}else{
    filling = true;
    mode.innerText = "Paint";
}
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataUrl(); //canvas의 pixel들을 image/jpeg형식의 dataUrl로 저장
    const link = document.createElement("a");//html에 a링크 생성
    link.href = image;
    link.download = "PaintJS - Kyedonghwan";// a링크에 하이퍼링크 생성 download의 경우 이름생성
    link.click(); //클릭해줌 자동으로
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));
//Array 내 원소들중 하나씩을 color로 설정, 그 color에 대하여 addEventListener 실행

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}