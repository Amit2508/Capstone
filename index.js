var display = document.getElementById("screen");
var show = "";
var check = true;
var op1 = "";
var op2 = "";
var opr = "";
var restart = false;
var value;
function calc() {
  value = this.getAttribute("data-value");
  calculate(value);
}
document.addEventListener("keydown", function (event) {
  // console.log("Key pressed: " + event.key);
  if (event.key in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) {
    value = event.key;
    calculate(value);
    // display.innerText = show;
  }
  if (event.key == "Backspace") {
    if (show.length != 0) {
      show = show.slice(0, -1);
      display.innerText = show;
    }
  }
  if (event.key == "Escape") {
    value = "AC";
    calculate(value);
  }
  if (event.key == "Enter") {
    value = "=";
    calculate(value);
  }
  if (["+", "-", "*", "/", "%", "=", "."].includes(event.key)) {
    // console.log(event.key, "rr")
    value = event.key;
    calculate(value);
  }
});

function res() {
  if (show === "") {
    // display.innerText = "";
    rVal = ""
  }
  else if (opr === "/" && show === "0") {
    rVal = "Division Error!";
    opr = "";
    // rVal = "";
  } else if (opr === "-" && show[0] === "-") {
    opr = "+";
    op2 = show.slice(1);
    rVal = eval(op1 + opr + op2);
    if (Number.isInteger(rVal) === false) {
      rVal = rVal.toFixed(3);
    }
    // display.innerText = show;
    opr = "";
    op1 = ""
    op2 = ""
  } else {
    check = true;
    op2 = show;
    if (opr === "%") {
      rVal = op1 % op2;
    } else {
      rVal = eval(op1 + opr + op2);
    }
    if (Number.isInteger(rVal) === false) {
      rVal = rVal.toFixed(3);
    }
    // display.innerText = show;
    opr = "";
    op1 = ""
    op2 = ""
  }
  return rVal
}
function calculate(value) {
  //for clear
  console.log(restart)
  if (restart == true) {
    check = true;
    show = "";
    op1 = "";
    op2 = "";
    opr = "";
    display.innerText = show;
    restart = false;
  }
  if (value === "AC") {
    check = true;
    show = "";
    op1 = "";
    op2 = "";
    opr = "";
    display.innerText = show;
  }

  // logic for simple operator
  else if (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    value === "/" ||
    value === "%"
  ) {
    console.log(show)
    if (show === "") {
      display.innerText = "Error!";
    } else if (opr !== "") {
      if (op1.isInteger) {
        show = res()
        op1 = show
        display.innerText = show;
      }

    }
    else {
      opr = value;
      check = true;
      op1 = show;
      show = "";
      display.innerText = show;
    }
  }

  // final evaluation
  else if (value === "=") {
    restart = true;
    show = res();
    display.innerText = show

    // restart = true;
  }

  // for decimal
  else if (value === ".") {
    if (check === true) {
      check = false;
      show += value;
      display.innerText = show;
    } else {
      display.innerText = "Error!";
    }
  }

  //For changing positive no.to -ve or vice versa(+/-)
  else if (value === "+/-") {
    if (show[0] === "-") {
      show = show.slice(1);
      display.innerText = show;
    } else {
      show = "-" + show;
      display.innerText = show;
    }
  }
  // for all numeric 0 to 9
  else {
    show += value;
    display.innerText = show;
  }
}
// }
var btn_bucket = document.getElementsByClassName("btn");
for (var i = 0; i < btn_bucket.length; i++) {
  btn_bucket[i].addEventListener("click", calc);
}