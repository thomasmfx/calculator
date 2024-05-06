const display = document.querySelector("#display-digits");
const numbers = document.querySelectorAll(".numbers");
const specialBtns = document.querySelectorAll(".special-btns");
const times = document.querySelector(".times");

function operate(n1, operation, n2) {
    let result = 0;
    n1 = parseInt(n1);
    n2 = parseInt(n2);

    switch (operation) {
        case 'plus':
            result = (n1 + n2)
            break;
        case 'minus':
            result = (n1 - n2)
            break;
        case 'times':
            result = (n1 * n2)
            break;
        case 'division':
            result = (n1 * n2) 
    }

    return isNaN(result) ? n1 : result

}

let n1 = 0;
let n2 = 0;

numbers.forEach(number => {
    number.addEventListener("click", () => {
        if(display.textContent.length < 10) {
            display.textContent += parseInt(number.textContent)
        }
    })
});

let lastPressedBtn = '';

specialBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const erase = document.querySelector(".erase");
        const dot = document.querySelector(".dot");
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
                display.textContent = -display.textContent;
                break;
            case ' ÷ ':
                
                break;
            case times:
                n1 = display.textContent;
                display.textContent = null;
                lastPressedBtn = times;
                break;
            case ' - ':
                n1 = display.textContent;
                display.textContent = null;
                lastPressedBtn = ' - ';
                break;
            case ' + ':
                n1 = display.textContent;
                display.textContent = null;
                lastPressedBtn = ' + ';
                break;
            case dot:
                display.textContent += '.';
                break;
            case erase:
                alert(display.textContent)
                display.textContent = display.textContent.slice(0, -1)
                break;
            case ' = ':
                if (lastPressedBtn == ' + ') {
                    n2 = display.textContent;
                    display.textContent = operate(n1, 'plus', n2)
                } else if(lastPressedBtn == ' - ') {
                    n2 = display.textContent;
                    display.textContent = operate(n1, 'minus', n2)
                } else if (lastPressedBtn == times) {
                    n2 = display.textContent;
                    display.textContent = operate(n1, 'multiply', n2)
                } else if (lastPressedBtn == ' ÷ ') {
                    n2 = display.textContent;
                    display.textContent = operate(n1, 'division', n2)
                }
        }
            
    });
});





