import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import './index.css';
import {App} from './components';
import rootReducer from './reducers';


//curried form of function logger(abj, next, action)
//redux will internally call this function as
// logger(obj)(next)(action)
// const logger = function ({dispatch, getState}) {
//   return function (next){
//     return function(action){
//       console.log("Action Type: ", action.type);
//       next(action);
//     }
//   }
// }

const logger = ({dispatch, getState}) => (next) => (action) =>{
  console.log("Action Type: ", action.type);
  next(action);
}

// const thunk = ({dispatch, getState}) => (next) => (action) =>{
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }


const store = createStore(rootReducer, applyMiddleware(logger, thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App
    store={store}
    />
  </React.StrictMode>
);
