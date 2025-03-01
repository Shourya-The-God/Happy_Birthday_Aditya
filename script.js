// script.js
document.getElementById("birthdayCard").addEventListener("click", function () {
  this.classList.toggle("open");

  if (this.classList.contains("open")) {
    document.getElementById("birthdaySong").play();
    startConfetti();
  } else {
    document.getElementById("birthdaySong").pause();
    stopConfetti();
  }
});

// Confetti effect
const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiParticles = [];
const colors = ["#ff6f61", "#ffcccb", "#fad0c4", "#ff9a9e", "#d2691e"];

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createConfettiParticle() {
  return {
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    size: Math.random() * 10 + 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 3 + 2,
    angle: Math.random() * Math.PI * 2,
  };
}

function startConfetti() {
  confettiParticles = Array.from({ length: 100 }, createConfettiParticle);
  requestAnimationFrame(updateConfetti);
}

function stopConfetti() {
  confettiParticles = [];
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

function updateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach((p, i) => {
    p.y += p.speed;
    p.x += Math.cos(p.angle);
    p.angle += 0.01;

    if (p.y > confettiCanvas.height) {
      confettiParticles[i] = createConfettiParticle();
    }

    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(p.x, p.y, p.size, p.size);
  });

  if (confettiParticles.length > 0) {
    requestAnimationFrame(updateConfetti);
  }
}
