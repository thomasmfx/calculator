const display = document.querySelector("#display-digits");
const padNumbers = document.querySelectorAll(".numbers");
const specialBtns = document.querySelectorAll(".special-btns");

function operate(n1, n2, operation) {
    let result = 0;
    n1 = Number(n1);
    n2 = Number(n2);

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

    return isNaN(result) ? n1 : result;
}

let n1 = 0;
let n2 = 0;

padNumbers.forEach(number => {
    number.addEventListener("click", () => {
        if(display.textContent.length < 10) {
            display.textContent += Number(number.textContent)
        }
    })
});

let lastPressedBtn = '';

// The purple buttons
specialBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const button = btn.textContent;
        
        switch (button) {
            case ' CE ':
                display.textContent = null;
                n1 = 0;
                n2 = 0;
                break;
            case ' C ':
                display.textContent = null;
                n2 = 0;
                break;
            case ' +/- ':
                if (display.textContent.length === 10) {
                    display.style.fontSize = '56px'
                } else {
                    display.style.fontSize = '60px'
                }
                display.textContent = -display.textContent;
                break;
            case ' ÷ ':
                if (display.textContent != '') {
                    n1 = display.textContent;
                }
                display.textContent = null;
                lastPressedBtn = ' ÷ ';
                break;
            case ' × ':
                if (display.textContent != '') {
                    n1 = display.textContent;
                }
                display.textContent = null;
                lastPressedBtn = ' × ';
                break;
            case ' - ':
                if (display.textContent != '') {
                    n1 = display.textContent;
                }
                display.textContent = null;
                lastPressedBtn = ' - ';
                break;
            case ' + ':
                if (display.textContent != '') {
                    n1 = display.textContent;
                }
                display.textContent = null;
                lastPressedBtn = ' + ';
                break;
            case ' = ':

                if (lastPressedBtn == ' ÷ ') {
                    n2 = display.textContent;
                    display.textContent = operate(n1, n2, 'division')
                } else if (lastPressedBtn == ' × ') {
                    n2 = display.textContent;
                    display.textContent = operate(n1, n2, 'multiplication')
                } else if (lastPressedBtn == ' - ') {
                    n2 = display.textContent;
                    display.textContent = operate(n1, n2, 'subtraction')
                } else if (lastPressedBtn == ' + ') {
                    n2 = display.textContent;
                    display.textContent = operate(n1, n2, 'addition')
                }

                lastPressedBtn = ' = '
            }
            
    })
});

const dotAndErase = document.querySelectorAll(".dot-erase");
dotAndErase.forEach((btn) => {
    btn.addEventListener("click", () => {
        button = btn.textContent;
        switch (button) {
            case ' • ':
                if (!display.textContent.includes('.') && display.textContent != '') {
                    display.textContent += '.';
                }
                lastPressedBtn = ' • ';  
            case ' ⌫ ':
                display.textContent = display.textContent.slice(0, -1)
                break;
        }
    })
});





