import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'

import { getLocation } from './utils/api'

// save location in startup
getLocation();

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
