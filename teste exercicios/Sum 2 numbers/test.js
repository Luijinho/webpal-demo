const assert = chai.assert;

describe('Summing Numbers', function() {
  const number1Input = document.getElementById('number1');
  const number2Input = document.getElementById('number2');
  const resultText = document.getElementById('resultText');
  const sumButton = document.getElementById('sum');
  const resetButton = document.getElementById('reset');

  it('should calculate the correct sum when the sum button is clicked', function() {
    number1Input.value = '5';
    number2Input.value = '3';
    sumButton.click();
    assert.equal(resultText.textContent, '8');
  });

  it('should reset the input fields and result to 0 when the reset button is clicked', function() {
    number1Input.value = '5';
    number2Input.value = '3';
    sumButton.click();
    resetButton.click();
    assert.equal(number1Input.value, '');
    assert.equal(number2Input.value, '');
    assert.equal(resultText.textContent, '0');
  });

  it('should have red color for the result text', function() {
    assert.equal(getComputedStyle(resultText).color, 'rgb(255, 0, 0)');
  });
});
