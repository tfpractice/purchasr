import { ApolloClient, createNetworkInterface, } from 'react-apollo';

let apolloClient = null;

function _initClient(headers, initialState) {
  return new ApolloClient({
    initialState,
    ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    networkInterface: createNetworkInterface({
      uri: 'https://us-west-2.api.scaphold.io/graphql/tfpTest',
      opts: {
        credentials: 'same-origin',
        
        // Pass headers here if your graphql server requires them
      },
    }),
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
