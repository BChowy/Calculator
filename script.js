const NUMBER_KEYS = document.querySelectorAll('.keypad > .number');
const OPERATION_KEYS = document.querySelectorAll('.keypad > .operation')
const DISPLAY_INPUT = document.querySelector('.display-input');
const PRE_OPERATION = document.querySelector('.display-operation');

const AC_KEY = document.querySelector('#clear');
const C_KEY = document.querySelector('#backspace');
const CALCULATE_KEY = document.querySelector('#calculate');

let firstOperand = '';
let secondOperand = '';
let operation = '';
let operationID;
let previousOperation = '';

DISPLAY_INPUT.innerText = '0';

AC_KEY.addEventListener('click', () => {
    DISPLAY_INPUT.innerText = '0';
    PRE_OPERATION.innerText = '';
    firstOperand = '';
    secondOperand = '';
    previousOperation = '';
    operation = '';
    console.log('AC');
});
NUMBER_KEYS.forEach(key => {
    key.addEventListener('click', () => {

        if (operation === '') {
            firstOperand += key.innerText;
            DISPLAY_INPUT.innerText = firstOperand;
        }

        else {
            secondOperand += key.innerText;
            DISPLAY_INPUT.innerText = secondOperand;
        }

    });
});


OPERATION_KEYS.forEach(key => {
    key.addEventListener('click', () => {
        operationID = key.getAttribute('id');

        if (secondOperand !== '') {
            operate(Number(firstOperand), Number(secondOperand), operation);
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

    });
});

function operate(a, b, operation) {
    switch (operation) {
        case '+': firstOperand = add(a, b); break;
        case '-': firstOperand = subtract(a, b); break;
        case 'x': firstOperand = multiply(a, b); break;
        case '/': firstOperand = divide(a, b); break;
        case '%': firstOperand = reminder(a, b); break;
    }

    PRE_OPERATION.innerText = `${firstOperand} ${operation}`;
    DISPLAY_INPUT.innerText = firstOperand;
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const reminder = (a, b) => a % b;
