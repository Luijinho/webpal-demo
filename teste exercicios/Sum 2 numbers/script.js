var number1Input = document.getElementById("number1");
var number2Input = document.getElementById("number2");
var resultText = document.getElementById("resultText");

// Get the sum button and attach a click event listener
var sumButton = document.getElementById("sum");
sumButton.addEventListener("click", function() {
    // Get the values of the input fields
    var number1 = parseFloat(number1Input.value);
    var number2 = parseFloat(number2Input.value);

    // Perform the sum operation
    var sum = number1 + number2;

    // Update the result element with the sum
    resultText.textContent = sum;
});

// Get the reset button and attach a click event listener
var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function() {
    // Clear the input fields
    number1Input.value = "";
    number2Input.value = "";

    // Reset the result element to 0
    resultText.textContent = "0";
});