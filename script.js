let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let gravaty = 1;
let friction = 0.99;
//utility function
let randomInchformRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  this.update = () => {
    // this condition for y velocity
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravaty;
    }
    // it's for x velocity
    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
    } else {
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };
}
//Implementation
let ball;
let ballArray;
function Init() {
  ballArray = [];
let loopLength = window.innerWidth < 992 ? 50 : 100;

  for (let i = 0; i < loopLength; i++) {
    let radius = Math.random() * 40;
    let x = randomInchformRange(radius, canvas.width - radius);
    let y = randomInchformRange(0, canvas.height - radius);
    let dx = randomInchformRange(-2, 2);
    let dy = randomInchformRange(-2, 2);
    let Color = [6, 7, 8, 9, 5, "A", 0, "B", 1, "C", 2, "D", 3, "E", 4, "F"];
    let randomColor = "#";
    for (let i = 0; i < 6; i++) {
      randomColor = randomColor + Math.floor(Math.random() * Color.length);
    }
    // if your want to solid color un comment this code
    // if (randomColor.length > 7) {
    //   randomColor = randomColor.slice(0,7)
    // }
    ballArray.push(new Ball(x, y, dx, dy, radius, randomColor));
  }
}
let animation = (e) => {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
};
Init();
animation();
addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  Init()
});
