var solarPanel = document.getElementById('solarPanel');
var display = document.getElementById('display');
var keys = document.getElementsByClassName('key');

var value1; 
var value2;
var selectedOperator;
var lastKeyPressed = '';

// Wait for page to load, then...
document.onreadystatechange = function() {
  if (document.readyState === "interactive") {
    allClear();
    for (i = 0; i < keys.length; i++) {
      keys[i].addEventListener("click", ButtonLogic);
    }
    solarPanel.addEventListener("click", Surprise);
  }
};

function ButtonLogic() {

  console.log("value1: " + value1);

  // this is the user's input
  var keyLabel = this.innerHTML;

  /*
     user selects a number - then the numeric function is called
     "numeric" takes two parameters (keyLabel, lastKeyPressed)
     and calls the properAppend function
     keyLabel = number they pressed, lasKeyPressed = the button they pushed just before
  */
  if (this.classList.contains('numeric')) {
    numeric(keyLabel, lastKeyPressed);
  }

  // user selected "=", calls the calculate function
  else if (this.classList.contains('calculate')) {
    calculate();
  }


  // user selected the "." decimal point, calls the decimal function
  else if (this.classList.contains('decimal')) {
    decimal(keyLabel, lastKeyPressed);
  }


  // user selected one of the operator buttons "+, -, /, x", calls the operator function
  else if (this.classList.contains('operator')) {
    operator(keyLabel);
  }


  // user selected all clear "AC", calls allClear function
  else if (this.classList.contains('allclear')) {
    allClear();
  }

  // user selected the standard clear "C" button, calls clear function
  else if (this.classList.contains('clear')) {
    clear();
  }


  // user selected the sign "+/-" button, which will call the sign function
  else if (this.classList.contains('sign')) {
    processSignKey(lastKeyPressed);
  }

  // after the function is called and the compiler returns to this function - it 
  // assigns the key they just pressed (keyLabel) to the variable lastKeyPressed
  // to prepare for the next key press
  lastKeyPressed = keyLabel;
}

// this function processes the sign function
// changes value of keyLabel from pos to neg, or neg to pos respectively
function processSignKey() {

  // if last key pressed is NaN
  // ignore the sign key
  // else - send it to the sign function
  if(lastKeyPressed === NaN){
    alert('stop pressing that over and over');
  }
  else{
    sign();
  }


}

function sign() {
  var temp = Number(value1)*-1;
  console.log(temp);
  display.innerHTML = temp;
  value1 = temp;
  console.log("this is your new value1" + value1);

}

function operator(keyLabel) {
  if (value1 === '') {
    // set value1 = 0
    value1 = 0;
    // store keyLabel in selectedOperator
    selectedOperator = keyLabel;
  }
  else {
    if (selectedOperator === '') {
      // store keyLabel in selectedOperator
      selectedOperator = keyLabel;
    }
    else {
      if (value2 === '') {
        // store keyLabel in selectedOperator
        selectedOperator = keyLabel;
      }
      else {
        // calculate!
        calculate();
        // store keyLabel in selectedOperator
        selectedOperator = keyLabel;
      }
    }
  }
}

function decimal(keyLabel, lastKeyPressed) {
  if (lastKeyPressed === '=') {
    allClear();
  }
  if (selectedOperator === '') {
    if (value1.indexOf('.') == -1) {
      if (value1 === '') {
        value1 = 0 + keyLabel;
      }
      else {
        value1 = value1 + keyLabel;
      }
      display.innerHTML = value1;
    }
  }
  else {
    if (value2.indexOf('.') == -1) {
      if (value2 === '') {
        value2 = 0 + keyLabel;
      }
      else {
        value2 = value2 + keyLabel;
      }
      display.innerHTML = value2;
    }    
  }
}

function calculate() {
  var results = 0;
  switch (selectedOperator) {
    case "+":
      results = Number(value1) + Number(value2);
      break;
    case "-":
      results = Number(value1) - Number(value2);
      break;
    case "x":
      results = Number(value1) * Number(value2);
      break;
    case "/":
      results = Number(value1) / Number(value2);
      break;
    default:
      alert("hey - cool it, man");
  }
  // store results of the calculation in value1
  value1 = results;
  // update display with results of calculation (which now is value1)
  display.innerHTML = value1;
  // clear value2
  value2 = '';
  // clear selectedOperator
  selectedOperator = '';
}

function numeric(fred, barney) {
  if (barney === '=') {
    allClear();
  }
  if (selectedOperator === '') {
    value1 = properAppend(value1, fred);
    display.innerHTML = value1;
  }
  else {
    value2 = properAppend(value2, fred);
    display.innerHTML = value2;
  }
}

function properAppend(main, added) {
  if (main === "0") {
    return added;
  }
  return main + added;
}

function clear() {
  if (selectedOperator === '') {
    value1 = '';
  }
  else {
    value2 = '';
  }
  alert("Clear! (still needs to be tested)");
}

function allClear() {
  value1 = '';
  value2 = '';
  selectedOperator = '';
  display.innerHTML = '0';
}

function Surprise() {
  alert("SURPRISE!");
}