import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Display = ({counter}) => <div>{counter}</div>

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const App = () => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter+1)

  const decreaseByOne = () => {
    if (counter > 0) setCounter(counter-1)
  }

  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button text="Plus" handleClick={increaseByOne} />
      <Button text="Minus" handleClick={decreaseByOne} />
      <Button text="Reset" handleClick={setToZero} />
    </div>
  )
}


  ReactDOM.render(
    <App  />, 
    document.getElementById('root')
  );
