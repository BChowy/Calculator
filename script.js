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
let result = '';
let equalFlag = '';
let operationID;

DISPLAY_INPUT.innerText = '0';

AC_KEY.addEventListener('click', () => {
    DISPLAY_INPUT.innerText = '0';
    PRE_OPERATION.innerText = '';
    firstOperand = '';
    secondOperand = '';
    operation = '';
    result = '';
    equalFlag = '';
});

C_KEY.addEventListener('click', () => {
    if (secondOperand === '') {
        firstOperand = firstOperand.slice(0, -1);
        DISPLAY_INPUT.innerText = firstOperand;
        console.log(firstOperand);
    }
    else {
        secondOperand = secondOperand.slice(0, -1);
        DISPLAY_INPUT.innerText = secondOperand;
    }
});

CALCULATE_KEY.addEventListener('click', () => {
    console.log('=');

    if (secondOperand === '') {
        secondOperand = firstOperand;
    }

    operate(Number(firstOperand), Number(secondOperand), operation);
    PRE_OPERATION.innerText = `${firstOperand} ${operation} ${secondOperand} =`;
    firstOperand = result;
    equalFlag = true;
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

        if (firstOperand === '') firstOperand = 0;
        if (equalFlag) {
            secondOperand = '';
            equalFlag = false;
        }
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

    });
});

function operate(a, b, operation) {
    switch (operation) {
        case '+': result = add(a, b); break;
        case '-': result = subtract(a, b); break;
        case 'x': result = multiply(a, b); break;
        case '/': result = divide(a, b); break;
        case '%': result = reminder(a, b); break;
    }

    PRE_OPERATION.innerText = `${result} ${operation}`;
    DISPLAY_INPUT.innerText = result;
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const reminder = (a, b) => a % b;
