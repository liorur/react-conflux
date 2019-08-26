import {Store} from 'react-conflux';

const initialState = {
  title: 'This is the title from the titleStore',
};

export class TitleStore extends Store {
  constructor(props) {
    super(props);
    this.setState(initialState);
  }

  setTitle(text) {
    this.setState({title: text});
  }
}
