import React, { Component, } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { Dash, Login, } from './auth';
import { WithCurrent, } from './containers';

const NavBar = ({ currentUser, ...props }) => {
  console.log('props', props);
  return (
    <AppBar>
      <Toolbar>
        <Grid container justify={'space-between'}>
          <Text type="headline" colorInherit>Pruchasr</Text>
          {currentUser ? <Dash /> : <Login formID={'mainLogin'} />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default WithCurrent(NavBar);
