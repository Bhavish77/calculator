// Calculator class
class Calculator {
  // Constructor
  constructor(previousOperandTextElement, currentOperandTextElement) {
    // Initialize previous and current operand elements
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    // Clear the calculator
    this.clear();
  }

  // Clear function to reset the calculator
  clear() {
    this.currentOperand = ''; // Current operand
    this.previousOperand = ''; // Previous operand
    this.operation = undefined; // Operation to perform
  }

  // Delete function to remove the last character of the current operand
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Append a number or decimal point to the current operand
  appendNumber(number) {
    // Check if number is a decimal point and if the current operand already contains a decimal point
    if (number === '.' && this.currentOperand.includes('.')) return;
    // Append the number or decimal point to the current operand
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // Choose an operation
  chooseOperation(operation) {
    // If there is no current operand, return
    if (this.currentOperand === '') return;
    // If there is a previous operand, compute the result
    if (this.previousOperand !== '') {
      this.compute();
    }
    // Set the chosen operation, store the current operand as the previous operand, and clear the current operand
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  // Perform the computation based on the stored operation
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    // Check if both previous and current operands are valid numbers
    if (isNaN(prev) || isNaN(current)) return;
    // Perform the appropriate arithmetic operation based on the stored operation
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    // Store the computed result in the current operand and clear the previous operand and operation
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  // Format the number for display
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    // Check if integerDigits is NaN
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      // Add comma separators for thousands using toLocaleString()
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    // Return the formatted number with decimal part if present
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // Update the displayed values on the calculator interface
  updateDisplay() {
    // Update the current operand text element with the formatted current operand
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    // If there is a stored operation, update the previous operand text element with the formatted previous operand and the operation symbol
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      // If there is no stored operation, clear the previous operand text element
      this.previousOperandTextElement.innerText = '';
    }
  }
}

// Get elements from the DOM
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Create a new instance of the Calculator class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add event listeners for number buttons
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// Add event listeners for operation buttons
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// Add event listener for equals button
equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

// Add event listener for all-clear button
allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

// Add event listener for delete button
deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
