const nameInput = document.getElementById('name-input');
const timeInput = document.getElementById('time-input');
const btnSave = document.getElementById('save-btn');

btnSave.addEventListener('click', () => {
  const name = nameInput.value;
  const notificationTime = timeInput.value;
  chrome.storage.local.set({
    name,
    notificationTime
  });
});

chrome.storage.local.get(['name', 'notificationTime'], res => {
  nameInput.value = res.name ?? '';
  timeInput.value = res.notificationTime ?? 1000;
});
