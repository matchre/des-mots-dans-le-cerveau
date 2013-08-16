/* effects.js */
/**APPEARANCE OF THE HTML PAGE**/
function initCanvas()//avoid a bug on IE, a better way probably exists
					 //with more CSS... this one is efficient	
{
	var canvas0 = document.getElementById('brainScreen');
	var ctx0 = canvas0.getContext('2d');
	var canvas1 = document.getElementById('playerScreen');
	var ctx1 = canvas1.getContext('2d');
	var bW = $('#brainScreen').width();
	var pSW = $('#playerScreen').width();//actually, pSW==bW
	var uH = $('#upper').height();
	var bH = 8*bW/10;
	var pSH = 8*pSW/10;
	$('#brainScreen').height(bH);
	$('#playerScreen').height(pSH);
	canvas0.height=bH;
	canvas0.width=bW;
	canvas1.height=pSH;
	canvas1.width=pSW;
	
	$('#marge').css({'height':uH + bH +'px'});
	var iH =(uH + bH - $('h2').height() - $('#niv').height())*15/20;
	$('.instructions').css({'height':iH+'px'});
}
/**EFFECTS*/
function initEffects()
{
	$("#mot").bind("mouseover", function() {
		$(this).css('color','red');
		$('#playerScreen').css('border-color','red');
	});
	$("#mot").bind("mouseout", function() {
		$(this).css('color','black');
		$('#playerScreen').css('border-color','black');
	});
	$("#brainScreen").bind("mouseover", function() {
		if(running==0)
			return;
		$('.instructions').css('display','none');
		$('#instructionsBrainScreen').css('display','inherit');
		var canvas = document.getElementById('brainScreen');
		var ctx = canvas.getContext('2d');
		ctx.save();
		ctx.strokeStyle='orange';
		ctx.strokeRect(3,3,canvas.width-6,(canvas.height/2)-6);
		ctx.strokeStyle='purple';
		ctx.strokeRect(3,(canvas.height/2)+3,canvas.width-6, 
			(canvas.height/2)-6);
		ctx.beginPath();
	});
	$("#playerScreen").bind("mouseover", function() {
		if(running==0)
			return;
		$('.instructions').css('display','none');
		$('#instructionsPlayerScreen').css('display','inherit');
	});
	$("#attempts").bind("mouseover", function() {
		if(running==0)
			return;
		$('.instructions').css('display','none');
		$('#instructionsAttempts').css('display','inherit');
	});
	$(".brain").bind("mouseover", function() {
		if(running==0)
			return;
		$('.instructions').css('display','none');
		$('#instructionsImg').css('display','inherit');
	});
	$("#playerScreen").click(function(e) {
		if(running==0 || quit==1)
			return;
		var x=0;
		var y=0;
		var canvas = document.getElementById("playerScreen");
		var currentElement=this;
		var offsetX = 0;
		var offsetY = 0;
		do
		{
			offsetX += currentElement.offsetLeft;
			offsetY += currentElement.offsetTop;
		}while(currentElement = currentElement.offsetParent)
			
		x=e.pageX - offsetX;
		y=e.pageY - offsetY;
		//~ console.log('x: '+x+' y: '+y);
		
		var barToSwap = playerWord.getBar(x,y);
		if(barToSwap!==-1)
		{
			barToSwap.swap();
			attempt();
		}
	});
}	

