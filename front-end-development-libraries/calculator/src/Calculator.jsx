import { useState, useRef } from 'react';
import './Calculator.css';
import Display from './Display';
import Operator from './Operator';
import Model from './CalculatorModel';
import LoginGroup from './LogicGroup';

function Calculator() {
  const calculator = useRef(new Model.ImmediateExcutionModel());

  const [input, setInput] = useState('0');
  const [formula, setFormula] = useState('');

  function handleOperatorTrigger(key, text) {
    const inputText = calculator.current.input(key, text);
    setInput(inputText);

    const outputText = calculator.current.formula();
    setFormula(outputText);
  }

  function handleCalcLogicChange(key) {
    setInput('0');
    setFormula('');
    
    switch (key) {
      case '0':
        calculator.current = new Model.ImmediateExcutionModel();
        break;
      case '1':
        calculator.current = new Model.FormulaLogicModel();
        break;
      default:
        break;
    }
  }

  return (
    <>
      <LoginGroup onChange={handleCalcLogicChange} />
      <div id='calclator'>
        <Display id={'display'} input={input} output={formula} />

        {Model.Operators.map((item) => (
          <Operator
            id={item.id}
            key={item.key}
            value={item.key}
            content={item.text}
            customClass={'operator' + ' ' + item.type}
            onTrigger={handleOperatorTrigger}
          />
        ))}
      </div>
    </>
  );
}

function App() {
  return <Calculator />;
}

export default App;
