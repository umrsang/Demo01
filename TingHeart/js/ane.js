function aneObj(){
	this.x = [];
	this.len = [];
	this.num = 40;	
	
}

aneObj.prototype.init = function(){
	for(var i = 0; i < this.num; i++){
		this.x[i] = i * 20 +Math.random() * 20;
		this.len[i] = 200 + Math.random() * 50;
	}
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = '#9f9';	
}

aneObj.prototype.draw = function(){
	ctx2.save();
	ctx2.globalAlpha = 0.5;
	for(var i = 0; i < this.num; i++){
		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canHeight);
		ctx2.lineTo(this.x[i],canHeight - this.len[i]);
		ctx2.stroke();
	}
	ctx2.restore();	
}














