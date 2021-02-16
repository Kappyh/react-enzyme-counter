import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);
  const [isErrorMessage,setIsErrorMessage] = React.useState(false);

  const decrement = () =>{
    if(count > 0){
      const newCount= count-1;
      setCount(newCount);
    }else{
      setIsErrorMessage(true);
    }
  }

  const increment = ()=>{
    setCount(count + 1);
    if(isErrorMessage) setIsErrorMessage(false);
  }

  return (
    <div data-test="component-app" className="App">
      <h1 data-test="counter-display">
        The counter is currently&nbsp; 
        <span data-test="count">{count}</span>
      </h1>
      <button
        data-test="increment-button"
        onClick={increment}
      >
        Increment counter
      </button>
      <button data-test="decrement-button"
      onClick={decrement}>
        Decrement counter
      </button>
      { isErrorMessage && <span data-test="error-message">Can decrement below to zero</span>}
    </div>
  );
}

export default App;
