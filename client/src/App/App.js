import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';
import NewsPanel from '../NewsPanel/NewsPanel';

class App extends Component {
  render() {
    return (
      <div>
        <img className='logo' src={logo} alt='logo'/>
        <div className='container'>
          <NewsPanel />
        </div>
      </div>

    );
  }
}

export default App;
