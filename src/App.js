import React, { Component } from 'react';
import './App.css';

import auth from './firebase';

class App extends Component {
  handleClick = () => {
    auth.signinUserWithEmailAndPassword('hello@MediaList1.ru', 'password').catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode)
    });

  }

  handleOut = () => {
    auth.signinUserWithEmailAndPassword('hello@MediaList1.ru', 'password').catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode)
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged(function(user) {
      console.log('hello kitty')
    });    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
            <button onClick={this.handleClick}>Click</button>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
