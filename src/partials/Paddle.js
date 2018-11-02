import { SVG_NS } from "../settings";

export default class Paddle {
  constructor(
    boardHeight,
    // boardWidth,
    width,
    height,
    x,
    y,
    up,
    down,
    player
    // p1Left,
    // p1Right,
    // p2Left,
    // p2Right
  ) {
    this.boardHeight = boardHeight;
    // this.boardWidth = boardWidth;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    this.keyUp = up;
    this.keyDown = down;
    // this.keyLeftP1 = p1Left;
    // this.keyRightP1 = p1Right;
    // this.keyLeftP2 = p2Left;
    // this.keyRightP2 = p2Right;
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

  // p1Left() {
  //   this.x = Math.min(this.x - this.speed, this.boardWidth + 10);
  // }
  // p1Right() {
  //   this.x = Math.max(this.x + this.speed, this.boardWidth / 2);
  // }

  // p2Left() {
  //   this.x = Math.min(this.x - this.speed, this.boardWidth / 2);
  // }
  // p2Right() {
  //   this.x = Math.max(this.x + this.speed, this.boardWidth - 10);
  // }

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
