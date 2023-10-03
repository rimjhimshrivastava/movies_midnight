import React from 'react';
import { Provider } from 'react-redux';
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

// export const StoreContext = createContext();
// console.log('Context ', StoreContext);

// class Provider extends React.Component{
//   render(){
//     const {store} = this.props;
//     return (
//     <StoreContext.Provider value={store}>
//       {this.props.children}
//     </StoreContext.Provider>
//     );
//   }
// }

// very much important for redux to let the nested components of app to access redux store
// export function connect(callback){
//   return function(Component){

//     class ConnectedComponent extends React.Component{
//       constructor(props){
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
//       }

//       componentWillUnmount(){
//         this.unsubscribe();
//       }

//       render(){
//         const {store} = this.props;
//         const state = store.getState();
//         const data = callback(state);

//         return <Component 
//           {...data}
//           dispatch = {store.dispatch}  
//         />
//       }
//     }


//     class ConnectedComponentWrapper extends React.Component{
//       render(){
//         return <StoreContext.Consumer>
//           {store => <ConnectedComponent store = {store} />}
//         </StoreContext.Consumer>
//       }
//     }
//     return ConnectedComponentWrapper;
//   }

// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
