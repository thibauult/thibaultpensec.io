import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Home from './Home';

import { PrismicProvider } from '@prismicio/react'
import client from './prismic'

ReactDOM.render(
  <React.StrictMode>
    <PrismicProvider client={client}>
      <Home />
    </PrismicProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

