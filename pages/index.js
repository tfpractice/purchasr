import React from 'react';
import App from '../app/components';
import injectTapEventPlugin from 'react-tap-event-plugin';

import withData from '../app/utils/apollo/withData';
  
export default withData(props =>
  <App {...props} />
  );
