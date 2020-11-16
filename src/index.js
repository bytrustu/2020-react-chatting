import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css'


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  )}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
