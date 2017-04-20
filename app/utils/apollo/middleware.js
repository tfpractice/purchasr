import { ApolloClient, createNetworkInterface, } from 'react-apollo';

const post = ({ response, }, next) => next();
const pre = (req, next) => next();

const preWare = (applyMiddleware = pre) => ({ applyMiddleware, });
const postWare = (applyAfterware = post) => ({ applyAfterware, });

const preLog = (req, next) => {
  console.log('APOLLO REQUEST IN PRGRESS ', req);
  next();
};

const postLog = ({ response, }, next) => {
  console.log('next', next);
  console.log('APOLLO RESPONSE IN PRGRESS ', (response));
  next();
};

export const reqLogger = preWare(preLog);
export const resLogger = postWare(postLog);
