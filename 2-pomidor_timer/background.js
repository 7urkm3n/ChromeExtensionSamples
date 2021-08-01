chrome.alarms.create("pomidorTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomidorTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timerOption"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        if (timer === 60 * res.timerOption) {
          this.registration.showNotification("Pomidor Timer", {
            body: `${res.timerOption} mins has been passed!`,
            icon: "icon.png",
          });
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({ timer, isRunning });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning", "timerOption"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timerOption: "timerOption" in res ? res.timerOption : 25,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
