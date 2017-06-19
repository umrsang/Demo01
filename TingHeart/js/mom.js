var momObj = function(){
	this.x;
	this.y;
	this.angle;
	this.eye = new Image();
	this.body = new Image();
	this.tail = new Image();
}

momObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	this.eye.src = "./src/bigEye0.png";
	this.body.src = "./src/bigSwim0.png";
	this.tail.src = "./src/bigTail0.png";
	
}

momObj.prototype.draw = function(){

	this.x = lerpDistance(mx, this.x, 0.95);
	this.y = lerpDistance(my, this.y, 0.95);
	
	//Math.atan2(y, x);
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.9);
	
	ctx1.clearRect(0, 0, 800, 600);
	ctx1.save();
	ctx1.translate(this.x, this.y );
	ctx1.rotate(this.angle);
	ctx1.drawImage(this.eye, -this.eye.width * 0.5, -this.eye.width * 0.5 );
	ctx1.drawImage(this.body, -this.body.width * 0.5, -this.body.width * 0.5);
	ctx1.drawImage(this.tail, -this.tail.width * 0.5  + 30, -this.tail.width * 0.5-2 );
	ctx1.restore();

}



















