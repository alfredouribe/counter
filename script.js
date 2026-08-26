const TARGET = new Date(2026, 7, 29, 8, 30, 0);

const LYRICS = [
  ["Hay un conteo corriendo hacia ti", "Y cuando llegue a cero, esto apenas empieza"],
  [
    "Semanas de pantalla contando los días",
    "Tu voz en la distancia ya se siente cercana",
    "Imagino un bosque, las hojas, el silencio",
    "Y tu mano en la mía, sin que nada se rompa",
  ],
  [
    "Ya no va a haber pantalla que nos separe",
    "Por fin tus ojos, sin filtro, frente a los míos",
    "No hay fecha ni cura que lo tenga que firmar",
    "Solo tú y yo, diciendo lo que hay que decir",
  ],
  [
    "Cásate conmigo, aunque sea con la mirada",
    "Cásate conmigo, en el bosque, sin ceremonia",
    "El anillo va a esperar a que estemos ahí",
    "Para darle la intención que se merece, frente a ti",
  ],
  [
    "No es la boda de mañana, ni fecha en el calendario",
    "Es la certeza de que sí, de que esto va en serio",
    "Tú ya viste los anillos, dijiste que esperemos",
    "Para dárseles la intención el día que nos veamos",
  ],
  [
    "Imagino el bosque, las hojas cayendo despacio",
    "Tu mano en la mía, mirándonos sin prisa",
    "No necesitamos cura ni fecha en un papel",
    "Solo necesitamos vernos, y decir que sí, otra vez",
  ],
  [
    "Cásate conmigo, aunque sea con la mirada",
    "Cásate conmigo, en el bosque, sin ceremonia",
    "El anillo va a esperar a que estemos ahí",
    "Para darle la intención que se merece, frente a ti",
  ],
  ["El contador va a llegar a cero", "Y ahí, por fin, va a empezar todo esto"],
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
};

function setupLyrics() {
  const lines = [];

  LYRICS.forEach((stanza) => {
    const stanzaEl = document.createElement("div");
    stanzaEl.className = "lyrics-stanza";

    stanza.forEach((text) => {
      const lineEl = document.createElement("p");
      lineEl.className = "lyrics-line";
      lineEl.textContent = text;
      stanzaEl.appendChild(lineEl);
      lines.push(lineEl);
    });

    els.lyrics.appendChild(stanzaEl);
  });

  let activeLine = null;

  function assignTimings() {
    const duration = els.audio.duration;
    if (!duration || !isFinite(duration)) return;

    lines.forEach((lineEl, i) => {
      lineEl.dataset.start = (duration * i) / lines.length;
    });
  }

  function highlight() {
    const t = els.audio.currentTime;
    let current = null;

    for (const lineEl of lines) {
      const start = Number(lineEl.dataset.start);
      if (!isNaN(start) && t >= start) {
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

  els.audio.addEventListener("loadedmetadata", assignTimings);
  els.audio.addEventListener("timeupdate", highlight);
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
