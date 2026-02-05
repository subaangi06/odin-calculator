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
const history = document.querySelector("#current-history");

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

let calculatedVal = "0"; //value entered right before operator
let newVal = ""; //value currently being entered
let operator = "";

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (display.textContent==calculatedVal && newVal ==""){
            display.textContent = "";
        }

        let value = number.textContent;
        newVal +=value;
        display.textContent = newVal;
    })
});

operatorInputs.forEach((operatorIn) => {
    operatorIn.addEventListener("click", () => {
        if (calculatedVal !== "" && newVal !== "" && operator !== ""){
            let result = operate(operator, calculatedVal, newVal);
            display.textContent = result;
            calculatedVal = result;
        } else if (newVal !== ""){
            calculatedVal = newVal;
        }

        operator = operatorIn.textContent;
        if (operator =="×") operator = "*";
        if (operator =="÷") operator = "/";
        if (newVal !== ""){
            history.textContent += newVal + operatorIn.textContent;
        }
        newVal = ""

    });
});



equal.addEventListener("click", () => {
    console.log(operator);
    console.log(calculatedVal);
    console.log(newVal);
    if (newVal === "" || operator ==="") return; //do nothing if operator or number is not input after operator but equal button is pressed
    let result= operate(operator, calculatedVal, newVal);
    if (result === Infinity){
        display.textContent = "no doing that";
        newVal = "";
    } else {
        if(result.toString().split("").length > 11){
            result = Number(result.toPrecision(9));
        }
        newVal = result;
        display.textContent=newVal;
        operator =  "";
        calculatedVal="";
        history.textContent = history.textContent + "=" + result;
        setTimeout (() => {
            history.textContent = ""
        },500);
    }

});

clear.addEventListener("click", () => {
    display.textContent = "0";
    calculatedVal = "";
    newVal = "";
    operator = "";
    history.textContent = "";

});

backspace.addEventListener("click", () => {
    displayContent = display.textContent;
    displayContent = displayContent.split("").slice(0,-1).join("");
    if (displayContent === ""){
        display.textContent = "0";
        newVal = "";
        return;
    }
    
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

window.addEventListener("keydown", (e)=> {
    let key = e.key;

    if (key === "Enter" || key === "="){
        equal.click();
    } else if  (key==="Escape"){
        clear.click();
    } else if  (key==="Backspace"){
        backspace.click();
    } else if (key === "*"){
        const multBtn =  Array.from(operatorInputs).find(btn => btn.textContent ==="×" );
        if (multBtn) multBtn.click();
    } else if (key === "/") {
        const divBtn = Array.from(operatorInputs).find(btn => btn.textContent === "÷");
        if (divBtn){
            e.preventDefault(); //prevent browser from opening search box, which is normally done by / key
            divBtn.click();
        } 
    } else {
            const button = Array.from(buttons).find(btn => btn.textContent ===key);
            if (button) button.click();
        }
});