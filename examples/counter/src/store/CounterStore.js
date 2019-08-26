import {Store} from 'react-conflux';

const initialState = {
  count: 0,
};

export class CounterStore extends Store {
  constructor(props) {
    super(props);
    this.setState(initialState);
  }

  increment() {
    this.setState({count: this.state.count + 1});
  }
  decrement() {
    this.setState({count: this.state.count - 1});
  }
}
