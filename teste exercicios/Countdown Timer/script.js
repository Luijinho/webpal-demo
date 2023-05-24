const secondsInput = document.getElementById('secondsInput');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const countdownTimer = document.getElementById('countdownTimer');

let countdownInterval;
let secondsRemaining = 0;

function startCountdown() {
  const seconds = parseInt(secondsInput.value);
  if (!isNaN(seconds) && seconds > 0 && !countdownInterval) {
    secondsRemaining = seconds;
    countdownTimer.textContent = secondsRemaining;
    countdownInterval = setInterval(() => {
      secondsRemaining--;
      countdownTimer.textContent = secondsRemaining;
      if (secondsRemaining === 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }, 1000);
  }
}

function pauseCountdown() {
  clearInterval(countdownInterval);
  countdownInterval = null;
}

function resetCountdown() {
  clearInterval(countdownInterval);
  countdownInterval = null;
  secondsRemaining = 0;
  countdownTimer.textContent = secondsRemaining;
  secondsInput.value = '';
}

startButton.addEventListener('click', startCountdown);
pauseButton.addEventListener('click', pauseCountdown);
resetButton.addEventListener('click', resetCountdown);
