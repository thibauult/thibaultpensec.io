import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, BrowserRouter, Route, Navigate, Link } from 'react-router-dom';

import './index.css';
import Home from './pages/Home';
import NotFound from "./pages/NotFound";
import {Experience} from "./pages/Experience";

import { PrismicProvider, PrismicToolbar } from '@prismicio/react'
import { client, repositoryName } from './prismic'

ReactDOM.render(
  <React.StrictMode>
      <PrismicProvider
          client={client}
          internalLinkComponent={({ href, ...props }) => (
              <Link to={href} {...props} />
          )}
      >
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/experience/:uid" element={<Experience />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
          <PrismicToolbar repositoryName={repositoryName} />
      </PrismicProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

