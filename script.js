const numbers = document.querySelectorAll(".number");
const operatorInputs = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal")
const display = document.querySelector("#display"); 
const decimal = document.querySelector("#decimal");
const clear = document.querySelector("#ac");
const backspace = document.querySelector("#del");

const add = function(num1, num2){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    return num1+num2;
}

const subtract = function(num1, num2){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    return num1-num2;
}

const multiply = function(num1,num2){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    return num1*num2;
}

const divide = function(num1, num2){
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    return num1/num2;
}

const operate = function(operator, num1, num2){
    switch (operator){
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1,num2);
        case "/":
            return divide(num1,num2);
    }
}

//initialising variables needed for each operation
let calculatedVal = "";
let newVal = "";
let operator = "";

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        value = number.textContent;
        newVal +=value;
        display.textContent=value;
    })
});

operatorInputs.forEach((operatorIn) => {
    operatorIn.addEventListener("click", () => {
        operator = operatorIn.textContent;
        if (operator =="×"){
            operator = "*";
        }
        calculatedVal = newVal;
        newVal = "";
    })
});



equal.addEventListener("click", () => {
    display.textContent += "=";
    console.log(operator);
    console.log(calculatedVal);
    console.log(newVal);
    let result= operate(operator, calculatedVal, newVal);
    newVal = result;
    display.textContent=newVal;
})