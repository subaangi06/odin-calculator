let add = function(num1, num2){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    return num1+num2;
}

let subtract = function(num1, num2){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    return num1-num2;
}

let multiply = function(num1,num2){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    return num1*num2;
}

let divide = function(num1, num2){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    return num1/num2;
}

//initialising variables needed for each operation
let num1 = 0;
let num2 = 0;
let operator = "";

let operate = function(operator, num1, num2){
    switch (operator){
        case "+":
            add(num1, num2);
        case "-":
            subtract(num1, num2);
        case "*":
            multiply(num1,num2);
        case "/":
            divide(num1,num2);
    }
}