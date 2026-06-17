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
