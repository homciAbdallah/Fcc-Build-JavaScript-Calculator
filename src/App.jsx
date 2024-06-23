import "./App.css";
import { useState } from "react";
function App() {
  const [answer, setAnswer] = useState('');
  const [expression, setExpression] = useState("");
  const exp = expression.trim();
  const isOperator = (value) => {
    return /[-+/*]/g.test(value);
  };
  const handleClick = (value) => {
    if (value === "AC") {
      setAnswer('');
      setExpression('0');
    } else if (isOperator(value)) {
      setExpression(exp + " " + value + " ");
    } else if (value === "=") {
      calculate();
    } else if (value === ".") {
      const lastSplice = expression.split(/[-+/*]/g).pop();
      if (!lastSplice) return;
      if (lastSplice.includes(".")) return;
      setExpression(expression + value);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + value);
      }else{
        setExpression(expression + value);
      }
    }
  };

  const calculate = () => {
    if (isOperator(exp.charAt(exp.length - 1))) return;
    const parts = exp.split(" ");
    const newParts = [];
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["+", "/", "*"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join("");

    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression));
    } else {
      setAnswer(eval(newExpression));
    }
    setExpression("");
  };

  return (
    <>
      <main>
        <div className="calculator ">
       <div id='display'>
            <div id="outputScreen">{answer}</div>
            <div id="expression">{expression}</div>
       </div>
          
          <div>
            <button
              className="jumbo"
              id="clear"
              value="AC"
              onClick={() => handleClick("AC")}
            >
              AC
            </button>
            <button id="divide" onClick={() => handleClick("/")} value="/">
              /
            </button>
            <button id="multiply" value="x" onClick={() => handleClick("*")}>
              x
            </button>
            <button onClick={() => handleClick(7)} id="seven" value="7">
              7
            </button>
            <button id="eight" value="8" onClick={() => handleClick("8")}>
              8
            </button>
            <button id="nine" value="9" onClick={() => handleClick("9")}>
              9
            </button>
            <button id="subtract" value="-" onClick={() => handleClick("-")}>
              -
            </button>
            <button id="four" value="4" onClick={() => handleClick("4")}>
              4
            </button>
            <button id="five" value="5" onClick={() => handleClick("5")}>
              5
            </button>
            <button id="six" value="6" onClick={() => handleClick("6")}>
              6
            </button>
            <button id="add" value="+" onClick={() => handleClick("+")}>
              +
            </button>
            <button id="one" value="1" onClick={() => handleClick("1")}>
              1
            </button>
            <button id="two" value="2" onClick={() => handleClick("2")}>
              2
            </button>
            <button id="three" value="3" onClick={() => handleClick("3")}>
              3
            </button>
            <button id="equals" value="=" onClick={() => handleClick("=")}>
              =
            </button>
            <button
              className="jumbo"
              id="zero"
              value="0"
              onClick={() => handleClick("0")}
            >
              0
            </button>
            <button id="decimal" value="." onClick={() => handleClick(".")}>
              .
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;