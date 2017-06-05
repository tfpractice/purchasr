import { ApolloClient, createNetworkInterface, } from 'react-apollo';
import * as stream from 'stream';

const post = ({ response, }, next) => next();
const pre = (req, next) => next();

const preWare = (applyMiddleware = pre) => ({ applyMiddleware, });
const postWare = (applyAfterware = post) => ({ applyAfterware, });

const preLog = (req, next) => {
  console.log('APOLLO REQUEST IN PRGRESS ');
  console.log('req', req);
  next();
};

const auth = (req, next) => {
  if (!req.options.headers) {
    req.options.headers = {};
  }
  if (process.browser) {
    console.log('req.options', req.options);

    const token = localStorage.getItem('purchasr_token');

    console.log('token', token);
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
  }
  next();
};

const postLog = ({ response, }, next) => {
  console.log('res', response);
  console.log('APOLLO RESPONSE IN PRGRESS ');
  next();
};

export const authWare = preWare(auth);
export const reqLogger = preWare(preLog);
export const resLogger = postWare(postLog);
