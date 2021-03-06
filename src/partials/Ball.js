import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.reset();
    this.ping = new Audio("public/sounds/pong-01.wav");
    this.winner = 5;

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
      let paddle2 = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height
      );

      let [leftX, rightX, topY, bottomY] = paddle2;

      if (
        this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        (this.y + this.radius >= topY && this.y + this.radius <= bottomY)
      ) {
        this.vx *= -1;
        this.ping.play();
      }
    } else if (this.vx < 0) {
      //...
      let paddle1 = player1.coordinates(
        player1.x,
        player1.y,
        player1.width,
        player1.height
      );
      let [leftX, rightX, topY, bottomY] = paddle1;
      if (
        this.x - this.radius >= leftX &&
        this.x - this.radius <= rightX &&
        (this.y + this.radius >= topY && this.y + this.radius <= bottomY)
      ) {
        this.vx *= -1;
        this.ping.play();
      }
    }
  }

  goal(player) {
    player.score++;
    if (player.score === this.winner) {
      alert("Winner: " + player.player);
      alert("The game will now restart.");
      location.reload();
    }

    this.reset();
  }

  changeColor() {
    setTimeout(() => {
      this.counter = 0;
    }, 150);
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    if (this.x - this.radius <= 0) {
      this.goal(player2);
      this.direction = 1;
    } else if (this.x + this.radius >= this.boardWidth) {
      this.goal(player1);
      this.direction = -1;
    }

    let ball = document.createElementNS(SVG_NS, "circle");
    ball.setAttributeNS(null, "fill", this.currentColor[this.counter]);
    ball.setAttributeNS(null, "r", this.radius);
    ball.setAttributeNS(null, "cx", this.x);
    ball.setAttributeNS(null, "cy", this.y);

    this.timer++;
    if (this.timer === 100) {
      this.counter++;
      this.changeColor();
      this.timer = 0;
    }

    svg.appendChild(ball);
  }
}
