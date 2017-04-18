import { createStore, } from 'redux';
import getReducer from './reducer';
import { apolloWare, } from './utils/apollo';

let reduxStore = null;

const initStore = (client, initialState) => {
  let store;

  if (!process.browser || !reduxStore) {
    const middleware = apolloWare(client.middleware());

    store = createStore(getReducer(client), initialState, middleware);
    if (!process.browser) {
      return store;
    }
    reduxStore = store;
  }
  return reduxStore;
};

export default initStore;
