function operate(n1, operand, n2) {
    let result;
    switch (operand) {
        case 'plus':
            result = (n1 + n2)
            break;
        case 'minus':
            result = (n1 - n2)
            break;
        case 'times':
            result = (n1 * n2)
            break;
        case 'divided':
            result = (n1 *n2) 
    }

    return result
}

console.log(operate(20, 'times', 5))