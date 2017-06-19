
var fruitObj = function(){
	this.alive = [];//bool
	this.x = [];
	this.y = [];
	this.num = 15;
	this.oWidth = [];
	this.growSpe = [];
	this.upSpe = [];
	this.turnX = [];
	this.xspe = [];
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
	this.bornSpe = 0; //按约20ms 刷新一次  大概1S诞生一个
}	

fruitObj.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
	}
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
}

fruitObj.prototype.draw = function(){
	var pic;
	for(var i=0;i<this.num;i++){
		if(this.fruitType[i] === "blue"){
			pic = this.blue;
		}else{
			pic = this.orange;
		}
		
		if(((this.y[i]) > -20) && (this.alive[i] == true)){
			ctx2.drawImage(pic, this.x[i] - this.oWidth[i]*0.5, this.y[i] - this.oWidth[i]*0.5, this.oWidth[i], this.oWidth[i])
		}
		else{
			this.alive[i] = false;
		}
	}
}

fruitObj.prototype.born = function(i){
		this.alive[i] = true;
		var aneID = Math.floor(Math.random() * ane.num);
		this.x[i] = ane.x[aneID];
		this.y[i] = canHeight - ane.len[aneID];
		this.oWidth[i] = 0;
		this.growSpe[i] = 0.1 +Math.random()*0.3;
		this.upSpe[i] = 1.2 +Math.random()*0.3;
		this.turnX[i] = 0;
		this.xspe[i] = 0;
		if(Math.random() < 0.15){
			this.fruitType[i] = "blue";
		}else{
			this.fruitType[i] = "orange";
		}
		
}

fruitObj.prototype.grow = function(){
	this.bornSpe -= 1;
	if( this.bornSpe <= 0){
		this.bornSpe = 10 + Math.random()*40;
		for(var i=0;i<this.num;i++){
			if(this.alive[i] == false){
				this.born(i);
				break;
			}
		}
	}
	
	for(var i=0;i<this.num;i++){
		if(this.alive[i] == true){
			if(this.oWidth[i] <= 16){
				this.oWidth[i]  += this.growSpe[i];
			}else{
				this.y[i] -= this.upSpe[i];
				this.x[i] += this.xspe[i]
				this.turnX[i] += (Math.random()*0.05);
				if(this.turnX[i] >= 10){
					this.xspe[i]  +=((Math.random()-0.5)*0.2) ;
					this.turnX[i] = 0;
				}
			}
		}
	}
}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}














