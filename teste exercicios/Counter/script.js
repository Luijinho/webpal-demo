const countElement = document.getElementById('count');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const resetButton = document.getElementById('reset');

let count = 0;

countElement.textContent = count;

incrementButton.addEventListener('click', function() {
  count++;
  countElement.textContent = count;
});

decrementButton.addEventListener('click', function() {
  count--;
  countElement.textContent = count;
});

resetButton.addEventListener('click', function() {
  count = 0;
  countElement.textContent = count;
});
