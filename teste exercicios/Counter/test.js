const assert = chai.assert;

describe('Counter', function() {
  const countElement = document.getElementById('count');
  const incrementButton = document.getElementById('increment');
  const decrementButton = document.getElementById('decrement');
  const resetButton = document.getElementById('reset');

  it('should increment the count when the increment button is clicked', function() {
    incrementButton.click();
    assert.equal(countElement.textContent, '1');
  });
  
  it('should reset the count to zero when the reset button is clicked', function() {
    incrementButton.click();
    resetButton.click();
    assert.equal(countElement.textContent, '0');
  });

  it('should have the correct count after a sequence of operations', function() {
    incrementButton.click();
    decrementButton.click();
    incrementButton.click();
    incrementButton.click();
    decrementButton.click();
    incrementButton.click();
    assert.equal(countElement.textContent, '2');
  });
});
