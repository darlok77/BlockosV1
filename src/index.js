// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// Functions
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.scss'

// Components
import Home from './components/home'

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))
