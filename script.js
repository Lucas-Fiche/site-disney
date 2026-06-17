// --- Música de fundo ---
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const musicText = musicToggle.querySelector(".music-text");

let isPlaying = false;

function updateMusicButton() {
  if (isPlaying) {
    musicToggle.classList.add("playing");
    musicText.textContent = "Pausar música";
  } else {
    musicToggle.classList.remove("playing");
    musicText.textContent = "Tocar música";
  }
}

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    isPlaying = false;
  } else {
    music.play().then(() => {
      isPlaying = true;
      updateMusicButton();
    }).catch(() => {
      alert("Adicione um arquivo de música em assets/musica.mp3 para ouvir 🎶");
    });
  }
  updateMusicButton();
});

// Tenta iniciar a música automaticamente. Os navegadores geralmente
// bloqueiam o autoplay com som, então tocamos no primeiro clique/toque.
function tryAutoplay() {
  music.play().then(() => {
    isPlaying = true;
    updateMusicButton();
  }).catch(() => {
    // Autoplay bloqueado: espera a primeira interação do usuário.
    document.addEventListener("click", startOnInteraction, { once: true });
    document.addEventListener("touchstart", startOnInteraction, { once: true });
  });
}

function startOnInteraction() {
  if (!isPlaying) {
    music.play().then(() => {
      isPlaying = true;
      updateMusicButton();
    }).catch(() => {});
  }
}

window.addEventListener("load", tryAutoplay);

// --- Foto: tenta vários formatos de arquivo ---
const photo = document.getElementById("photo");
const photoFrame = photo.parentElement;
const photoCandidates = [
  "assets/foto.jpg",
  "assets/foto.jpeg",
  "assets/foto.png",
  "assets/foto.webp",
];

function tryLoadPhoto(index) {
  if (index >= photoCandidates.length) {
    // Nenhum arquivo encontrado: mostra o espaço indicando onde colocar a foto.
    photo.style.display = "none";
    photoFrame.classList.add("empty");
    return;
  }
  photo.src = photoCandidates[index];
}

photo.addEventListener("error", () => {
  const current = photo.getAttribute("src");
  const next = photoCandidates.indexOf(current) + 1;
  tryLoadPhoto(next);
});

photo.addEventListener("load", () => {
  photo.style.display = "block";
  photoFrame.classList.remove("empty");
});

tryLoadPhoto(0);

// --- Confirmar presença ---
const confirmBtn = document.getElementById("confirm-btn");
const confirmMessage = document.getElementById("confirm-message");

confirmBtn.addEventListener("click", () => {
  confirmBtn.classList.add("confirmed");
  confirmBtn.textContent = "Presença confirmada ✓";
  confirmMessage.textContent = "Que magia! Agora escolha o parque ✨";
  launchConfetti();
  // Abre a página de escolha dos parques após uma breve animação.
  setTimeout(() => {
    window.location.href = "parques.html";
  }, 1200);
});

// Confete simples com emojis
function launchConfetti() {
  const emojis = ["✨", "🎉", "💛", "⭐", "🎊"];
  for (let i = 0; i < 30; i++) {
    const c = document.createElement("span");
    c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    c.style.position = "fixed";
    c.style.left = Math.random() * 100 + "vw";
    c.style.top = "-40px";
    c.style.fontSize = 14 + Math.random() * 18 + "px";
    c.style.zIndex = 99;
    c.style.pointerEvents = "none";
    c.style.transition = "transform 2.5s ease-in, opacity 2.5s ease-in";
    document.body.appendChild(c);

    requestAnimationFrame(() => {
      c.style.transform = `translateY(110vh) rotate(${Math.random() * 720}deg)`;
      c.style.opacity = "0";
    });

    setTimeout(() => c.remove(), 2600);
  }
}
