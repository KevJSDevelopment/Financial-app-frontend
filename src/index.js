import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers/index'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

// let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducers, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(  
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

