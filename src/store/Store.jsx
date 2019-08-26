class Store {
  internalState;

  initialState = {};

  dispatch;

  constructor(initialState) {
    this.initialState = initialState;
  }

  initialSetState(data) {
    this.initialState = {...this.initialState, ...data};
  }

  setState(data) {
    if (this.dispatch) {
      this.dispatch(data);
    }
    this.initialSetState(data);
  }

  get state() {
    return this.internalState || this.initialState;
  }

  reducer(oldState, newState) {
    return {...oldState, ...newState};
  }

  setReducerState(state) {
    this.internalState = state;
  }

  setDispatch(dispatch) {
    this.dispatch = dispatch;
    this.setState(this.initialState);
  }
}

export default Store;
