// Lista dos 7 parques. Personalize os nomes, descrições e imagens.
// Para a imagem, coloque o arquivo em assets/ com o nome indicado em "img"
// (aceita .jpg, .jpeg, .png ou .webp).
const parques = [
  {
    img: "parque1",
    nome: "Animal Kingdom",
    local: "Walt Disney World, Orlando",
    descricao: "Natureza, animais e aventura no mundo de Pandora (Avatar).",
  },
  {
    img: "parque2",
    nome: "Hollywood Studios",
    local: "Walt Disney World, Orlando",
    descricao: "O mundo do cinema, com as áreas de Star Wars e Toy Story.",
  },
  {
    img: "parque3",
    nome: "Universal Studios",
    local: "Universal Orlando Resort",
    descricao: "Os bastidores do cinema, com atrações dos Minions, Simpsons e mais.",
  },
  {
    img: "parque4",
    nome: "Islands of Adventure",
    local: "Universal Orlando Resort",
    descricao: "Harry Potter, Jurassic Park e super-heróis da Marvel.",
  },
  {
    img: "parque5",
    nome: "Epic Universe",
    local: "Universal Orlando Resort",
    descricao: "O mais novo parque da Universal, com mundos imersivos de tirar o fôlego.",
  },
  {
    img: "parque6",
    nome: "Busch Gardens",
    local: "Tampa, Flórida",
    descricao: "Safári africano e algumas das montanhas-russas mais radicais.",
  },
];

const listEl = document.getElementById("parks-list");
const confirmBtn = document.getElementById("park-confirm-btn");
const messageEl = document.getElementById("park-message");

let selecionado = null;

// Tenta carregar a imagem do parque em vários formatos.
function carregarImagem(imgEl, baseName) {
  const exts = ["jpg", "jpeg", "png", "webp"];
  let i = 0;
  function tentar() {
    if (i >= exts.length) {
      imgEl.style.display = "none";
      imgEl.parentElement.classList.add("empty");
      return;
    }
    imgEl.src = `assets/${baseName}.${exts[i]}`;
    i++;
  }
  imgEl.addEventListener("error", tentar);
  imgEl.addEventListener("load", () => {
    imgEl.style.display = "block";
    imgEl.parentElement.classList.remove("empty");
  });
  tentar();
}

// Cria os cards dos parques.
parques.forEach((parque, index) => {
  const card = document.createElement("button");
  card.className = "park-card";
  card.type = "button";
  card.dataset.index = index;

  const frame = document.createElement("div");
  frame.className = "park-photo";
  const img = document.createElement("img");
  img.alt = parque.nome;
  const placeholder = document.createElement("span");
  placeholder.className = "park-placeholder";
  placeholder.innerHTML = `📷<br />assets/${parque.img}.jpg`;
  frame.appendChild(img);
  frame.appendChild(placeholder);

  const info = document.createElement("div");
  info.className = "park-info";
  info.innerHTML = `
    <h2>${parque.nome}</h2>
    <p class="park-local">📍 ${parque.local}</p>
    <p class="park-desc">${parque.descricao}</p>
  `;

  card.appendChild(frame);
  card.appendChild(info);
  listEl.appendChild(card);

  carregarImagem(img, parque.img);

  card.addEventListener("click", () => {
    document.querySelectorAll(".park-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    selecionado = parque;
    confirmBtn.disabled = false;
    messageEl.textContent = "";
  });
});

// Confirma a escolha do parque.
confirmBtn.addEventListener("click", () => {
  if (!selecionado) return;
  confirmBtn.classList.add("confirmed");
  confirmBtn.textContent = "Escolha confirmada ✓";
  messageEl.textContent = `Você escolheu: ${selecionado.nome}! ✨`;
  try {
    localStorage.setItem("parqueEscolhido", selecionado.nome);
  } catch (e) {
    // Ignora caso o navegador bloqueie o armazenamento.
  }
});
