import React, {useReducer, useMemo, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';

const StoreProvider = ({store, context, children}) => {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  const [memoaizedState] = useMemo(() => {
    return [state, dispatch];
  }, [state]);
  store.setReducerState(memoaizedState);
  useLayoutEffect(() => {
    store.setDispatch(dispatch);
  }, []);
  return (
    <context.Provider value={[memoaizedState, store]}>
      {children}
    </context.Provider>
  );
};

StoreProvider.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  context: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};

export default StoreProvider;
