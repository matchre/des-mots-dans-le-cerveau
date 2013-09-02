/*Letter.js*/

ClickableBar = function(isHorizontal)
{
	this.isHorizontal=isHorizontal;
	this.correct=false;
	
    //fill: O->white; 1->grey; 2->red
    //(oX,oY)=coordinates of the left corner if isHorizontal==true
    //and of the top corner if not.
    this.initDraw = function(oX, oY, letterWidth, letterHeight, fill)
    {
		this.letterWidth=letterWidth;
		this.letterHeight=letterHeight;
		this.fill=fill;
		this.oX=oX;
		this.oY=oY;
		this.draw();
	}
	
	this.draw=function()
	{
		var canvas = document.getElementById('playerScreen');
		if(!canvas.getContext)
			return;
		var ctx = canvas.getContext('2d');
		
		this.wH=canvas.height/16;//width of horizontal bars
		this.wS=canvas.width/21;//width of stand bars
		
		var l=0;//length of the bar
		var W=0;//half of width of the bars
		ctx.beginPath();
		ctx.moveTo(this.oX, this.oY);
		
		if(this.isHorizontal)
		{
			l=this.letterWidth;
			w=this.wH/2;
			ctx.lineTo(this.oX+w,this.oY+w);
			ctx.lineTo(this.oX+l-w,this.oY+w);
			ctx.lineTo(this.oX+l,this.oY);
			ctx.lineTo(this.oX+l-w,this.oY-w);
			ctx.lineTo(this.oX+w,this.oY-w);
		}
		else
		{
			l=this.letterHeight/2;
			w=this.wS/2;
			ctx.lineTo(this.oX+w,this.oY+w);
			ctx.lineTo(this.oX+w,this.oY+l-w);
			ctx.lineTo(this.oX,this.oY+l);
			ctx.lineTo(this.oX-w,this.oY-w+l);
			ctx.lineTo(this.oX-w,this.oY+w);		
		}
		ctx.lineTo(this.oX,this.oY);
		ctx.strokeStyle = "grey";
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.closePath();
		switch(this.fill)
		{
			case 0 :
				ctx.fillStyle='white';
				ctx.fill();
				break;
			case 1 :
				ctx.fillStyle ='grey';
				ctx.fill();
				break;
			case 2 :
				ctx.fillStyle ='red';
				ctx.fill();
				break;
		}
	}
	
	this.swap = function()
	{
		if(this.fill!=1)
			this.fill=1;
		else
			this.fill=0;
		this.draw();
	}
	
	this.contains = function(x,y)
	{
		//~ console.log((this.oX-this.wS/2)+"   "+ (this.oX+this.wS/2));
		return(this.isHorizontal &&(x>this.oX+this.wH/2
			&& x<this.oX+this.letterWidth-this.wH/2
			&& y>this.oY-this.wH/2 && y<this.oY+this.wH/2)
			|| (!this.isHorizontal && 
			x>this.oX-this.wS/2 && x<this.oX+this.wS/2
			&& y>this.oY+this.wS/2
			&& y<this.oY+this.letterHeight/2-this.wS/2)
			);
	}
}

function charToLetterMap(char)
{
	var map=[[0, 0, 0, 0, 0, 0, 0],//''
		[1, 1, 1, 1, 1, 1, 0],//a
		[1, 1, 0, 0, 1, 0, 1],//c
		[1, 1, 0, 1, 1, 0, 1],//e
		[1, 1, 0, 1, 1, 0, 0],//f
		[0, 1, 1, 1, 1, 1, 0],//h
		[0, 0, 0, 1, 1, 1, 1],//j
		[0, 1, 0, 0, 1, 0, 1],//l
		[1, 1, 1, 0, 1, 1, 1],//o
		[1, 1, 1, 1, 1, 0, 0],//p
		[1, 1, 0, 1, 0, 1, 1],//s
		[0, 1, 1, 0, 1, 1, 1]//u
		];
	var chars = ['', 'a','c','e','f','h','j','l','o','p','s','u'];
	var index=chars.lastIndexOf(char);
	if(index!=-1)
		return map[index];
	else
		console.log("Attention "+ char + " n'est pas une lettre valide");
}
	
