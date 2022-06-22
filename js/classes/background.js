class Background {
	constructor(x, y, imgSrc){
		this.x = x;
		this.y = y;
		this.img = new Image();
		this.img.src = imgSrc;
	}

	#draw(ctx){
		ctx.drawImage(this.img, this.x, this.y);
		ctx.drawImage(this.img, this.x + this.img.width, this.y);
	}


	update({ ctx, dx }){
		this.x += dx
		this.#draw(ctx);

		if(this.x <= (-this.img.width)){
			this.x = 0
		}
	}
}

export default Background;