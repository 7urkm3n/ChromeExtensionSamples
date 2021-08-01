const timeEl = document.querySelector("#time");
const nameEl = document.querySelector("#name");
const timerEl = document.querySelector("#timer");
const updateTimeEl = () => {
  timeEl.textContent = `The time is: ${new Date().toLocaleTimeString()}`;
  chrome.storage.local.get(["timer"], (res) => {
    let timer = res.timer ?? 1000;
    timerEl.textContent = `Timer: ${timer}`;
  });
};

updateTimeEl();
setInterval(updateTimeEl, 1000);

chrome.storage.local.get(["name"], (res) => {
  let name = res.name ?? "";
  nameEl.textContent = `The name: ${name}`;
});

const startTimer = document.querySelector("#startTimer");
const stopTimer = document.querySelector("#stopTimer");
const resetTimer = document.querySelector("#resetTimer");

startTimer.addEventListener("click", () => {
  chrome.storage.local.set({ isRunning: true });
});

stopTimer.addEventListener("click", () => {
  chrome.storage.local.set({ isRunning: false });
});

resetTimer.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  });
});
