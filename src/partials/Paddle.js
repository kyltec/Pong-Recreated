import { SVG_NS } from "../settings";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down, player) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    this.keyUp = up;
    this.keyDown = down;
    this.player = player;
    this.keyState = {};

    document.addEventListener(
      "keydown",
      event => {
        this.keyState[event.key || event.which] = true;
      },
      true
    );

    document.addEventListener(
      "keyup",
      event => {
        this.keyState[event.key || event.which] = false;
      },
      true
    );
  }
  //...

  up() {
    this.y = Math.max(this.y - this.speed, 0);
  }

  down() {
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  render(svg) {
    if (this.keyState[this.keyUp] && this.player === "player1") {
      this.up();
    }
    if (this.keyState[this.keyDown] && this.player === "player1") {
      this.down();
    }
    if (this.keyState[this.keyUp] && this.player === "player2") {
      this.up();
    }
    if (this.keyState[this.keyDown] && this.player === "player2") {
      this.down();
    }

    let paddle = document.createElementNS(SVG_NS, "rect");
    paddle.setAttributeNS(null, "fill", "#FFFFFF");
    paddle.setAttributeNS(null, "width", this.width);
    paddle.setAttributeNS(null, "height", this.height);
    paddle.setAttributeNS(null, "x", this.x);
    paddle.setAttributeNS(null, "y", this.y);

    svg.appendChild(paddle);
  }
}
