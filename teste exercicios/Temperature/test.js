const assert = chai.assert;

describe('Temperature Conversion', function() {
  const celsiusInput = document.getElementById('celsius');
  const fahrenheitInput = document.getElementById('fahrenheit');

  it('should convert Celsius to Fahrenheit correctly', function() {
    celsiusInput.value = '25';
    celsiusInput.dispatchEvent(new Event('input'));

    assert.equal(fahrenheitInput.value, '77.00');
  });

  it('should convert Fahrenheit to Celsius correctly', function() {
    fahrenheitInput.value = '98.6';
    fahrenheitInput.dispatchEvent(new Event('input'));

    assert.equal(celsiusInput.value, '37.00');
  });

  it('should clear Fahrenheit input when Celsius input is not a number', function() {
    celsiusInput.value = 'ABC';
    celsiusInput.dispatchEvent(new Event('input'));

    assert.equal(fahrenheitInput.value, '');
  });

  it('should clear Celsius input when Fahrenheit input is not a number', function() {
    fahrenheitInput.value = 'XYZ';
    fahrenheitInput.dispatchEvent(new Event('input'));

    assert.equal(celsiusInput.value, '');
  });
});
