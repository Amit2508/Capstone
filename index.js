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

  // for simple oprator
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
}