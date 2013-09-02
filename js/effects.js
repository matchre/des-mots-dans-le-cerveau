/* effects.js */
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
}
/**EFFECTS*/
function initEffects()
{
	$("#brainScreen").bind("mouseover", function() {
		if(running==0 || !helpCursor)
			return;
		
		$(this).css('border-color','red');
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
	});
	$("#brainScreen").bind("mouseout", function() {
		$(this).css('border-color','black');
	});
	$("#brainScreen").click(function(){
		if(!helpCursor)
			return;

		$('#shadowing').css('display','block');
		$('#instructions').css('display','block');
		$('.instructions').css('display','none');
		$('#instructionsBrainScreen').css('display','block');
		helpCursor=false;
		$('body').css('cursor','default');
	});
	$("#playerScreen").bind("mouseover", function() {
		if(running==0 || !helpCursor)
			return;
		$(this).css('border-color','red');
	});
	$("#playerScreen").bind("mouseout", function() {
		$(this).css('border-color','white');
	});
	$(".brain").bind("mouseover", function() {
		if(running==0 || !helpCursor)
			return;
		$(this).css('border-color','red');

	});
	$(".brain").bind("mouseout", function() {
		$(this).css('border-color','white');
	});
	$(".brain").click(function(){
		if(!helpCursor)
			return;

		$('#shadowing').css('display','block');
		$('#instructions').css('display','block');
		$('.instructions').css('display','none');
		$('#instructionsImg').css('display','block');
		helpCursor=false;
		$('body').css('cursor','default');
	});
	$("#playerScreen").click(function(e) {
		if(running==0 || quit==1)
			return;
		if(helpCursor)
		{
			$('#shadowing').css('display','block');
			$('#instructions').css('display','block');
			$('.instructions').css('display','none');
			$('#instructionsPlayerScreen').css('display','block');
			helpCursor=false;
			$('body').css('cursor','default');
			return;
		}
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
function initButtons()
{
	$(".rulesButton").click(function() {
		$('#shadowing').css('display','block');
		$('#rulesDiv').css('display','block');				
	});
	$("#returnButton").click(function() {
		$('#rulesImg').css('height','98%');
		switchZoom=false;
		$('#rulesDiv').css('display','none');	
	});
	$("#instructionsButton").click(function() {
		$('body').css('cursor','help');
		$('#rulesDiv').css('display','none');
		helpCursor = true;
	});
	$("#start").click(function() {
			if(running==0)
			{
				initGame();
			}
			else
			{
				$('#instructions').css('display','none');
				$('#shadowing').css('display','none');
			}
	});
	$('#quit').click(function() {
		var t= playerWord.compareAllTo(objWord);
		if(quit==1)
		{
			initGame();
		}
		else if(running==0)
			return;
		else if(confirm('Il vous manque '+t[1]+
			' barre(s) et vous avez cliqué '+ t[0] + 
			' barres qui n\'auraient pas dues l\'être.\n'+
			'Voulez-vous vraiment quitter ?'))
		{
				gameOver();
		}
	});
	$('#modeEasy').click(function() {
		mode=1;
		start();
		});
	$('#modeNormal').click(function() {
		mode=2;
		start();
	});
	$('#help').click(function(){
		helpPlayer();
	});
	$('#zoom').click(function(){
		if(!switchZoom)
			$('#rulesImg').css('height','auto');
		else
			$('#rulesImg').css('height','98%');
		switchZoom=!switchZoom;
	});
}	
