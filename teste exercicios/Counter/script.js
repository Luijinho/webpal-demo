// Get the elements
const countElement = document.getElementById('count');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const resetButton = document.getElementById('reset');

// Counter variable
let count = 0;

// Display the initial count
countElement.textContent = count;

// Event listener for increment button
incrementButton.addEventListener('click', function() {
  count++;
  countElement.textContent = count;
});

// Event listener for decrement button
decrementButton.addEventListener('click', function() {
  count--;
  countElement.textContent = count;
});

// Event listener for reset button
resetButton.addEventListener('click', function() {
  count = 0;
  countElement.textContent = count;
});
