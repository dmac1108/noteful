import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import Store from './dummy-store';


ReactDOM.render(<BrowserRouter><App Store={Store}/></BrowserRouter>, document.getElementById('root'));


