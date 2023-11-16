const NUMBER_KEYS = document.querySelectorAll('.keypad > .number');
const OPERATION_KEYS = document.querySelectorAll('.keypad > .operation');
const DISPLAY_INPUT = document.querySelector('.display-input');
const PRE_OPERATION = document.querySelector('.display-operation');

const AC_KEY = document.querySelector('#clear');
const C_KEY = document.querySelector('#backspace');
const CALCULATE_KEY = document.querySelector('#calculate');
const FRACTION_KEY = document.querySelector('#fraction');

let firstOperand = '';
let secondOperand = '';
let operation = '';
let result = '';
let equalFlag = false;
let operationID;

DISPLAY_INPUT.innerText = '0';

// EventListeners
AC_KEY.addEventListener('click', resetCalculator);

C_KEY.addEventListener('click', handleBackspace);

CALCULATE_KEY.addEventListener('click', handleCalculate);

FRACTION_KEY.addEventListener('click', handleFraction);

NUMBER_KEYS.forEach(key => {
    key.addEventListener('click', handleNumberKey);
});

OPERATION_KEYS.forEach(key => {
    key.addEventListener('click', handleOperationKey);
});

document.addEventListener('keydown', handleKeyDown);

// Functions
function resetCalculator() {
    DISPLAY_INPUT.innerText = '0';
    PRE_OPERATION.innerText = '';
    firstOperand = '';
    secondOperand = '';
    operation = '';
    result = '';
    equalFlag = false;
}

function handleBackspace() {
    // Check if the number entered is the first or second operand
    if (secondOperand === '') {
        // Delete the last number
        firstOperand = firstOperand.slice(0, -1);
        DISPLAY_INPUT.innerText = firstOperand;
    } else {
        secondOperand = secondOperand.slice(0, -1);
        DISPLAY_INPUT.innerText = secondOperand;
    }
}

function handleCalculate() {
    // No operation to perform
    if (operation === '') return;
    // Operating with one operand
    if (secondOperand === '') {
        secondOperand = firstOperand;
    }

    operate(Number(firstOperand), Number(secondOperand), operation);
    PRE_OPERATION.innerText = `${firstOperand} ${operation} ${secondOperand} =`;
    firstOperand = result;
    equalFlag = true;
}

// Check for period before appending one
function handleFraction() {
    if (secondOperand === '') {
        if (firstOperand.includes('.')) return;
        firstOperand = firstOperand.concat('.');
    } else {
        if (secondOperand.includes('.')) return;
        secondOperand = secondOperand.concat('.');
    }
}

function handleNumberKey(keyValue, fromKeyDown) {
    const key = fromKeyDown ? keyValue : this.innerText;

    if (operation === '') {
        firstOperand += key;
        updateDisplay();
    } else {
        if (equalFlag) {
            secondOperand = '';
            equalFlag = false;
        }
        secondOperand += key;
        updateDisplay();
    }
}

function handleOperationKey() {
    operationID = this.getAttribute('id');

    if (firstOperand === '') firstOperand = '0';
    if (equalFlag) {
        secondOperand = '';
        equalFlag = false;
    }
    // if two operations and two operands, execute first operation
    if (secondOperand !== '') {
        operate(Number(firstOperand), Number(secondOperand), operation);
        firstOperand = result;
        secondOperand = '';
    }

    switch (operationID) {
        case 'add':
            operation = '+';
            break;
        case 'subtract':
            operation = '-';
            break;
        case 'multiply':
            operation = 'x';
            break;
        case 'divide':
            operation = '÷';
            break;
        case 'reminder':
            operation = '%';
            break;
    }

    PRE_OPERATION.innerText = `${firstOperand} ${operation}`;
}

function operate(a, b, operation) {
    switch (operation) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case 'x':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            break;
        case '%':
            result = reminder(a, b);
            break;
    }
    if (String(result).includes('.')) result = result.toFixed(2);
    PRE_OPERATION.innerText = `${result} ${operation}`;
    DISPLAY_INPUT.innerText = result;
}

function handleKeyDown(event) {
    const key = event.key;

    if (key === 'Enter' || key === '=') {
        handleCalculate();
    } else if (key === 'Backspace') {
        handleBackspace();
    } else if (key === '.') {
        handleFraction();
    } else if (key === '+' || key === '-' || key === '*' || key === 'x' || key === '/') {
        handleOperationKeyBySymbol(key);
    } else if (/\d/.test(key)) {
        handleNumberKey(key, true);
    } else {
        return;
    }
}


function updateDisplay() {
    if (operation === '') {
        DISPLAY_INPUT.innerText = firstOperand;
    } else {
        DISPLAY_INPUT.innerText = secondOperand;
    }
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const reminder = (a, b) => a % b;