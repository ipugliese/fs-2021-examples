import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  const now = new Date();
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
      <p>it is {now.toString()}!!!</p>
    </div>
  )
}
const App = () => {
  console.log('Hello from component');
  const name = "Peter";
  const age = 10;
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Ivan" age="50"/>  
      <Hello name="Luz" age="62"/>  
      <Hello name="Stella" age="33"/>
      <Hello name="Maia" age={26 + age} />
      <Hello name={name} age={age} />  
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root')
);
