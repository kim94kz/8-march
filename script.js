const wishes = [
  "Пусть весна принесёт новые идеи и тёплые встречи!",
  "Пусть каждый проект завершается блестящим успехом!",
  "Пусть в жизни будет больше поводов для радости и гордости!",
  "Пусть рядом всегда будут поддержка, гармония и вдохновение!"
];

const wishBtn = document.getElementById("wishBtn");
const extraWish = document.getElementById("extraWish");

wishBtn.addEventListener("click", () => {
  const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
  extraWish.textContent = `💐 ${randomWish}`;
  extraWish.animate(
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 450, easing: "ease-out" }
  );
});

const canvas = document.getElementById("petals-canvas");
const ctx = canvas.getContext("2d");
let petals = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createPetal() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    size: Math.random() * 8 + 4,
    speedY: Math.random() * 1.2 + 0.6,
    speedX: Math.random() * 0.9 - 0.45,
    rotation: Math.random() * Math.PI,
    rotationSpeed: Math.random() * 0.04 - 0.02,
    color: `hsla(${Math.random() * 45 + 320}, 85%, 80%, 0.85)`
  };
}

function initPetals(count = 70) {
  petals = Array.from({ length: count }, createPetal);
}

function drawPetal(petal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);
  ctx.fillStyle = petal.color;

  ctx.beginPath();
  ctx.ellipse(0, 0, petal.size * 0.65, petal.size, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function updatePetal(petal) {
  petal.y += petal.speedY;
  petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.35;
  petal.rotation += petal.rotationSpeed;

  if (petal.y > canvas.height + 20 || petal.x < -30 || petal.x > canvas.width + 30) {
    Object.assign(petal, createPetal(), { y: -20 });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach((petal) => {
    updatePetal(petal);
    drawPetal(petal);
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  initPetals();
});

resizeCanvas();
initPetals();
animate();
