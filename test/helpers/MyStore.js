import Store from '../../src/store/Store';

export class MyStore extends Store {
  updateText(text) {
    this.setState({text});
  }
}
