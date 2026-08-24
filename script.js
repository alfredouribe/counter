const TARGET = new Date(2026, 7, 29, 7, 0, 0);

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  countdown: document.querySelector(".countdown"),
  celebration: document.querySelector(".celebration"),
};

function pad(n) {
  return String(n).padStart(2, "0");
}

let timer;

function tick() {
  const diff = TARGET.getTime() - Date.now();

  if (diff <= 0) {
    els.countdown.style.display = "none";
    els.celebration.style.display = "flex";
    clearInterval(timer);
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

tick();
timer = setInterval(tick, 1000);
