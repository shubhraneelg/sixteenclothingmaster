import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import {ProdProvider} from '../src/context/ProductContext'
import { ServiceProvider } from '../src/context/ServiceContext';
import {
  BrowserRouter as Router,
 } from "react-router-dom";

ReactDOM.render(
  <ProdProvider>
    <ServiceProvider>
  <Router>
    <App />
    </Router>
    </ServiceProvider>
  </ProdProvider>,
  document.getElementById('root')
);
