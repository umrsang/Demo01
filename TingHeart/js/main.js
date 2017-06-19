var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
var mom;
var mom;
var baby;
var mx;
var my;

document.body.onload = game;

function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();

}

function init(){
	//获得canvas(相当于画布) context(相当于画笔)
	can1 = document.getElementById("canvas1");//fishes,dust,ui,circle
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById("canvas2");//background,ane,fruits
	ctx2 = can2.getContext('2d');
	
	can1.addEventListener('mousemove', onmousemove, false);
	
	bgPic.src = "./src/background.jpg";
	
	canWidth = can1.width;
	canHeight = can1.height;
	
	mx = canWidth * 0.5;
	my = canHeight * 0.5;
	
	ane = new aneObj();
	ane.init();
	
	fruit = new fruitObj();
	fruit.init();
	
	drawBackground();
	ane.draw();
	fruit.draw();
	
	mom = new momObj();
	mom.init();
	
	baby = new babyObj();
	baby.init();
	
}

function gameloop(){
	requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now -lastTime;
	lastTime = now;

	drawBackground();
	ane.draw();
	fruit.grow();
	momFruitConllision();
	fruit.draw();
	mom.draw();
	baby.draw();
}

function onmousemove(ee){
	if(ee.offsetX || ee.layerX){
		mx = ee.offsetX == undefined? ee.layerX:ee.offsetX;
		my = ee.offsetY == undefined? ee.layerY:ee.offsetY;

	}
}
