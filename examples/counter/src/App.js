import React from 'react';
import {StoresProvider} from 'react-conflux';
import {CounterStore} from './store/CounterStore';
import {TitleStore} from './store/TitleStore';

import Counter from './components/Counter';

const App = () => {
  const stores = {
    counterStore: new CounterStore(),
    titleStore: new TitleStore(),
  };
  console.log(stores);
  return (
    <StoresProvider stores={stores}>
      <Counter />
    </StoresProvider>
  );
};

export default App;
