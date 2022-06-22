import {SmallObstacle, BigObstacle}from './obstacle.js';

function createObstacle(x, y){

	return Math.random() < 0.5 ? 
	new SmallObstacle({
		x, 
		y: y + 50,
		imgSrc: 'resources/cactus.png',
		numOfFrames: 6,
		width: 306,
		height: 87,
	}) : 
	new BigObstacle({
		x, y,
		imgSrc: 'resources/bigcactus.png',
		numOfFrames: 2,
		width: 150,
		height: 144,
	});

}

export default {
	createObstacle
}