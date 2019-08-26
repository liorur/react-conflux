import React, {createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import Store from './Store';
import StoreProvider from './StoreProvider';

/**
 * The stateObjects provides persistent storage of state for as many initialState objects as
 * needed throughout the application.
 *
 * Every instantiation of StoresProvider will add a new initialState object to stateObjects with
 * the key of the reducer name and the value of the state.
 */
const defaultStoreName = 'appStore';

const userStores = {};

const userContexts = {};

/**
 * Create a Context.Provider wrapper for children components wherever it is applied to the
 * component tree. This component can be called multiple times throughout the application.
 *
 * @param {Function} reducer A reducer function that contains a switch statement and, ultimately,
 * returns a state object. The reducer can never be undefined or anything other than a type of
 * function. Reducers should return modified state if the action.type passed into them is defined
 * or return the initialState if the action.type passed into them is undefined.
 *
 * @param {Object} stateContext A Context object created out of the createContext function
 * from React.
 *
 * @param {JSX} children The descending component tree JSX is passed in and placed inside
 * the Context.Provider.
 *
 * @returns {JSX} Returns a JSX component for a Context.Provider setup and passes in the memoized
 * value as well as the children of the Context component.
 */

const StoresProvider = ({stores, children}) => {
  // Error messages for the reducer object
  if (stores instanceof Store) {
    userStores[defaultStoreName] = stores;
  } else if (stores instanceof Object) {
    Object.keys(stores).forEach(storeName => {
      if (stores[storeName] instanceof Store) {
        userStores[storeName] = stores[storeName];
      }
    });
  }
  if (Object.keys(userStores).length === 0) {
    throw new Error(
      'The stores prop must be a Store or an object with store names ans keys and Stores as values.'
    );
  }

  if (
    children === undefined ||
    typeof children !== 'object' ||
    !Object.keys(children).length
  ) {
    throw new Error(
      'StoresProvider must contain children components. You probably forgot to wrap it around your components in your JSX.'
    );
  }

  /**
   * Uses the useReducer hook to pass in a reducer and initialState. It returns
   * an array that can be destructured into state and a dispatch function.
   */

  let wrappedChildren = children;
  Object.keys(userStores).forEach(storeName => {
    const store = userStores[storeName];
    const Context = createContext({});
    userContexts[storeName] = Context;
    wrappedChildren = (
      <StoreProvider store={store} context={Context}>
        {wrappedChildren}
      </StoreProvider>
    );
  });

  return wrappedChildren;
};

StoresProvider.propTypes = {
  stores: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};

export default StoresProvider;

export const useStore = storeName => {
  if (storeName) {
    return useContext(userContexts[storeName]);
  }

  return useContext(userContexts[defaultStoreName]);
};
