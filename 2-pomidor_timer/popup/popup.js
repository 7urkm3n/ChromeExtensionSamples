let tasks = [];

let timer = document.getElementById("timer");
const updateTimer = () => {
  chrome.storage.local.get(["timer", "timerOption"], (res) => {
    let min = `${res.timerOption - Math.ceil(res.timer / 60)}`.padStart(2, "0");
    let sec = "00";
    if (res.timer % 60 != 0) {
      sec = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    timer.textContent = `${min}:${sec}`;
  });
};

updateTimer();
setInterval(updateTimer, 1000);
chrome.storage.local.get(["isRunning", "timer"], (res) => {
  if (res.timer === 0) {
    startTimerBtn.textContent = !res.isRunning ? "Start Timer" : "Pause Timer";
  } else {
    startTimerBtn.textContent = !res.isRunning
      ? "Continue Timer"
      : "Pause Timer";
  }
});

const startTimerBtn = document.getElementById("start-timer");
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning", "timer"], (res) => {
    startTimerBtn.textContent = !res.isRunning
      ? "Pause Timer"
      : "Continue Timer";
    chrome.storage.local.set({ isRunning: !res.isRunning }, () => {});
  });
});

const resetTimerBtn = document.getElementById("reset-timer");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set({ timer: 0, isRunning: false }, () => {
    startTimerBtn.textContent = "Start Timer";
  });
});

const addTaskBtn = document.getElementById("add-task");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.local.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

const saveTasks = () => {
  chrome.storage.local.set({ tasks });
};

const renderTask = (taskNum) => {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");

  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskNum];
  text.className = "task-input";
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "x";
  deleteBtn.className = "task-delete";
  deleteBtn.addEventListener("click", (e) => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
};

const addTask = () => {
  let n = tasks.length;
  tasks.push("");
  renderTask(n);
  saveTasks();
};

const deleteTask = (taskNum) => {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
};

const renderTasks = () => {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
};
