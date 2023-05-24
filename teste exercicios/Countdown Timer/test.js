const assert = chai.assert;

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

  it('should start the countdown', function() {
    secondsInput.value = '5';
    startButton.click();

    assert.equal(countdownTimer.textContent, '5', 'Countdown timer should start at the specified value');
  });

  it('should pause the countdown', function() {
    secondsInput.value = '5';
    startButton.click();
    pauseButton.click();

    assert.equal(countdownTimer.textContent, '5', 'Countdown timer should pause at the current value');
  });

  it('should reset the countdown', function() {
    secondsInput.value = '5';
    startButton.click();
    resetButton.click();

    assert.equal(secondsInput.value, '', 'Seconds input should be cleared after reset');
    assert.equal(countdownTimer.textContent, '0', 'Countdown timer should be reset to 0');
  });

  it('should count down to 0', function(done) {
    secondsInput.value = '1';
    startButton.click();

    setTimeout(function() {
      assert.equal(countdownTimer.textContent, '0', 'Countdown timer should reach 0');
      done();
    }, 1500);
  });
});
