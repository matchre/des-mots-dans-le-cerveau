/*main.js*/
/*main.js : Contains the game process*/

/*Word.js : contains the definition and functions linked to the object
 * Word. */

/*Letter.js : contains the definition and functions linked to the object
 * Letter (a Word contains four Letters (a Letter can be the 
 * one associated to ''))*/

/*effects.js : contains the functions linked to each button and some
 * modifications of the page appearance*/

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

//attemptsLimit[0] = number of attempts authorized in easy mode
//attemptsLimit[1] = number of attempts authorized in normal mode
//if you does not want to active the counter for a level, set the
//corresponding attemptsLimit to 0.
var attemptsLimit = [50,30];
//number of times you can click the help button in easy mode
//set HELP to 0 if you do not want that help.
var HELP=3;
//printAnswer[0] -> print answer when the player loose in easy mode
//printAnswer[1] -> print answer when the player loose in normal mode
//if you does not want to print the answer for a level, set the
//corresponding printAnswer to false.
var printAnswer = [true, false];
//if attemptsLimit==0, number of attempts from which the #quit button
//is going to blink every 3 attempt
var ALERT_QUIT=30;

/***************/
//GOBAL VARIABLES
var quit;//quit if quit==1
var mode;//Mode: 0 : debug; 1 : easy; 2 : normal
var running=0;//running if running==1
var attempts =0;//number of attempts left
var mode;//Mode: 0 : debug; 1 : easy; 2 : normal; 3 : hard
var quit=0;//if quit==1, quit (execute initGame())
var pool = new Array();
var goal;
var objWord;//The Word from words that the player has to find
var playerWord;//The Word submitted by the player
var helpCursor=false;//Help mode to open the instructions' pop-up
var switchZoom=false;//If true then, zoom in (zoom out if not)
$(function() {//we wait for the DOM
	initCanvas();
	initEffects();
	initButtons();
	initPool();
	initGame();
});

/*******/
//show the level menu and reset all variables
function initGame()
{
	running=0;
	quit=0;
	mode=-1;
	helpCursor=false;
	help=HELP;
	$('#shadowing').css('display','block');
	$('#instructions').css('display','none');
	$('#niv').css('display','block');
	$('#quit span').text('Informations/ABANDONNER');
	
	//we reset both canvas
	resetCanvas();
	//clear the number of attempts printer
    $('#attempts').text(''); 
}
//build and show the game surface
//initialize some variables for the game.
function start()
{
	//show the game surface
	$('#niv').css('display','none');
	$('#instructions').css('display','none');
	$('#shadowing').css('display','none');
	//we show the help button if mode easy and hide it if not :
	if(mode==1 && HELP!=0)
	{
		$("#help span").text('AIDE : '+help+' coups disponibles');
		$('#help').css('display','inline');
	}
	else
		$('#help').css('display','none');
	//we show the number of attempts played instead of the number of
	//attempts left if attemptsLimit==0
	if(attemptsLimit[mode-1]==0)
		$('#textAttempts').css('display','none')
	//We chose the word to find : words[goal]
	running=1;
	goal = getRandomNumber();
	attempts=attemptsLimit[mode-1];
	objWord = new Word(words[goal]);
	
	/*We fill the game surface*/
	if(attemptsLimit[mode-1]==0)
		$('#textAttempts').css('display','none');
	else
	{
		$('#textAttempts').css('display','block');
		$('#attempts').css('color','green');
		$('#attempts').text(attempts);
	}
	playerWord = new Word('');
    playerWord.draw();
    playerWord.drawBrain(false);
	objWord.drawBrain(true);
}
//one attempt : launched each time the player click a bar on
//playerScreen
function attempt()
{
	if(attempts==2)
		alert('Attention, dernier essai');

	
	
	resetBottomBrainCanvas();
	var str = playerWord.getString();
	playerWord.drawBrain(false);
	attempts--;
	/*****/
	if(attemptsLimit[mode-1]!=0)
	{
		if(attempts<=5)
			$('#attempts').css('color','orange');
		if(attempts<=3)
			$('#attempts').css('color','red');
		
		$('#attempts').text(attempts);
	}
	else if(attempts<-ALERT_QUIT && attempts%3==0)
	{
		var timeLeft=6;
		var timer = setInterval(function(){
		timeLeft--;
		if(timeLeft%2==0)
		{
			$('#quit').css('color','red');
			$('#quit').css('background-color','white');
		}
		else
		{
			$('#quit').css('color','white');
			$('#quit').css('background-color','red');
			console.log('coucou');
		}
		if(timeLeft<=0)
		{
			clearInterval(timer);
			$('#quit').css('color','red');
			$('#quit').css('background-color','white');
		}
		},500);
	}
	/******/
	if(str==words[goal])
		won();
	else if(attempts==0)
		gameOver();	
}
//the player as lost...launch initGame()
function gameOver()
{
	alert('Désolé vous avez perdu...\n'
			+'Nombre de coups utilisés : '+
			(attemptsLimit[mode-1]-attempts)+'\n'
			+'Meilleur score possible était : '+ 
			objWord.getNbBars()+' coups.');
	if(printAnswer[mode-1])//show the answer if true
	{
		resetCanvas();
		objWord.draw();
		objWord.drawBrain(true);
		objWord.drawBrain(false);
		quit=1;
		$('#quit span').text('Nouvelle partie');
		return;
	}
	initGame();
}
//the player has won... launch initGame
function won()
{
	alert('Félicitations, vous avez gagné.\n'
			+'Nombre de coups utilisés : '+
			(attemptsLimit[mode-1]-attempts)+'\n'
			+'Meilleur score possible était : '+ 
			objWord.getNbBars()+' coups.');
	
	initGame();
}
//reset both of the canvas and draw lines on brainScreen
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
//reset only the bottom part of brainScreen
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
//return a random number from pool and delete it. If pool is empty,
//call initPool
function getRandomNumber()
{
	if(pool.length==0)
		initPool();
	var r = Math.floor(pool.length*Math.random());
	var n = pool.splice(r, 1);
	return n;
}
//fill pool with all number from 0 to words.length-1
function initPool()
{
	for(var i=0; i<words.length; i++)
		pool.push(i);
}
//print in red the first false answer
function helpPlayer()
{
	if(mode==2 || help==0)
		return;
	playerWord.compareTo(objWord);
	help--;
	$("#help span").text('AIDE : '+help+' coups disponibles');
}
