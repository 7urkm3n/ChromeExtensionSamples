chrome.alarms.create({
  periodInMinutes: 1 / 60
});

chrome.alarms.onAlarm.addListener(alarm => {
  chrome.storage.local.get(['timer', 'isRunning'], res => {
    let time = res.timer ?? 0;
    let isRunning = res.isRunning ?? true;
    if (!isRunning) return;

    chrome.storage.local.set({
      timer: time + 1
    });
    chrome.action.setBadgeText({
      text: `${time + 1}`
    });
    chrome.storage.local.get(['notificationTime'], res => {
      let notificationTime = res.notificationTime ?? 1000;
      if (time % notificationTime === 0) {
        this.registration.showNotification('Chrome Time Extension', {
          body: `${notificationTime} seconds has passed!`,
          icon: 'icon.png'
        });
      }
    });
  });
});
