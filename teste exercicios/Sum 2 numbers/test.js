const assert = require('chai').assert;

describe('Sum Operation', function() {
  it('should return the correct sum of two positive numbers', function() {
    const number1 = 5;
    const number2 = 7;
    const expectedSum = 12;
    const actualSum = number1 + number2;
    assert.equal(actualSum, expectedSum);
  });

  it('should return the correct sum of a positive and a negative number', function() {
    const number1 = 5;
    const number2 = -3;
    const expectedSum = 2;
    const actualSum = number1 + number2;
    assert.equal(actualSum, expectedSum);
  });

  it('should return the correct sum of two negative numbers', function() {
    const number1 = -10;
    const number2 = -7;
    const expectedSum = -17;
    const actualSum = number1 + number2;
    assert.equal(actualSum, expectedSum);
  });

  it('should return zero if both input numbers are zero', function() {
    const number1 = 0;
    const number2 = 0;
    const expectedSum = 0;
    const actualSum = number1 + number2;
    assert.equal(actualSum, expectedSum);
  });

  it('should return the correct sum when one input is zero', function() {
    const number1 = 10;
    const number2 = 0;
    const expectedSum = 10;
    const actualSum = number1 + number2;
    assert.equal(actualSum, expectedSum);
  });

  it('should return Infinity if one input is Infinity', function() {
    const number1 = Infinity;
    const number2 = 5;
    const expectedSum = Infinity;
    const actualSum = number1 + number2;
    assert.equal(actualSum, expectedSum);
  });

  it('should return NaN if one input is NaN', function() {
    const number1 = 10;
    const number2 = NaN;
    const actualSum = number1 + number2;
    assert.isNaN(actualSum);
  });

  it('should return NaN if both inputs are NaN', function() {
    const number1 = NaN;
    const number2 = NaN;
    const actualSum = number1 + number2;
    assert.isNaN(actualSum);
  });

  it('should return the correct sum of two positive floating-point numbers', function() {
    const number1 = 5.5;
    const number2 = 7.3;
    const expectedSum = 12.8;
    const actualSum = number1 + number2;
    assert.equal(actualSum, expectedSum);
  });

  it('should have red color for the result element', function() {
    const resultText = document.getElementById('resultText');
    const color = getComputedStyle(resultText).color;

    assert.equal(color, 'rgb(255, 0, 0)');
  });
});
