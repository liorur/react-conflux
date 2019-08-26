import React from 'react';
import {useStore} from 'react-conflux';

const Counter = () => {
  const [counterState, counterStore] = useStore('counterStore');
  const [titleState] = useStore('titleStore');
  const increment = e => {
    e.preventDefault();
    counterStore.increment()
  };
  const decrement = e => {
    e.preventDefault();
    counterStore.decrement()
  };
  return (
    <div>
      <h1>{titleState.title}</h1>
      <p>This is the count from the counterReducer: {counterState.count}</p>
      <button type="button" onClick={increment}>
        Increase
      </button>
      <button type="button" onClick={decrement}>
        Decrease
      </button>
    </div>
  );
};

export default Counter;
