import { createNetworkInterface, } from 'react-apollo';
import { authWare, reqLogger, resLogger, } from './middleware';

export const networkInterface = createNetworkInterface({
  uri: 'https://us-west-2.api.scaphold.io/graphql/tfpTest',
  opts: { credentials: 'same-origin', },
}).use([ authWare, reqLogger, ]).useAfter([ resLogger, ]);
