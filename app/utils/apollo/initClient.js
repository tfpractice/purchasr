import { ApolloClient, } from 'react-apollo';
import { networkInterface, } from './interface';
let apolloClient = null;

function _initClient(headers, initialState) {
  return new ApolloClient({
    initialState,
    networkInterface,
    dataIdFromObject: ({ id, } = { id: '', }) => id,
    ssrMode: !process.browser,
  });
}

const initClient = (headers, initialState = {}) => {
  if (!process.browser) {
    return _initClient(headers, initialState);
  }
  
  if (!apolloClient) {
    apolloClient = _initClient(headers, initialState);
  }
  
  return apolloClient;
};

export default initClient;
