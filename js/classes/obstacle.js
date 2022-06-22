class Obstacle {
	
	constructor({x, y, imgSrc, numOfFrames, width, height}){
		this.x = x;
		this.y = y;
		this.img = new Image();
		this.img.src = imgSrc;
		this.width = width / numOfFrames;
		this.height = height;
		this.numOfFrames = numOfFrames;
		this.scored = false;
	}


	#draw(ctx){
		ctx.drawImage(
			this.img,
			this.width * this.frame,
			0,
			this.width,
			this.height,
			this.x,
			this.y, 
			this.width,
			this.height
		)

	}


	update({ctx, dx , scoreBoard, dino}){

		this.x += dx;
		this.#draw(ctx);

		if(this.x + this.width < dino.x && !this.scored){
			scoreBoard.score += 10;
			this.scored = true;
		}

	}
}

class SmallObstacle extends Obstacle {
	static #currentFrame = 0;

	constructor(...args){
		super(...args);
		this.frame = SmallObstacle.#currentFrame;
		this.calculateNextFrame();
	}

	calculateNextFrame(){
		if(SmallObstacle.#currentFrame + 1 != this.numOfFrames){
			SmallObstacle.#currentFrame++;
		} else {
			SmallObstacle.#currentFrame = 0;
		}
	}
}

class BigObstacle extends Obstacle {
	static #currentFrame = 0;
	constructor(...args){
		super(...args);

		this.frame = BigObstacle.#currentFrame
		this.calculateNextFrame();
		
	}

	calculateNextFrame(){
		if(BigObstacle.#currentFrame + 1 != this.numOfFrames){
			BigObstacle.#currentFrame++;
		} else {
			BigObstacle.#currentFrame = 0;
		}
	}


}

export {
	SmallObstacle,
	BigObstacle
}