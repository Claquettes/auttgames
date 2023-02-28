let circles = [];

		function setup() {
			createCanvas(window.innerWidth, window.innerHeight);
			noStroke();
			fill(255, 6);
			for (let i = 0; i < 100; i++) {
				let x = random(width);
				let y = random(height);
				let r = random(20, 60);
				circles.push(new Circle(x, y, r));
			}
		}

		function draw() {
			background(0, 10, 30, 30);
			for (let circle of circles) {
				circle.move();
				circle.show();
			}
		}

		class Circle {
			constructor(x, y, r) {
				this.x = x;
				this.y = y;
				this.r = r;
				this.speedX = random(-2, 2);
				this.speedY = random(-2, 2);
			}

			move() {
				this.x += this.speedX;
				this.y += this.speedY;
				if (this.x < -this.r || this.x > width + this.r) {
					this.speedX *= -1;
				}
				if (this.y < -this.r || this.y > height + this.r) {
					this.speedY *= -1;
				}
			}

			show() {
				ellipse(this.x, this.y, this.r * 2);
			}
		}