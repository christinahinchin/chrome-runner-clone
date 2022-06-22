class Dino {
	constructor(x, y, imgSrc, width, height, numOfFrames){
		this.x = x;
		this.y = y;
		
		this.dy = 0;
		this.maxHeight = this.y - 80;
		this.gravity = 2;
		this.startingY = this.y;
		this.isJumping = false;

		this.img = new Image();
		this.img.src = imgSrc;
		this.width = width / numOfFrames;
		this.height = height;
		this.numOfFrames = numOfFrames;

		this.currentFrame = 0;
		this.frameInterval = 5;
		this.frameCounter = 0;

	}

	#draw(ctx){
		ctx.drawImage(
			this.img,
			this.width * this.currentFrame,
			0,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	jump(){
		if(!this.isJumping){
			this.dy = -25;
			this.isJumping = true;
		}
	}

	crouch(){
		console.log('crouch!')
	}

	update({ctx}){

		this.y += this.dy;
		this.frameCounter++;

		if(this.y <= this.maxHeight){
			this.dy += this.gravity;
		}

		if(this.y >= this.startingY){
			this.dy = 0;
			this.y = this.startingY;
			this.isJumping = false;
		}

		if(this.frameCounter % this.frameInterval == 0 && this.currentFrame < this.numOfFrames){
			this.currentFrame++;
		}

		if(this.currentFrame == this.numOfFrames){
			this.currentFrame = 0;
		}

		this.#draw(ctx);

	}
}

export default Dino