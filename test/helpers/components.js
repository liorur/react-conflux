import React from 'react';
import {StoresProvider} from '../../src';
import {MyStore} from './MyStore';

export const TestApp = ({children}) => {
  const myStore = new MyStore({text: 'Testing'});
  return (
    <StoresProvider stores={myStore}>
      <div>{children}</div>
    </StoresProvider>
  );
};
