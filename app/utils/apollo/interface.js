import { createNetworkInterface, } from 'react-apollo';
import { reqLogger, resLogger, } from './middleware';

export const networkInterface = createNetworkInterface({
  uri: 'https://us-west-2.api.scaphold.io/graphql/tfpTest',
  opts: { credentials: 'same-origin', },
}).use([ reqLogger, ]).useAfter([ resLogger, ]);
