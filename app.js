//* Globally enabling the input named as screen of the calculator
const screen = document.getElementById(`input`);

//! operations of our calculator
//* [ + , - , * , / , % , sign-changer]

//! getting value from button to screen
const input = (obj) => {
  screen.value += obj.value;
};

//! screen clear function
const clearScreen = () => {
  screen.value = ``;
};

//TODO:   getting operands of the operate function

const operator = (obj) => {
  //! extracting operator
  const operator = obj.value;
  //!  locking first number
  let num1 = Number(screen.value);
  //* handling if input is not a number
  if (isNaN(num1)) {
    screen.value = `No valid number`;
    //! clearing the screen after two seconds of the display message
    setTimeout(clearScreen, 2000);
  }
  //* if the input is a Number
  else {
    //* if the operator is the negation operator
    if (operator === "-/+") {
      if (num1 > 0) {
        num1 = Number("-" + num1);
        screen.value = num1;
      } else {
        num1 = (Number(num1) ** 2) ** (1 / 2);
        screen.value = num1;
      }
    } else {
      clearScreen();
      //* percentage operation
      if (operator === "%") {
        num1 = num1 / 100;
        const equal = document.getElementById(`calculate`);
        equal.addEventListener("click", () => {
          screen.value = num1;
        });
      }

      //! getting all the numbers
      const numbers = document.querySelectorAll("[onclick='input(this)']");
      for (num of numbers) {
        //! getting num2 from the screen after the click on button
        num.addEventListener(
          "click",
          (event) => {
            const num2 = Number(screen.value);
            //! activating  ""=" to  calculate the result
            const equal = document.getElementById(`calculate`);
            //! generating click function
            equal.addEventListener(
              "click",
              (event) => {
                //! finally calculate
                const result = operate(num1, num2, operator);
                //! getting result on screen
                screen.value = result;
              },
              { once: true }
            );
          },
          { once: true }
        );
      }
    }
  }
};

//! result generation  function
const operate = (num1, num2, operator) => {
  switch (operator) {
    case `+`:
      return num1 + num2;
      break;
    case `-`:
      return num1 - num2;
      break;
    case `*`:
      return num1 * num2;
      break;
    case `/`:
      //* handling the undefined division case
      if (num2 === 0) return "Can not divide by zero";
      else return num1 / num2;
      break;
    default:
      return "Error";
      break;
  }
};

//* applying tailwind class to every button in the calculator
const buttons = document.getElementsByTagName("button");
for (button of buttons) {
  button.classList.add("border", "rounded-full", "hover:bg-black-900");
}
