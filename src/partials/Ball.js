import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.reset();
    this.currentColor = ["#FFFFFF", "#353535"];
    this.counter = 0;
    this.timer = 0;
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.random() * 10 - 5;
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitTop) {
      this.vy *= -1;
    } else if (hitBottom) {
      this.vy *= -1;
    } else if (hitLeft) {
      this.vx *= -1;
    } else if (hitRight) {
      this.vx *= -1;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      //...
      let paddle = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height
      );
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        (this.y >= topY && this.y <= bottomY)
      ) {
        this.vx *= -1;
      }
    } else {
      //...
    }
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    let ball = document.createElementNS(SVG_NS, "circle");
    ball.setAttributeNS(null, "fill", this.currentColor[this.counter]);
    ball.setAttributeNS(null, "r", this.radius);
    ball.setAttributeNS(null, "cx", this.x);
    ball.setAttributeNS(null, "cy", this.y);
    // this.timer++;
    // if (this.timer === 260) {
    //   this.counter++;
    //   if (this.counter > 1) {
    //     this.counter = 0;
    //   } else if (this.timer > 260) {
    //     this.counter = 0;
    //   }
    // }

    svg.appendChild(ball);
  }
}
