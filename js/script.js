const display = document.querySelector("#display-digits");
const padNumbers = document.querySelectorAll(".numbers");
const specialBtns = document.querySelectorAll(".special-btns");
let lastPressedBtn = '';
let n1 = 0;
let n2 = 0;
// Checks if the user is calculating more than 
// a single pair of numbers at a time
let isMidOperation = false; 

function operate(n1, n2, operation) {
    let result = 0;
    n1 = Number(n1);
    n2 = Number(display.textContent);


    switch (operation) {
        
        case '+':
            result = (n1 + n2)
            break;
        case '-':
            result = (n1 - n2)
            break;
        case '×':
        case '*':
            result = (n1 * n2)
            break;
        case '÷':
        case '/':
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
        // Round numbers to 2 decimals
        display.textContent = Math.round(display.textContent * 100) / 100
    }
    
    lastPressedBtn = '=';
};

// Only for '=' or 'Enter'
function equals(lastPressedBtn) {
    operate(n1, n2, lastPressedBtn)
    isMidOperation == false
};

function specialBtnsOperations(value) {
    // Obs: for cases that shares conditionals: case 1 = buttons, case 2 = keyboard keys
    switch (value) {
        case 'CE':
        case 'Delete':
            display.textContent = null;
            n1 = 0;
            n2 = 0;
            isMidOperation = false;
            break;
        case 'C':
        case 'Control':
            display.textContent = null;
            n2 = 0;
            isMidOperation = false;
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
            // First `if`: subsequently calculate 
            if (lastPressedBtn != value) {
                if (display.textContent != '') {
                    n1 = display.textContent;
                }
                display.textContent = null;
                isMidOperation = false;
            } else {
                operate(n1, n2, value)
                n1 = display.textContent
                isMidOperation = true;
            }
            lastPressedBtn = value;
            break;
        case '×':
        case '*':
            if (lastPressedBtn != value) {
                if (display.textContent != '') {
                    n1 = display.textContent;
                }
                display.textContent = null;
                isMidOperation = false;
            } else {
                operate(n1, n2, value)
                n1 = display.textContent
                isMidOperation = true;
            }
            lastPressedBtn = value;
            break;
        case '-':
            if (lastPressedBtn != value) {
                if (display.textContent != '') {
                    n1 = display.textContent;
                }
                display.textContent = null;
                isMidOperation = false;
            } else {
                operate(n1, n2, value)
                n1 = display.textContent
                isMidOperation = true;
            }
            lastPressedBtn = value;
            break;
        case '+':
            if (lastPressedBtn != value) {
                if (display.textContent != '') {
                    n1 = display.textContent;
                }
                display.textContent = null;
                isMidOperation = false;
            } else {
                operate(n1, n2, value)
                n1 = display.textContent
                isMidOperation = true;
            }
            lastPressedBtn = value;
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
            break;
        case '=':
        case 'Enter':
            equals(lastPressedBtn)
            isMidOperation = false;
        }
};

function canDisplayNumber(number, inputOrigin) {
    if(inputOrigin == 'button') {
        if(display.textContent.length < 10) { 
            if(isMidOperation == true) {
                n1 = display.textContent
                display.textContent = null
                display.textContent += Number(number.textContent)
                isMidOperation = false;
            } else if(isMidOperation == false) {
                display.textContent += Number(number.textContent)
            }
        }
    } else {
        if(number.key >= 0 && number.key <= 9 ) {
            if(display.textContent.length < 10) { 
                if(isMidOperation == true) {
                    n1 = display.textContent
                    display.textContent = null
                    display.textContent += Number(number.key)
                    isMidOperation = false;
                } else if(isMidOperation == false) {
                    display.textContent +=Number(number.key)
                }
            }
        }
    }
}

// Buttons support
padNumbers.forEach(number => {
    number.addEventListener("click", () => {
        canDisplayNumber(number, 'button')
    })
});

specialBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        specialBtnsOperations(btn.value)
    })
});

// Keyboard support
document.addEventListener("keydown", (event) => {  
    specialBtnsOperations(event.key)
    canDisplayNumber(event, 'keyboard')
});

console.log("I couldn't allow the calculator to evaluate more than a single pair of numbers at a time combinating different operators :P my bad")