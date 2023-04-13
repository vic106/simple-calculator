//Selectors
const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.input');
const displayOutput = document.querySelector('.output');

//Display is initially empty
let input = '';
displayOutput.innerHTML = '0';

//Create key events
for (let key of keys){
    //Get key value
    const value = key.dataset.key;

    key.addEventListener('click',() => {
        if(value == 'clear'){
            input = '';
            displayInput.innerHTML = '';
            displayOutput.innerHTML = '0';
        }
                
        else if(value == 'backspace'){
            input = input.slice(0, -1);
            displayInput.innerHTML = cleanInput(input);
        }
        
        else if(value == '='){
            let result = eval(percentInput(input));
            displayOutput.innerHTML = cleanOutput(result);
        }
                
        else if(value == 'brackets'){
            //If we don't have an opening bracket, or 
            //if we have a closed set of brackets,
            //create an opening bracket
            if(
                input.indexOf('(') == -1 || 
                input.indexOf('(') != -1 &&
                input.indexOf(')') != -1 && 
                input.lastIndexOf('(') < input.lastIndexOf(')')
                ){
                    input += '(';
            }
            //If we already have an opening bracket,
            //create a closing bracket
            else if(
                input.indexOf('(') != -1 && 
                input.indexOf(')') == -1 ||
                input.indexOf('(') != -1 &&
                input.indexOf(')') != -1 &&
                input.lastIndexOf('(') > input.lastIndexOf(')')
                ){
                input += ')';
            }
            
            displayInput.innerHTML = cleanInput(input);
        }
            
        else{
            //If the key is a number, add it to input
            if(validateInput(value)){
                input += value;
                displayInput.innerHTML = cleanInput(input);
            }
        }
        });
}

//Functions
function cleanInput(input){
    let inputArray = input.split('');
    
    //Operators on the display will have the same color they have on the keys
    for(let i = 0; i < inputArray.length; i++){
        if(inputArray[i] == '*'){
            inputArray[i] = ' <span class = "operator">x</span> ';
        }
        else if(inputArray[i] == '/'){
            inputArray[i] = ' <span class = "operator">÷</span> ';
        }
        else if(inputArray[i] == '+'){
            inputArray[i] = ' <span class = "operator">+</span> ';
        }
        else if(inputArray[i] == '-'){
            inputArray[i] = ' <span class = "operator">-</span> ';
        }
        else if(inputArray[i] == '('){
            inputArray[i] = ' <span class = "brackets">(</span> ';
        }
        else if(inputArray[i] == ')'){
            inputArray[i] = ' <span class = "brackets">)</span> ';
        }
        else if(inputArray[i] == '%'){
            inputArray[i] = ' <span class = "percent">%</span> ';
        }
    }
    return inputArray.join('');
}

function cleanOutput(output){
    let outputString = output.toString();
    let decimal = outputString.split('.')[1];
    outputString = outputString.split('.')[0];

    let outputArray = outputString.split('');

    //Add decimal comma
    if (outputArray.length > 3){
        for(let i = outputArray.length - 3; i > 0; i -= 3){
            outputArray.splice(i, 0, ',');
        }
    }

    //Add decimal point
    if(decimal){
        outputArray.push('.');
        outputArray.push(decimal);
    }

    return outputArray.join('');
}

function validateInput(value){
    //Make sure user input is valid
    let lastInput = input.slice(-1);
    let operators = ['+', '-', '*', '/'];

    //Cannot double-click decimal point
    if (value == '.' && lastInput == '.'){
        return false;
    }

    //Cannot double-click operator
    if(operators.includes(value)){
        if(operators.includes(lastInput)){
            return false;
        }
        else {
            return true;
        }
    }

    return true;
}

function percentInput(input){
    //Calculate percent
    let inputArray = input.split('');

    for(let i = 0; i < inputArray.length; i++){
        if(inputArray[i] == '%'){
            inputArray[i] = '/100';
        }
    }

    return inputArray.join('');
}