//----------------Select essential keys--------------------
const numbers = document.querySelectorAll(".number");
const operatorInputs = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal")
const display = document.querySelector("#display"); 
const decimal = document.querySelector("#decimal");
const clear = document.querySelector("#ac");
const backspace = document.querySelector("#del");
const buttons = document.querySelectorAll(".btn");
const percent = document.querySelector("#percent");

//----------------------arithmetic operations------------------
const add = function(num1, num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1+num2;
};

const subtract = function(num1, num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1-num2;
};

const multiply = function(num1,num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1*num2;
};

const divide = function(num1, num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1/num2;
};

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
};

//--------------functionalities----------------

let calculatedVal = ""; //value entered right before operator
let newVal = ""; //value currently being entered
let operator = "";

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        value = number.textContent;
        newVal +=value;
        display.textContent=newVal;
    })
});

operatorInputs.forEach((operatorIn) => {
    operatorIn.addEventListener("click", () => {
        operator = operatorIn.textContent;
        if (operator =="×"){
            operator = "*";
        } else if (operator =="÷"){
            operator = "/";
        }
        calculatedVal = newVal;
        newVal = ""; //input is cleared after operator entered, so if equal is pressed right after operator, we get NaN
    })
});



equal.addEventListener("click", () => {
    console.log(operator);
    console.log(calculatedVal);
    console.log(newVal);
    if (newVal === "" || operator ==="") return; //do nothing if operator or number is not input after operator but equal button is pressed
    let result= operate(operator, calculatedVal, newVal);
    if (result === Infinity){
        display.textContent = "did you just divide by 0";
        newVal = "";
    } else {
        if(result.toString().split("").length > 11){
            result = Number(result.toPrecision(9));
        }
        newVal = result;
        display.textContent=newVal;
        operator =  "";
        calculatedVal="";
    }

});

clear.addEventListener("click", () => {
    display.textContent = "0";
    calculatedVal = "";
    newVal = "";
    operator = "";

});

backspace.addEventListener("click", () => {
    displayContent = display.textContent;
    displayContent = displayContent.split("").slice(0,-1).join("");
    newVal = displayContent;
    display.textContent = displayContent;
});

buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "#4d4b4b";
    })
    button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "#242222";
    })
});

decimal.addEventListener("click", () => {
    if (display.textContent.includes(".")){
        return;
    }
    if (display.textContent ==="" || display.textContent ==="0"){
        newVal = "0.";
    } else{
        newVal +="."
    }
    display.textContent = newVal;

});

percent.addEventListener("click", () => {
    if (newVal  === "") return;
    let result = Number(newVal)/100;
    newVal = result.toString();
    display.textContent = newVal;
});