import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux'
import reducers from './reducers/index'
import {Provider} from 'react-redux'
import {ThemeProvider, createMuiTheme} from '@material-ui/core'

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e1ffb1',
      main: '#aed581',
      dark: '#7da453',
      contrastText: 'whitesmoke',
    },
    secondary: {
      light: '#7e858d',
      main: '#525860',
      dark: '#292f36',
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

