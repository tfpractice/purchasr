import React, { Component, } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Typography';
import Layout from 'material-ui/Layout';
import { Dash, Login, } from './auth';
import { WithCurrent, } from './containers';

const NavBar = ({ currentUser, ...props }) => {
  console.log('props', props);
  return (
    <AppBar>
      <Toolbar>
        <Layout container justify={'space-between'}>
          <Text type="headline" colorInherit>Pruchasr</Text>
          {currentUser ? <Dash /> : <Login formID={'mainLogin'} />}
        </Layout>
      </Toolbar>
    </AppBar>
  );
};

export default WithCurrent(NavBar);
