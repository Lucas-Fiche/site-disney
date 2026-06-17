// Descobre o parque escolhido (pela URL ou pelo armazenamento do navegador).
const params = new URLSearchParams(window.location.search);
let parque = params.get("parque");
if (!parque) {
  try {
    parque = localStorage.getItem("parqueEscolhido");
  } catch (e) {
    parque = null;
  }
}

const messageEl = document.getElementById("final-message");
messageEl.textContent = parque ? `NOS VEMOS NO ${parque}` : "NOS VEMOS LÁ ✨";

// Carrega a imagem central tentando vários formatos.
const photo = document.getElementById("final-photo");
const photoFrame = photo.parentElement;
const candidatos = [
  "assets/final.jpg",
  "assets/final.jpeg",
  "assets/final.png",
  "assets/final.webp",
];

function tentarImagem(i) {
  if (i >= candidatos.length) {
    photo.style.display = "none";
    photoFrame.classList.add("empty");
    return;
  }
  photo.src = candidatos[i];
}

photo.addEventListener("error", () => {
  const atual = photo.getAttribute("src");
  tentarImagem(candidatos.indexOf(atual) + 1);
});

photo.addEventListener("load", () => {
  photo.style.display = "block";
  photoFrame.classList.remove("empty");
});

tentarImagem(0);

// Chuva de emojis caindo sem parar.
const EMOJIS = ["💛", "✨", "⭐", "🎉", "🎊"];

function soltarEmoji() {
  const el = document.createElement("span");
  el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  el.style.position = "fixed";
  el.style.left = Math.random() * 100 + "vw";
  el.style.top = "-50px";
  el.style.fontSize = 16 + Math.random() * 24 + "px";
  el.style.zIndex = 0;
  el.style.pointerEvents = "none";
  const duracao = 3 + Math.random() * 3;
  el.style.transition = `transform ${duracao}s linear, opacity ${duracao}s linear`;
  document.body.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = `translateY(110vh) rotate(${(Math.random() - 0.5) * 360}deg)`;
    el.style.opacity = "0.2";
  });

  setTimeout(() => el.remove(), duracao * 1000 + 200);
}

// Cria alguns emojis a cada intervalo, para sempre.
setInterval(() => {
  const quantidade = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < quantidade; i++) soltarEmoji();
}, 350);
