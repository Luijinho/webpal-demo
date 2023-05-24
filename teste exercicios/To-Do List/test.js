const assert = require('chai').assert;

describe('To-Do List', function() {
  const taskInput = document.getElementById('taskInput');
  const addButton = document.getElementById('addButton');
  const taskList = document.getElementById('taskList');
  const resetButton = document.getElementById('resetButton');

  it('should have the correct initial values', function() {
    assert.equal(taskInput.value, '', 'Task input should be empty');
    assert.equal(taskList.children.length, 0, 'Task list should be empty');
  });

  it('should add a task to the list when clicking the add button', function() {
    taskInput.value = 'Task 1';
    addButton.click();
    assert.equal(taskList.children.length, 1, 'Task should be added to the list');
    assert.equal(taskList.children[0].textContent.trim(), 'Task 1', 'Task text should be correct');
  });

  it('should remove a task from the list when clicking the delete button', function() {
    const deleteButton = taskList.querySelector('.delButton');
    deleteButton.click();
    assert.equal(taskList.children.length, 1, 'Task should be removed from the list');
  });

  it('should clear the task list when clicking the reset button', function() {
    resetButton.click();
    assert.equal(taskList.children.length, 0, 'Task list should be empty');
  });

  it('should have cursor: pointer for the add and reset buttons', function() {
    const addButtonStyle = getComputedStyle(addButton);
    const resetButtonStyle = getComputedStyle(resetButton);

    assert.equal(addButtonStyle.cursor, 'pointer', 'Cursor should be pointer when hovering the Add button');
    assert.equal(resetButtonStyle.cursor, 'pointer', 'Cursor should be pointer when hovering the Reset button');
  });
});
