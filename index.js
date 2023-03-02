var display = document.getElementById("screen");
var show = "";
function calc() {
  value = this.getAttribute("data-value");
  calculate(value);
}
document.addEventListener("keydown", function (event) {
  if (
    [
      "+",
      "-",
      "*",
      "/",
      "=",
      ".",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ].includes(event.key)
  ) {
    value = event.key;
    calculate(value);
  }
  if (event.key == "Escape") {
    value = "AC";
    calculate(value);
  }
  if (event.key == "Backspace") {
    value = "⬅";
    calculate(value);
  }
});

function calculate(value) {
  if (value == "AC") {
    show = "";
    display.innerText = show;
  } else if (value == "=") {
    if (show != "") {
    if (["+", "-", "/", "*", "."].includes(show.charAt(show.length - 1))) {
      show = show.slice(0, -1);
    }
    ans = eval(show);
    display.innerText = ans;
    show = "";}
  } else {
    if (["+", "-", "/", "*"].includes(value)) {
      if (show == "") {
        display.innerText = "Error";
      } else if (
        ["+", "-", "/", "*", "."].includes(show.charAt(show.length - 1))
      ) {
        show = show.slice(0, -1);
        show += value;
        display.innerText = show;
      } else {
        show += value;
        display.innerText = show;
      }
    } else if (value == "⬅") {
      if (show != "") {
        show = show.slice(0, -1);
        display.innerText = show;
      }
    } else if (value == "+/-") {
      if (show == "") {
        show += "-";
        console.log(show);
        display.innerText = show;
      } else if (show.charAt(show.length - 1) == "-") {
        show = show.slice(0, -1);
        display.innerText = show;
      } else if (show.charAt(show.length - 1) == "+") {
        show = show.slice(0, -1);
        show += "-";
        display.innerText = show;
      } else if (["/", "*"].includes(show.charAt(show.length - 1))) {
        show += "-";
        display.innerText = show;
      } else {
        lcA = show.lastIndexOf("+");
        lcS = show.lastIndexOf("-");
        lcM = show.lastIndexOf("*");
        lcD = show.lastIndexOf("/");
        mlc = Math.max.apply(null, [lcA, lcS, lcM, lcD]);
        console.log(mlc);
        if (mlc == -1) {
          show = "-" + show;
        } else if (mlc == 0) {
          show = show.slice(1);
        } else if (show.charAt(mlc) == "+") {
          show = show.substring(0, mlc) + "-" + show.substring(mlc + 1);
        } else if (show.charAt(mlc) == "-") {
          if (["*", "/"].includes(show.charAt(mlc - 1))) {
            show = show.substring(0, mlc) + show.substring(mlc + 1);
          } else {
            show = show.substring(0, mlc) + "+" + show.substring(mlc + 1);
          }
        } else {
          show = show.substring(0, mlc + 1) + "-" + show.substring(mlc + 1);
        }
        display.innerText = show;
      }
    } else if (value == ".") {
      if (show == "") {
        show = "0" + value;
      } else if (["+", "-", "/", "*"].includes(show.charAt(show.length - 1))) {
        show += "0" + value;
      } else {
        lcA = show.lastIndexOf("+");
        lcS = show.lastIndexOf("-");
        lcM = show.lastIndexOf("*");
        lcD = show.lastIndexOf("/");
        mlc = Math.max.apply(null, [lcA, lcS, lcM, lcD]);
        lcP = show.lastIndexOf(".");
        if (lcP <= mlc) {
          show += ".";
        }
      }
      display.innerText = show;
    } else {
      show += value;
      display.innerText = show;
    }
  }
}
var btn_bucket = document.getElementsByClassName("btn");
for (var i = 0; i < btn_bucket.length; i++) {
  btn_bucket[i].addEventListener("click", calc);
}