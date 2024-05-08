const display = document.querySelector("#display-digits");
const padNumbers = document.querySelectorAll(".numbers");
const specialBtns = document.querySelectorAll(".special-btns");
let lastPressedBtn = '';
let n1 = 0;
let n2 = 0;

function operate(n1, n2, operation) {
    let result = 0;
    n1 = Number(n1);
    n2 = Number(display.textContent);


    switch (operation) {
        case 'addition':
            result = (n1 + n2)
            break;
        case 'subtraction':
            result = (n1 - n2)
            break;
        case 'multiplication':
            result = (n1 * n2)
            break;
        case 'division':
            result = (n1 / n2) 
    }

    if (result == 'Infinity') {
        return display.textContent = 'Bruh'
    }

    display.textContent = isNaN(result) ? n1 : display.textContent = result

    if (display.textContent.length > 10) {
        display.textContent = display.textContent.slice(0, 10)
    }
    if (display.textContent.includes('.')) {
        display.textContent = Math.round(display.textContent * 100) / 100
    }
    
    lastPressedBtn = '=';
};

// Only for '=' or 'Enter'
function equals() {
    if (lastPressedBtn == '÷') {
        operate(n1, n2, 'division')
    } else if (lastPressedBtn == '×') {
        operate(n1, n2, 'multiplication')
    } else if (lastPressedBtn == '-') {
        operate(n1, n2, 'subtraction')
    } else if (lastPressedBtn == '+') {
        operate(n1, n2, 'addition')
    }
};

function specialBtnsOperations(value) {
    // Obs: for cases that shares conditionals: case 1 = buttons, case 2 = keyboard keys
    switch (value) {
        case 'CE':
        case 'Delete':
            display.textContent = null;
            n1 = 0;
            n2 = 0;
            break;
        case 'C':
        case 'Control':
            display.textContent = null;
            n2 = 0;
            break;
        case '+/-':
        case 'Shift':
            if (display.textContent.length == 10) {
                display.style.fontSize = '56px'
            } else if (display.textContent.length != 10){
                display.style.fontSize = '60px'
            }

            if (display.textContent != '') {
                display.textContent = -display.textContent;
            }
            break;
        case '÷':
        case '/':
            if (display.textContent != '') {
                n1 = display.textContent;
            }
            display.textContent = null;
            lastPressedBtn = '÷';
            break;
        case '×':
        case '*':
            if (display.textContent != '') {
                n1 = display.textContent;
            }
            display.textContent = null;
            lastPressedBtn = '×';
            break;
        case '-':
            if (display.textContent != '') {
                n1 = display.textContent;
            }
            display.textContent = null;
            lastPressedBtn = '-';
            break;
        case '+':
            if (display.textContent != '') {
                n1 = display.textContent;
            }
            display.textContent = null;
            lastPressedBtn = '+';
            break;
        case '•':
        case '.':
            if (!display.textContent.includes('.') && (display.textContent != '')) {
                display.textContent += '.';
            }
            break; 
        case '⌫':
        case 'Backspace':
            display.textContent = display.textContent.slice(0, -1)
        }
};

// Buttons support
padNumbers.forEach(number => {
    number.addEventListener("click", () => {
        if(display.textContent.length < 10) { 
            display.textContent += Number(number.textContent)
        }
    })
});

specialBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const button = btn.value;
        
        switch (button) {
            case 'CE':
                specialBtnsOperations(button)
                break;
            case 'C':
                specialBtnsOperations(button)
                break;
            case '+/-':
                specialBtnsOperations(button)
                break;
            case '÷':
                specialBtnsOperations(button)
                break;
            case '×':
                specialBtnsOperations(button)
                break;
            case '-':
                specialBtnsOperations(button)
                break;
            case '+':
                specialBtnsOperations(button)
                break;
            case '•':
                specialBtnsOperations(button)
                break; 
            case ('⌫'):
                specialBtnsOperations(button)
                break;
            case '=':
                equals()
            }
            
    })
});

// Keyboard support
document.addEventListener("keydown", (event) => {
    const keyName = event.key;

    switch (keyName) {
        case 'Backspace':
            specialBtnsOperations(keyName)
            break;
        case '.':
            specialBtnsOperations(keyName)
            break;
        case 'Delete':
            specialBtnsOperations(keyName)
            break;
        case 'Control':
            specialBtnsOperations(keyName)
            break;
        case 'Shift':
            specialBtnsOperations(keyName)
            break;
        case '/':
            specialBtnsOperations(keyName)
            break;
        case '*':
            specialBtnsOperations(keyName)
            break;
        case '-':
            specialBtnsOperations(keyName)
            break;
        case '+':
            specialBtnsOperations(keyName)
            break;
        case 'Enter':
            equals()
        }

        if (keyName >= 0 && keyName <= 9) {
            if(display.textContent.length < 10) { 
                display.textContent += Number(keyName)
        }
    }
});