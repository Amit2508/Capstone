var display = document.getElementById("screen");
var show = "";
var check = true;
var op1 = "";
var op2 = "";
var opr = "";

function calc() {
  var value = this.getAttribute("data-value");

  //for clear
  if (value === "AC") {
    check = true;
    show = "";
    op1 = "";
    op2 = "";
    opr = "";
    display.innerText = show;
  }

  // logic for simple oprator
  else if (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    value === "/" ||
    value === "%"
  ) {
    if (show === "" || opr !== "") {
      display.innerText = "Error!";
    } else {
      opr = value;
      check = true;
      op1 = show;
      show = "";
      display.innerText = show;
    }
  }

  // final evaluation
  else if (value === "=") {
    if (show === "" || (opr === "/" && show === "0")) {
      display.innerText = "Error!";
      show = "";
    } else if (opr === "-" && show[0] === "-") {
      opr = "+";
      op2 = show.slice(1);
      show = eval(op1 + opr + op2);
      if (Number.isInteger(show) === false) {
        show = show.toFixed(3);
      }
      display.innerText = show;
      opr = "";
    } else {
      check = true;
      op2 = show;
      if (opr === "%") {
        show = op1 % op2;
      } else {
        show = eval(op1 + opr + op2);
      }
      if (Number.isInteger(show) === false) {
        show = show.toFixed(3);
      }
      display.innerText = show;
      opr = "";
    }
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

  //For changing positive no.to -ve or viceversa(+/-)
  else if (value === "+/-") {
    if (show[0] === "-") {
      show = show.slice(1);
      display.innerText = show;
    } else {
      show = "-" + show;
      display.innerText = show;
    }
  }
  // for all numric 0 to 9
  else {
    show += value;
    display.innerText = show;
  }
}
var btn_bucket = document.getElementsByClassName("btn");
for (var i = 0; i < btn_bucket.length; i++) {
  btn_bucket[i].addEventListener("click", calc);
}
document.addEventListener("keydown", function (event) {
  // console.log("Key pressed: " + event.key);
  if (event.key in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) {
    show += event.key;
    display.innerText = show;
  }
  if (event.key == "Backspace") {
    if (show.length != 0) {
      show = show.slice(0, -1);
      display.innerText = show;
    }
  }

  if (event.key == "Escape") {
    check = true;
    show = "";
    op1 = "";
    op2 = "";
    opr = "";
    display.innerText = show;
  }
  if (["+", "-", "*", "/", "%"].includes(event.key)) {
    // console.log(event.key, "rr")
    if (show === "" || opr !== "") {
      display.innerText = "Error!";
    } else {
      opr = event.key;
      check = true;
      op1 = show;
      show = "";
      display.innerText = show;
    }
  }
  if (event.key == "^") {
    // console.log(event.key, "rr")
    if (show === "" || opr !== "") {
      display.innerText = "Error!";
    } else {
      opr = "**";
      check = true;
      op1 = show;
      show = "";
      display.innerText = show;
    }
  }
  if (["=", "Enter"].includes(event.key)) {
    if (show === "" || (opr === "/" && show === "0")) {
      display.innerText = "Error!";
      show = "";
    } else if (opr === "-" && show[0] === "-") {
      opr = "+";
      op2 = show.slice(1);
      show = eval(op1 + opr + op2);
      if (Number.isInteger(show) === false) {
        show = show.toFixed(3);
      }
      display.innerText = show;
      opr = "";
    } else {
      check = true;
      op2 = show;
      if (opr === "%") {
        show = op1 % op2;
      } else {
        show = eval(op1 + opr + op2);
      }
      if (Number.isInteger(show) === false) {
        show = show.toFixed(3);
      }
      display.innerText = show;
      opr = "";
    }
  }
  if (event.key == ".") {
    if (check === true) {
      check = false;
      show += event.key;
      display.innerText = show;
    } else {
      display.innerText = "Error!";
    }
  }

});
