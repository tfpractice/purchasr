import thunk from 'redux-thunk';
import { createLogger as makeLog, } from 'redux-logger';
import { applyMiddleware as applyMid, createStore, } from 'redux';
import getReducer from './reducer';

const collapsed = (getState, action) => action.type;
const log = makeLog({ collapsed, });

let reduxStore = null;

const initStore = (client, initialState) => {
  let store;
  
  if (!process.browser || !reduxStore) {
    store = applyMid(thunk, client.middleware(), log)(createStore)(getReducer(client), initialState);
    
    if (!process.browser) {
      return store;
    }
    
    reduxStore = store;
  }
  
  return reduxStore;
};

export default initStore;
