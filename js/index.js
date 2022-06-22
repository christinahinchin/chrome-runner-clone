import Background from './classes/background.js';
import Dino from './classes/dino.js';
import keyboard from './utils/keyboard-handler.js';
import Keys from './utils/keys.js';
import factory from './classes/obstacle-factory.js';


// dom elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');
const highScore = document.getElementById('highscore');

canvas.width = 1000;
canvas.height = 500;


// constants
const gameSpeed = 10;
const startingHeight = 300;
const spawnInterval = 100;
const padding = 20;
const scoreBoard = {
	score: 0,
	highScore: 0
}


// game objects
const background = new Background(0,startingHeight, 'resources/ground.png');
const dino = new Dino(10, 300, 'resources/dino.png', 396, 144, 3);



// mutable state
let obstacles = [];
let spawnCounter = 0;
let gameOver = false;

function init(){

	keyboard.bindEvent(Keys.SPACE, function(){
		dino.jump();
	})

	keyboard.bindEvent(Keys.CROUCH, function(){
		dino.crouch();
	})

	scoreBoard.highScore = localStorage.getItem('dino-score');

	if(!scoreBoard.highScore){
		localStorage.setItem('dino-score', 0);
		scoreBoard.highScore = 0;
	}

	highScore.innerHTML = 'Highscore: ' + scoreBoard.highScore;
}

function detectCollision(dino, obstacle){
	return (dino.y + dino.height - padding > obstacle.y) &&
	(dino.x + dino.width - padding) > obstacle.x &&
	dino.x + padding < (obstacle.x + obstacle.width) &&
	dino.y + padding < (obstacle.y + obstacle.height);
}

function endGame(){
	gameOver = true;
	if(scoreBoard.score > scoreBoard.highScore){
		localStorage.setItem('dino-score', scoreBoard.score);
		highScore.innerHTML = 'HighScore: ' + scoreBoard.score;
	}
	scoreBoard.score = 'GAME OVER!';
}


function animate(){

	if(gameOver){
		return;
	}
	
	spawnCounter++;
	
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	score.innerHTML = 'Score: ' + scoreBoard.score;

	obstacles = obstacles.filter(ob => ob.x + ob.width > 0)
	console.log(obstacles.length)
	if(spawnCounter % spawnInterval == 0){
		obstacles.push(factory.createObstacle(canvas.width + (Math.random() * 100), startingHeight))
	}

	background.update({
		ctx,
		dx: -gameSpeed
	})

	
	obstacles.forEach(ob => {

		ob.update({
		ctx,
		dx: -gameSpeed,
		scoreBoard,
		dino
		})

		if(detectCollision(dino, ob)){
			endGame()
		}
	})

	dino.update({ctx});
	requestAnimationFrame(animate);
}

init();
animate();