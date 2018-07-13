import React, { Component } from 'react';
import './App.css';
//import logo from './1564.png';
import NewsPanel from '../NewsPanel/NewsPanel';

class App extends Component {
  render() {
    return (
      <div>
        <div className='container'>
          <NewsPanel />
        </div>
      </div>

    );
  }
}

export default App;
