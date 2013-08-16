/*main.js*/

var ie = (document.all && !window.opera)?true:false;
var quit;//quit if quit==1
var mode;//Mode: 0 : debug; 1 : easy; 2 : normal
var help=3;
/*********************/
//CONSTANTS TO BE MODIFIED

//array of words to be found
var words = [
        "allo",
        "elle",
        "cale",
        "cape",
        "cash",
        "chef",
        "choc",
        "chou",
        "clac",
        "clap",
        "clef",
        "clos",
        "clou",
        "coco",
        "cols",
        "cool",
        "coup",
        "face",
        "flop",
        "flou",
        "fous",
        "halo",
        "lace",
        "lape",
        "loup",
        "oeuf",
        "opus",
        "oups",
        "papa",
        "peau",
        "peps",
        "plus",
        "pose",
        "pouf",
        "puce",
        "pull",
        "sacs",
        "sale",
        "sauf",
        "seau",
        "seul",
        "solo",
        "sols",
        "sous",
        "spas",
        "sucs"];

//number of attempts authorized
var attemptsLimit = 31;

/***************/
var running=0;//running if running==1
var attempts =0;//number of attempts left
var mode;//Mode: 0 : debug; 1 : easy; 2 : normal; 3 : hard
var quit=0;//if quit==1, quit (execute initGame())
var pool = new Array();
var goal;
var objWord;//The Word from words that the player has to find
var playerWord;//The Word submitted by the player

$(function() {//we wait for the DOM
	initCanvas();
	initEffects();
	initButtons();
	initPool();
	initGame();
});
/********/
function initButtons()
{
	$("#start").click(function() {
			if(mode==-1)
			{
				alert('Veuillez choisir un niveau s\'il vous plaît');
				drawMode();	
			}
			else if(running==0)
			{
				if(mode!=2)
					$("span", this).text('AIDE '+help);
				else
					$(this).css('display','none');
				running=1;//Begin the game
				start();
			}
			else						
			{
				helpPlayer();
			}
	});
	$('#quit').click(function() {
		if(quit==1)
		{
			initGame();
		}
		else if(running==0)
			return;
		else if(confirm('Voulez-vous vraiment quitter ?'))
			{
				gameOver();
			}
	});
	$('#modeEasy').click(function() {
		if(running==1)
		{
			alert('Vous devez recommencer une nouvelle '+ 
			'partie pour pouvoir changer de niveau');
			return;
		}
		mode=1;
		drawMode();
		});
	$('#modeNormal').click(function() {
		if(running==1)
		{
			alert('Vous devez recommencer une nouvelle '+ 
			'partie pour pouvoir changer de niveau');
			return;
		}
		mode=2;
		drawMode();
	});
}	
/*******/
function drawMode()
{	
	$('#start span').text('DEMARRER');
	$('#quit span').text('ABANDONNER');
	
	switch(mode)
	{
		case 0 :
			$('#modeEasy').css('color','grey');
			$('#modeNormal').css('color','grey');
			break;
		case 1 : 
			$('#modeEasy').css('color','red');
			$('#modeNormal').css('color','grey');
			charMode='Facile';
			break;
		case 2 : 
			$('#modeEasy').css('color','grey');
			$('#modeNormal').css('color','red');
			charMode='Normal';
			break;
		
		default : 
			$('#modeEasy').css('color','black');
			$('#modeNormal').css('color','black');
			return;
	}	
	
	//~ if(mode!=0)
		//~ alert('Vous avez choisi le niveau ' + charMode);
}

function initGame()
{
	running=0;
	quit=0;
	mode=-1;
	help=3;
	$('.instructions').css('display','none');
	$("#instructionsDefault").css('display', 'inherit');
	$('#start').css('display', 'inline');
	drawMode();
	//we reset both canvas
	resetCanvas();
	//clear the number of attempts printer
    $('#attempts').text(''); 
}

function start()
{
	//We chose the word to find : words[goal]
	running=1;
	goal = getRandomNumber();
	attempts=attemptsLimit;
	objWord = new Word(words[goal]);
	//~ objWord.draw();
	/*We construct the game surface*/
	$('#attempts').css('color','green');
	$('#attempts').text(attempts);
	
	playerWord = new Word('');
    playerWord.draw();
	objWord.drawBrain(true);
}
function attempt()
{
	if(attempts==2)
		alert('Attention, dernier essai');

	
	
	resetBottomBrainCanvas();
	var str = playerWord.getString();
	playerWord.drawBrain(false);
	attempts--;
	
	/*****/	
	if(attempts<=3)
		$('#attempts').css('color','orange');
	if(attempts<=1)
		$('#attempts').css('color','red');
	
	$('#attempts').text(attempts);
	/******/
	//~ console.log(str);
	if(str==words[goal])
		won();
	else if(attempts==0)
		gameOver();	
}

function gameOver()
{
	alert('Vous avez perdu en utilisant '+(attemptsLimit-attempts)
			+' essais. Le mot à trouver va s\'afficher sur l\'écran.');
	resetCanvas();
	objWord.draw();
	objWord.drawBrain(true);
	objWord.drawBrain(false);
	quit=1;
	$("span", '#quit').text('Nouvelle partie');
}

function won()
{
	alert('Félicitations, vous avez gagné en utilisant '+
			(attemptsLimit-attempts)
			+' essais. Le mot à trouver va s\'afficher sur l\'écran');
	
	resetCanvas();
	objWord.draw();
	objWord.drawBrain(true);
	objWord.drawBrain(false);
	quit=1;
	$("span", '#quit').text('Nouvelle partie');
}

function resetCanvas()
{
	var canvas0 = document.getElementById('brainScreen');
    var ctx0 = canvas0.getContext('2d');
    var canvas1 = document.getElementById('playerScreen');
    var ctx1 = canvas1.getContext('2d');
    ctx0.clearRect(0, 0, canvas0.width, canvas0.height);
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    
    ctx0.beginPath();
    ctx0.moveTo(0,canvas0.height/2);
    ctx0.lineTo(canvas0.width,canvas0.height/2);
    ctx0.strokeStyle='black';
    ctx0.stroke();
    ctx0.moveTo(canvas0.width/2,0);
    ctx0.lineTo(canvas0.width/2,canvas0.height);
    ctx0.strokeStyle='grey';
    ctx0.stroke();
    ctx0.closePath();
    var img = document.getElementById('screenImage');
    ctx1.drawImage(img,0,0,$('#playerScreen').width(),
										$('#playerScreen').height());
}

function resetBottomBrainCanvas()
{
	var canvas = document.getElementById('brainScreen');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 2+canvas.height/2, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,canvas.height/2);
    ctx.lineTo(canvas.width/2,canvas.height);
    ctx.strokeStyle='grey';
    ctx.stroke();
    ctx.closePath();
}
//return a random number from pool and delete it
function getRandomNumber()
{
	if(pool.length==0)
		initPool();
	var r = Math.floor(pool.length*Math.random());
	var n = pool.splice(r, 1);
	return n;
}
function initPool()
{
	for(var i=0; i<words.length; i++)
		pool.push(i);
}

function helpPlayer()
{
	if(mode==2 || help==0)
		return;
	playerWord.compareTo(objWord);
	help--;
	$("span", "#start").text('AIDE '+help);
}
