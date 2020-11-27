import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore/*,applyMiddleware*/} from 'redux'
import reducers from './reducers/index'
// import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import {ThemeProvider, createMuiTheme} from '@material-ui/core'
// import thunk from 'redux-thunk'

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// let store = createStore( reducers, composeWithDevTools(applyMiddleware(thunk)));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#98ee99',
      main: '#66bb6a',
      dark: '#338a3e',
      contrastText: 'whitesmoke',
    },
    secondary: {
      light: '#62727b',
      main: '#37474f',
      dark: '#102027',
      contrastText: 'whitesmoke',
    }
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

