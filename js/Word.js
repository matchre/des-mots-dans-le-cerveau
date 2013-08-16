/*Word.js*/

Word = function(string)
{
	this.letters=new Array(4);
	for(var i=0; i<4; i++)
	{
		if(i>=string.length)
			this.letters[i]=new Letter('');
		else
			this.letters[i]=new Letter(string.charAt(i));
	}
	//draw the word in playerScreen
	this.draw=function()
	{
		var canvas = document.getElementById('playerScreen');
		var leftPadding=canvas.width/9;
		var topPadding=canvas.height/5;
		var space=canvas.width/9;
		//actually: length of an horizontal/stand bar, width of a 
		//stand/horizontal bar is missing:
		var letterWidth=canvas.width/9;
		var letterHeight = (canvas.height*2)/5;
		var offsetX=0;
		for(var i=0; i<4; i++)
		{
			offsetX=leftPadding + i*(space+letterWidth);
			this.letters[i].draw(offsetX, topPadding, letterWidth,
														letterHeight);
		}
	
	}
	//show the areas workin in the brains corresponding to the word
	this.drawBrain=function(isObjective)
	{
		var canvas = document.getElementById('brainScreen');
		if(!canvas.getContext)
			return;
		var ctx = canvas.getContext('2d');
		var ux = canvas.width/30;
		var uy = canvas.height/30;
		var oY = 3*canvas.height/4;//offset Y
		
		if(isObjective)
			oY = canvas.height/4;//offset Y

		var oX =canvas.width/2 + canvas.width/20;//offset X
	
		this.drawBrainI(ux,uy,oX,oY);
		oX+=9*ux;
		this.drawBrainII(ux/2,uy/2,oX,oY);
		
		oX=canvas.width/2 - canvas.width/20;
		this.drawBrainI(-ux,uy,oX,oY);
		oX-=9*ux;
		this.drawBrainII(-ux/2,uy/2,oX,oY);
	}
	
	//the big part of the brain scheme
	this.drawBrainI=function(ux,uy,oX,oY)
	{
		var isLeft=(ux<0);
		var canvas = document.getElementById('brainScreen');
		var ctx = canvas.getContext('2d');
		
		ctx.strokeStyle = "grey";
		ctx.lineWidth = 1;
		ctx.fillStyle
		ctx.beginPath();
		ctx.moveTo(oX,oY);
		ctx.lineTo(-ux+oX,-4*uy+oY);
		ctx.lineTo(3*ux+oX,-7*uy+oY);
		ctx.lineTo(4*ux+oX,-6.5*uy+oY);
		ctx.lineTo(3.5*ux+oX,-5*uy+oY);
		ctx.lineTo(ux+oX,-uy+oY);
		ctx.lineTo(oX,oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[1].map[5]==1 && !isLeft)
		|| (this.letters[2].map[4]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(4*ux+oX,-6.5*uy+oY);
		ctx.lineTo(4*ux+oX,-5.5*uy+oY);
		ctx.lineTo(7.1*ux+oX,-3*uy+oY);
		ctx.lineTo(7.6*ux+oX,-3*uy+oY);
		ctx.lineTo(7.5*ux+oX,-3.5*uy+oY);
		ctx.lineTo(4.7*ux+oX,-6.5*uy+oY);
		ctx.lineTo(4*ux+oX,-6.5*uy+oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[1].map[6]==1 && !isLeft)
		|| (this.letters[2].map[6]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(7.6*ux+oX,-3*uy+oY);
		ctx.lineTo(6.9*ux+oX,-2.7*uy+oY);
		ctx.lineTo(6.6*ux+oX,-uy+oY);
		ctx.lineTo(6.9*ux+oX,oY);
		ctx.lineTo(7.5*ux+oX,-0.4*uy+oY);
		ctx.lineTo(7.8*ux+oX,-2.6*uy+oY);
		ctx.lineTo(7.6*ux+oX,-3*uy+oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[1].map[4]==1 && !isLeft)
		|| (this.letters[2].map[5]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(oX,oY);
		ctx.lineTo(2*ux+oX,-1.2*uy+oY);
		ctx.lineTo(6.6*ux+oX,-0.5*uy+oY);
		ctx.lineTo(6.9*ux+oX,oY);
		uy=-uy;
		ctx.lineTo(6.6*ux+oX,-0.5*uy+oY);
		ctx.lineTo(2*ux+oX,-1.2*uy+oY);
		ctx.lineTo(oX,oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[1].map[3]==1 && !isLeft)
		|| (this.letters[2].map[3]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(oX,oY);
		ctx.lineTo(-ux+oX,-4*uy+oY);
		ctx.lineTo(3*ux+oX,-7*uy+oY);
		ctx.lineTo(4*ux+oX,-6.5*uy+oY);
		ctx.lineTo(3.5*ux+oX,-5*uy+oY);
		ctx.lineTo(ux+oX,-uy+oY);
		ctx.lineTo(oX,oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[1].map[2]==1 && !isLeft)
		|| (this.letters[2].map[1]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(4*ux+oX,-6.5*uy+oY);
		ctx.lineTo(4*ux+oX,-5.5*uy+oY);
		ctx.lineTo(7.1*ux+oX,-3*uy+oY);
		ctx.lineTo(7.6*ux+oX,-3*uy+oY);
		ctx.lineTo(7.5*ux+oX,-3.5*uy+oY);
		ctx.lineTo(4.7*ux+oX,-6.5*uy+oY);
		ctx.lineTo(4*ux+oX,-6.5*uy+oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[1].map[0]==1 && !isLeft)
		|| (this.letters[2].map[0]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(7.6*ux+oX,-3*uy+oY);
		ctx.lineTo(6.9*ux+oX,-2.7*uy+oY);
		ctx.lineTo(6.6*ux+oX,-uy+oY);
		ctx.lineTo(6.9*ux+oX,oY);
		ctx.lineTo(7.5*ux+oX,-0.4*uy+oY);
		ctx.lineTo(7.8*ux+oX,-2.6*uy+oY);
		ctx.lineTo(7.6*ux+oX,-3*uy+oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[1].map[1]==1 && !isLeft)
		|| (this.letters[2].map[2]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
	}
	//the big small one
	this.drawBrainII=function(ux,uy,oX,oY)
	{
		var isLeft=(ux<0);
		var canvas = document.getElementById('brainScreen');
		var ctx = canvas.getContext('2d');
		
		ctx.strokeStyle = "grey";
		ctx.lineWidth = 1;
		
		ctx.beginPath();
		ctx.moveTo(oX,oY);
		ctx.lineTo(-ux+oX,-uy+oY);
		ctx.lineTo(oX,-6*uy+oY);
		ctx.lineTo(ux+oX,-7*uy+oY);
		ctx.lineTo(1.7*ux+oX,-5.8*uy+oY);
		ctx.lineTo(ux+oX,-uy+oY);
		ctx.lineTo(oX,oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[0].map[5]==1 && !isLeft)
		|| (this.letters[3].map[4]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(ux+oX,-7*uy+oY);
		ctx.lineTo(2*ux+oX,-7.7*uy+oY);
		ctx.lineTo(5.5*ux+oX,-6*uy+oY);
		ctx.lineTo(6.5*ux+oX,-5*uy+oY);
		ctx.lineTo(5.5*ux+oX,-4.5*uy+oY);
		ctx.lineTo(2.5*ux+oX,-6*uy+oY);
		ctx.lineTo(ux+oX,-7*uy+oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[0].map[6]==1 && !isLeft)
		|| (this.letters[3].map[6]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(6.5*ux+oX,-5*uy+oY);
		ctx.lineTo(5.7*ux+oX,-4.2*uy+oY);
		ctx.lineTo(5.4*ux+oX,-uy+oY);
		ctx.lineTo(5.7*ux+oX,oY);
		ctx.lineTo(6.4*ux+oX,-uy+oY);
		ctx.lineTo(6.9*ux+oX,-4.5*uy+oY);
		ctx.lineTo(6.5*ux+oX,-5*uy+oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[0].map[4]==1 && !isLeft)
		|| (this.letters[3].map[5]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(oX,oY);
		ctx.lineTo(2*ux+oX,-uy+oY);
		ctx.lineTo(4.5*ux+oX,-0.7*uy+oY);
		ctx.lineTo(5.7*ux+oX,oY);
		uy=-uy;
		ctx.lineTo(4.5*ux+oX,-0.7*uy+oY);
		ctx.lineTo(2*ux+oX,-uy+oY);
		ctx.lineTo(oX,oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[0].map[3]==1 && !isLeft)
		|| (this.letters[3].map[3]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(oX,oY);
		ctx.lineTo(-ux+oX,-uy+oY);
		ctx.lineTo(oX,-6*uy+oY);
		ctx.lineTo(ux+oX,-7*uy+oY);
		ctx.lineTo(1.7*ux+oX,-5.8*uy+oY);
		ctx.lineTo(ux+oX,-uy+oY);
		ctx.lineTo(oX,oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[0].map[2]==1 && !isLeft)
		|| (this.letters[3].map[1]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(ux+oX,-7*uy+oY);
		ctx.lineTo(2*ux+oX,-7.7*uy+oY);
		ctx.lineTo(5.5*ux+oX,-6*uy+oY);
		ctx.lineTo(6.5*ux+oX,-5*uy+oY);
		ctx.lineTo(5.5*ux+oX,-4.5*uy+oY);
		ctx.lineTo(2.5*ux+oX,-6*uy+oY);
		ctx.lineTo(ux+oX,-7*uy+oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[0].map[0]==1 && !isLeft)
		|| (this.letters[3].map[0]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
		
		ctx.beginPath();
		ctx.moveTo(6.5*ux+oX,-5*uy+oY);
		ctx.lineTo(5.7*ux+oX,-4.2*uy+oY);
		ctx.lineTo(5.4*ux+oX,-uy+oY);
		ctx.lineTo(5.7*ux+oX,oY);
		ctx.lineTo(6.4*ux+oX,-uy+oY);
		ctx.lineTo(6.9*ux+oX,-4.5*uy+oY);
		ctx.lineTo(6.5*ux+oX,-5*uy+oY);
		ctx.stroke();
		ctx.closePath();
		if((this.letters[0].map[1]==1 && !isLeft)
		|| (this.letters[3].map[2]==1 && isLeft))
		{
			ctx.fillStyle='#99FF33';
			ctx.fill();
		}
	}

	this.getBar=function(x,y)
	{
		for(var i=0;i<4; i++)
		{
			for(var j=0; j<7; j++)
			{
				if(this.letters[i].bars[j].contains(x,y))
					return this.letters[i].bars[j];					
			}	
		}
		return -1;
	}
	
	this.getString=function()
	{
		var s='';
		for(var i=0;i<4; i++)
			s+=this.letters[i].getChar();
		return s;
	}
	
	this.compareTo=function(word)
	{
		for(var i=0;i<4; i++)
		{
			if(this.letters[i].compareTo(word.letters[i])==1)
				return;
		}
		console.log("ERROR : word==this");
	}
	
}

