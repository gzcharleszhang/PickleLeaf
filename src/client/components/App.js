import React, { Component } from 'react';
import { Provider } from 'react-redux';
import makeStore from 'client/redux/store';
import axios from 'axios';
import '../App.css';
import Main from './Main';
import TopBar from './TopBar';

const store = makeStore();

class App extends Component {
  componentDidMount() {
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwtToken');
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <TopBar />
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