function mapToChar(letterMap)
{
	var map=[[0, 0, 0, 0, 0, 0, 0],//''
		[1, 1, 1, 1, 1, 1, 0],//a
		[1, 1, 0, 0, 1, 0, 1],//c
		[1, 1, 0, 1, 1, 0, 1],//e
		[1, 1, 0, 1, 1, 0, 0],//f
		[0, 1, 1, 1, 1, 1, 0],//h
		[0, 0, 0, 1, 1, 1, 1],//j
		[0, 1, 0, 0, 1, 0, 1],//l
		[1, 1, 1, 0, 1, 1, 1],//o
		[1, 1, 1, 1, 1, 0, 0],//p
		[1, 1, 0, 1, 0, 1, 1],//s
		[0, 1, 1, 0, 1, 1, 1]//u
		];
	var chars = ['', 'a','c','e','f','h','j','l','o','p','s','u'];
		
	for(var i=0; i<map.length; i++)
	{
		if(map[i].equal(letterMap))
			return chars[i];
	}
	return 'i';//'i' is obviously impossible to draw
	//~ console.log("Lettre inexistante");
}

Letter = function(char)
{
	this.map=charToLetterMap(char);
	this.bars=new Array(7);
	for(var i=0; i<this.bars.length; i++)
	{
		if(i%3==0)
			this.bars[i]=new ClickableBar(true);
		else
			this.bars[i]=new ClickableBar(false);
	}
	//(offsetX,offsetY)=coordinates of the top left corner of the letter
	this.draw=function(offsetX, offsetY, letterWidth, letterHeight)
	{	
		this.bars[0].initDraw(offsetX,offsetY, letterWidth, letterHeight,
														this.map[0]);
		this.bars[1].initDraw(offsetX,offsetY, letterWidth, letterHeight,
														this.map[1]);
		this.bars[2].initDraw(offsetX+letterWidth,offsetY, letterWidth,
											letterHeight, this.map[2]);
		this.bars[3].initDraw(offsetX,offsetY+(letterHeight/2),
								letterWidth, letterHeight, this.map[3]);
		this.bars[4].initDraw(offsetX,offsetY+(letterHeight/2),
								letterWidth, letterHeight, this.map[4]);
		this.bars[5].initDraw(offsetX+letterWidth,(letterHeight/2)
					+ offsetY, letterWidth, letterHeight, this.map[5]);
		this.bars[6].initDraw(offsetX,offsetY+letterHeight, letterWidth,
											letterHeight, this.map[6]);
	}
	//Color the first bar different between this and l in red and 
	//return 1. return O if the letter are the same.
	this.compareTo=function(l)
	{
		for(var i=0; i<7; i++)
		{
			if(this.map[i]!=l.map[i] && this.bars[i].fill!=2)
			{
				this.bars[i].fill=2;
				this.bars[i].draw();
				return 1;
			}
		}
		return 0;
	}
	//return [number of bars clicked in this and not colored in l,
	//	number of bars colored in l and not clicked in this]
	this.compareAllTo=function(l)
	{
		var thisAndNotL=0;
		var lAndNotThis=0;
		for(var i=0; i<7; i++)
		{
			if(this.map[i]>l.map[i])
			{
				thisAndNotL++;
			}
			else if(this.map[i]<l.map[i])
			{
				lAndNotThis++;
			}
		}
		return [thisAndNotL, lAndNotThis];
	}
	//return number of bars of the letter
	this.getNbBars=function()
	{
		var tot=0;
		for(var i=0; i<this.map.length; i++)
			if(this.map[i]==1)
				tot++;
				
		return tot;
	}
	//return the letter drawn by the clicked bars and 'i' if the form
	//drawn does not fit to a letter.
	this.getChar=function()
	{
		for(var i=0; i<7; i++)
		{
			if(this.bars[i].fill==1)
				this.map[i]=1;
			else
				this.map[i]=0;
		}
		return mapToChar(this.map);
	}
}

//return true if the two arrays are exactly the same
Array.prototype.equal = function(array)
 {
        if(this.length!=array.length)
			return false;
        for(var i=0; i<this.length; i++)
		{
			if(this[i]!=array[i])
				return false;
		}
		return true;
 }

