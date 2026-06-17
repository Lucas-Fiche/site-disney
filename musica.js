// --- Música de fundo (compartilhado entre as páginas) ---
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
