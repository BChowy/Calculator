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

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const reminder = (a, b) => a % b;
