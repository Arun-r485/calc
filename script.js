// Get the display, history, and memory elements
const display = document.getElementById('display');
const history = document.getElementById('history');
const memoryDisplay = document.getElementById('memory');

// Initialize memory
let memory = 0;

// Add event listeners to all buttons
const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.dataset.value));
});

// Add keyboard event listener
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Map keyboard keys to calculator functions
    const keyMap = {
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
        '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        '.': '.', '+': '+', '-': '-', '*': '*', '/': '/',
        'Enter': '=', 'Backspace': '←', 'Escape': 'C',
        '%': '%', 'm': 'M+', 'M': 'M-', 'r': 'MR', 'c': 'MC',
        's': '√', '@': 'x²', 'i': '1/x'
    };

    if (keyMap[key]) {
        handleButtonClick(keyMap[key]);
    }
});

// Handle button clicks
function handleButtonClick(value) {
    switch (value) {
        case 'C':
            clearDisplay();
            break;
        case 'CE':
            clearEntry();
            break;
        case '←':
            deleteLast();
            break;
        case '=':
            calculate();
            break;
        case '±':
            toggleSign();
            break;
        case '√':
            calculateSquareRoot();
            break;
        case 'x²':
            calculateSquare();
            break;
        case '1/x':
            calculateInverse();
            break;
        case '%':
            calculatePercentage();
            break;
        case 'MC':
            memoryClear();
            break;
        case 'MR':
            memoryRecall();
            break;
        case 'M+':
            memoryAdd();
            break;
        case 'M-':
            memorySubtract();
            break;
        default:
            appendToDisplay(value);
    }
}

// Append input to the display
function appendToDisplay(value) {
    display.value += value;
}

// Clear the display
function clearDisplay() {
    display.value = '';
    history.innerText = '';
}

// Clear the last entry
function clearEntry() {
    display.value = '';
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculate() {
    try {
        const expression = display.value;
        const result = eval(expression);
        history.innerText = `${expression} =`;
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Toggle the sign of the number
function toggleSign() {
    if (display.value.startsWith('-')) {
        display.value = display.value.slice(1);
    } else {
        display.value = '-' + display.value;
    }
}

// Calculate square root
function calculateSquareRoot() {
    try {
        const result = Math.sqrt(eval(display.value));
        history.innerText = `√(${display.value}) =`;
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Calculate square
function calculateSquare() {
    try {
        const result = Math.pow(eval(display.value), 2);
        history.innerText = `(${display.value})² =`;
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Calculate inverse (1/x)
function calculateInverse() {
    try {
        const result = 1 / eval(display.value);
        history.innerText = `1/(${display.value}) =`;
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Calculate percentage
function calculatePercentage() {
    try {
        const result = eval(display.value) / 100;
        history.innerText = `${display.value}% =`;
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Memory Functions
function memoryClear() {
    memory = 0;
    updateMemoryDisplay();
}

function memoryRecall() {
    display.value = memory;
}

function memoryAdd() {
    memory += eval(display.value);
    updateMemoryDisplay();
}

function memorySubtract() {
    memory -= eval(display.value);
    updateMemoryDisplay();
}

function updateMemoryDisplay() {
    memoryDisplay.innerText = `M: ${memory}`;
}