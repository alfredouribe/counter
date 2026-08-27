const TARGET = new Date(2026, 7, 29, 8, 30, 0);

const LYRICS = [
  [
    { start: 6.0, text: "Hay un conteo corriendo hacia ti" },
    { start: 9.0, text: "y cuando llegue a cero, te voy a pedir la vida entera" },
  ],
  [
    { start: 27.0, text: "Semanas de pantalla contando los días" },
    { start: 30.5, text: "tu voz en la distancia ya me tiene rendido" },
    { start: 34.0, text: "imagino un banco, tu abrigo, la tarde quieta" },
    { start: 38.0, text: "y tu mano en la mía, sin que falte nada" },
  ],
  [
    { start: 42.0, text: "Ya no va a haber pantalla que nos separe" },
    { start: 46.0, text: "por fin tus ojos, sin filtro, frente a los míos" },
    { start: 49.0, text: "no hay fecha ni excusa que lo tenga que firmar" },
    { start: 52.0, text: "solo tú y yo, diciendo lo que ya sabemos" },
  ],
  [
    { start: 56.0, text: "Cásate conmigo, aunque sea con la mirada" },
    { start: 62.0, text: "cásate conmigo, en el bosque, sin ceremonia" },
    { start: 68.0, text: "el anillo va a esperar a que estemos ahí" },
    { start: 75.0, text: "para darte mi promesa, frente a ti" },
  ],
  [
    { start: 90.0, text: "No es la boda de mañana, ni fecha en el calendario" },
    { start: 96.0, text: "es que contigo me sale decir sí sin miedo" },
    { start: 103.0, text: "tú ya viste los anillos, dijiste que esperemos" },
    { start: 110.0, text: "para darles corazón el día que nos veamos" },
  ],
  [
    { start: 118.0, text: "Imagino el bosque, las hojas moviéndose lento" },
    { start: 121.0, text: "tu mano en la mía, mirándonos sin prisa" },
    { start: 125.0, text: "no necesito un discurso ni una firma en papel" },
    { start: 131.0, text: "solo necesito verte, y pedirte que te quedes" },
  ],
  [
    { start: 138.0, text: "Cásate conmigo, aunque sea con la mirada" },
    { start: 144.0, text: "cásate conmigo, en el bosque, sin ceremonia" },
    { start: 150.0, text: "el anillo va a esperar a que estemos ahí" },
    { start: 157.0, text: "para darte mi promesa, frente a ti" },
  ],
  [
    { start: 164.0, text: "El contador va a llegar a cero" },
    { start: 170.0, text: "y ahí, por fin, va a empezar lo nuestro" },
  ],
];

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  countdown: document.querySelector(".countdown"),
  celebration: document.querySelector(".celebration"),
  lyrics: document.getElementById("lyrics"),
  audio: document.querySelector(".celebration-audio"),
  previewToggle: document.getElementById("previewToggle"),
  proposal: document.getElementById("proposal"),
};

function setupLyrics() {
  const lines = [];

  LYRICS.forEach((stanza) => {
    const stanzaEl = document.createElement("div");
    stanzaEl.className = "lyrics-stanza";

    stanza.forEach(({ start, text }) => {
      const lineEl = document.createElement("p");
      lineEl.className = "lyrics-line";
      lineEl.textContent = text;
      lineEl.dataset.start = start;
      stanzaEl.appendChild(lineEl);
      lines.push(lineEl);
    });

    els.lyrics.appendChild(stanzaEl);
  });

  let activeLine = null;

  function highlight() {
    const t = els.audio.currentTime;
    let current = null;

    for (const lineEl of lines) {
      const start = Number(lineEl.dataset.start);
      if (t >= start) {
        current = lineEl;
      }
    }

    if (current !== activeLine) {
      if (activeLine) activeLine.classList.remove("is-active");
      if (current) {
        current.classList.add("is-active");
        current.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      activeLine = current;
    }
  }

  els.audio.addEventListener("timeupdate", highlight);
  els.audio.addEventListener("ended", () => {
    els.proposal.hidden = false;
    requestAnimationFrame(() => els.proposal.classList.add("is-visible"));
    els.proposal.scrollIntoView({ block: "center", behavior: "smooth" });
  });
}

function pad(n) {
  return String(n).padStart(2, "0");
}

let timer;

function reveal() {
  els.countdown.style.display = "none";
  els.previewToggle.hidden = true;
  els.celebration.style.display = "flex";
  setupLyrics();
  clearInterval(timer);
}

function tick() {
  const diff = TARGET.getTime() - Date.now();

  if (diff <= 0) {
    reveal();
    return;
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  els.days.textContent = days;
  els.hours.textContent = pad(hours);
  els.minutes.textContent = pad(minutes);
  els.seconds.textContent = pad(seconds);
}

if (new URLSearchParams(window.location.search).has("preview")) {
  els.previewToggle.hidden = false;
  els.previewToggle.addEventListener("click", reveal);
}

tick();
timer = setInterval(tick, 1000);
