const celsiusInput = document.getElementById('celsius');
const fahrenheitInput = document.getElementById('fahrenheit');

function celsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

celsiusInput.addEventListener('input', function() {
  const celsius = parseFloat(celsiusInput.value);
  if (!isNaN(celsius)) {
    const fahrenheit = celsiusToFahrenheit(celsius);
    fahrenheitInput.value = fahrenheit.toFixed(2);
  } else {
    fahrenheitInput.value = '';
  }
});

fahrenheitInput.addEventListener('input', function() {
  const fahrenheit = parseFloat(fahrenheitInput.value);
  if (!isNaN(fahrenheit)) {
    const celsius = fahrenheitToCelsius(fahrenheit);
    celsiusInput.value = celsius.toFixed(2);
  } else {
    celsiusInput.value = '';
  }
});
