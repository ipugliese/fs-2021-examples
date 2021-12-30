import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )    
  }

  return ( <div>{allClicks.join(' ')}</div> )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )
  
  return (
    <div>
      {left}
      <Button text="Left" onClick={handleLeftClick} />
      <Button text="Rigth" onClick={handleRightClick} />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

ReactDOM.render(
  <App  />, 
  document.getElementById('root')
);
