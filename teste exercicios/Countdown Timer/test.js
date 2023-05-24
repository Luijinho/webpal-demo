const assert = require('chai').assert;

describe('Countdown', function() {
  const secondsInput = document.getElementById('secondsInput');
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');
  const resetButton = document.getElementById('resetButton');
  const countdownTimer = document.getElementById('countdownTimer');

  it('should have the correct initial values', function() {
    assert.equal(secondsInput.value, '', 'Seconds input should be empty initially');
    assert.equal(countdownTimer.textContent, '0', 'Countdown timer should be initialized with 0');
  });

  it('should start the countdown when clicking the start button', function(done) {
    secondsInput.value = '5';
    startButton.click();
    setTimeout(function() {
      assert.isAbove(parseInt(countdownTimer.textContent), 0, 'Countdown should be running');
      done();
    }, 1000);
  });

  it('should pause the countdown when clicking the pause button', function(done) {
    pauseButton.click();
    const countdownValue = parseInt(countdownTimer.textContent);
    setTimeout(function() {
      assert.equal(parseInt(countdownTimer.textContent), countdownValue, 'Countdown should be paused');
      done();
    }, 1000);
  });

  it('should reset the countdown when clicking the reset button', function(done) {
    resetButton.click();
    setTimeout(function() {
      assert.equal(secondsInput.value, '', 'Seconds input should be cleared');
      assert.equal(countdownTimer.textContent, '0', 'Countdown timer should be reset to 0');
      done();
    }, 1000);
  });
});
