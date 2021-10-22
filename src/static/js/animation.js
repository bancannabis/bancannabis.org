/* Credit goes to: Johan Karlsson and his Post about Particles in Flowfields:
https://codepen.io/DonKarlssonSan/post/particles-in-simplex-noise-flow-field */

let canvas, ctx, field, w, h, fieldSize, columns, rows, noiseZ, particles, hue;
(noiseZ = 0);
particleCount = 2000;
particleSize = 0.9;
fieldSize = 70;
fieldForce = 0.15;
noiseSpeed = 0.003;
sORp = true;
trailLength = 0.15;
hueBase = 10;
hueRange = 5;
maxSpeed = 2.5;
enableGUI = true;

var ui = new function() {
  this.particleCount = particleCount;
  this.particleSize = particleSize;
  this.fieldSize = fieldSize;
  this.fieldForce = fieldForce;
  this.noiseSpeed = noiseSpeed;
  this.simplexOrPerlin = sORp;
  this.trailLength = trailLength;
  this.maxSpeed = maxSpeed;
  this.hueBase = hueBase;
  this.hueRange = hueRange;

  this.change = function() {
    particleSize = ui.particleSize;
    fieldSize = ui.fieldSize;
    fieldForce = ui.fieldForce;
    noiseSpeed = ui.noiseSpeed;
    maxSpeed = ui.maxSpeed;
    hueBase = ui.hueBase;
    hueRange = ui.hueRange;
    fieldColor = ui.fieldColor;
    ui.simplexOrPerlin?sORp=1:sORp=0;
  }

  this.reset = function() {
    particleCount = ui.particleCount;
    reset();
  }

  this.bgColor = function(){
    trailLength = ui.trailLength;
  }
}();

if(enableGUI){
  var gui = new dat.GUI();
  f1 = gui.addFolder("Color");
  f2 = gui.addFolder("Particle");
  f3 = gui.addFolder("Flowfield");
  f1.add(ui, "hueBase", 0, 360).onChange(ui.change);
  f1.add(ui, "hueRange", 0, 40).onChange(ui.change);
  f2.add(ui, "particleCount", 1000, 10000).step(100).onChange(ui.reset);
  f2.add(ui, "particleSize", 0.1, 3).onChange(ui.change);
  f2.add(ui, "trailLength", 0.05, 0.60).onChange(ui.bgColor);
  f2.add(ui, "maxSpeed", 1.0, 4.0).onChange(ui.change);
  f3.add(ui, "fieldSize", 10, 150).step(1).onChange(ui.change);
  f3.add(ui, "fieldForce", 0.05, 1).onChange(ui.change);
  f3.add(ui, "noiseSpeed", 0.001, 0.005).onChange(ui.change);
  f3.add(ui, "simplexOrPerlin").onChange(ui.change);
}

class Particle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(Math.random() - 0.5, Math.random() - 0.5);
    this.acc = new Vector(0, 0);
    this.hue = Math.random()*30-15;
  }

  move(acc) {
    if (acc) {
      this.acc.addTo(acc);
    }
    this.vel.addTo(this.acc);
    this.pos.addTo(this.vel);
    if (this.vel.getLength() > maxSpeed) {
      this.vel.setLength(maxSpeed);
    }
    this.acc.setLength(0);
  }

  wrap() {
    if (this.pos.x > w) {
      this.pos.x = 0;
    } else if (this.pos.x < -this.fieldSize) {
      this.pos.x = w - 1;
    }
    if (this.pos.y > h) {
      this.pos.y = 0;
    } else if (this.pos.y < -this.fieldSize) {
      this.pos.y = h - 1;
    }
  }
}

canvas = document.querySelector("#canvas");
ctx = canvas.getContext("2d");
reset();
window.addEventListener("resize", reset);

function initParticles() {
  particles = [];
  let numberOfParticles = particleCount;
  for (let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle(Math.random() * w, Math.random() * h);
    particles.push(particle);
  }
}

function initField() {
  field = new Array(columns);
  for (let x = 0; x < columns; x++) {
    field[x] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      let v = new Vector(0, 0);
      field[x][y] = v;
    }
  }
}

function calcField() {
  if (sORp) {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        let angle = noise.simplex3(x / 20, y / 20, noiseZ) * Math.PI * 2;
        let length = noise.simplex3(x / 40 + 40000, y / 40 + 40000, noiseZ) * fieldForce;
        field[x][y].setLength(length);
        field[x][y].setAngle(angle);
      }
    }
  } else {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        let angle = noise.perlin3(x / 20, y / 20, noiseZ) * Math.PI * 2;
        let length = noise.perlin3(x / 40 + 40000, y / 40 + 40000, noiseZ) * fieldForce;
        field[x][y].setLength(length);
        field[x][y].setAngle(angle);
      }
    }
  }
}

function reset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  //ctx.strokeStyle = fieldColor;
  noise.seed(Math.random());
  columns = Math.round(w / fieldSize) + 1;
  rows = Math.round(h / fieldSize) + 1;
  initParticles();
  initField();
}

function draw() {
  requestAnimationFrame(draw);
  calcField();
  noiseZ += noiseSpeed;
  drawBackground();
  drawParticles();
}

function drawBackground() {
  ctx.fillStyle = "rgba(0,0,0,"+ui.trailLength+")";
  ctx.fillRect(0, 0, w, h);
}

function drawParticles() {
  particles.forEach(p => {
    var ps = p.fieldSize = Math.abs(p.vel.x + p.vel.y)*particleSize + 0.3;
    ctx.fillStyle = "hsl("+(hueBase + p.hue + ((p.vel.x + p.vel.y)*hueRange))+", 100%, 50%)";
    ctx.fillRect(p.pos.x, p.pos.y, ps, ps);
    let pos = p.pos.div(fieldSize);
    let v;
    if (pos.x >= 0 && pos.x < columns && pos.y >= 0 && pos.y < rows) {
      v = field[Math.floor(pos.x)][Math.floor(pos.y)];
    }
    p.move(v);
    p.wrap();
  });
}

draw();