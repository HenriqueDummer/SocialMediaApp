import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'
const store = createStore(reducers, compose(applyMiddleware(thunk)))

createRoot(document.getElementById('root')).render(
  <StrictMode store={store}>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
