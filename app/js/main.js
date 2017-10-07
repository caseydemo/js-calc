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
  var keyLabel = this.innerHTML;
  if (this.classList.contains('numeric')) {
    numeric(keyLabel, lastKeyPressed);
  }
  else if (this.classList.contains('calculate')) {
    calculate();
  }
  else if (this.classList.contains('decimal')) {
    decimal(keyLabel, lastKeyPressed);
  }
  else if (this.classList.contains('operator')) {
    operator(keyLabel);
  }
  else if (this.classList.contains('allclear')) {
    allClear();
  }
  else if (this.classList.contains('clear')) {
    clear();
  }
  else if (this.classList.contains('sign')) {
    sign(keyLabel);
  }
  lastKeyPressed = keyLabel;
}

function processSignKey() {
  
  // conditions
  // logic

  var temp = sign(123);

}

function sign(num) {
  var temp = Number(num)*-1;
  console.log(temp);
  display.innerHTML = temp;
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
      alert("What are you doing?!?!?");
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