const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const resetButton = document.getElementById('resetButton');

function addTask() {
  const task = taskInput.value.trim();
  if (task !== '') {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `${task} <button class="delButton">Delete</button>`;
    taskList.appendChild(taskItem);
    taskInput.value = '';
  }
}

addButton.addEventListener('click', addTask);

taskList.addEventListener('click', function(event) {
  if (event.target.classList.contains('delButton')) {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
  }
});

resetButton.addEventListener('click', function() {
  taskList.innerHTML = '';
});
