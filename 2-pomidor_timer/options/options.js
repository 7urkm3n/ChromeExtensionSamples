const setTimer = document.getElementById("set-timer");
setTimer.addEventListener("change", (event) => {
  const val = event.target.value;
  if (val < 1 || val > 60) {
    setTimer.value = 25;
  }
});

const saveTimer = document.getElementById("save-timer");
saveTimer.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
    timerOption: setTimer.value,
  });
});

chrome.storage.local.get(["timerOption"], (res) => {
  setTimer.value = res.timerOption;
});
