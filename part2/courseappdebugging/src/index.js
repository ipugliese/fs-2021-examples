import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => (
  <div>
    <p>Nombre: {course.name}</p>
  </div>
) 

const Course = ({ course }) => (
  <div>
    <Header course={course} />
  </div>
)

const App = () => {
  const course = {
    // ...
    name: 'Ivan',
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
