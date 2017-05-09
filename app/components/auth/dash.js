import React, { Component, } from 'react';
import { createStyleSheet, } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import { List, ListItem, ListItemIcon, ListItemText, } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import Grid from 'material-ui/Grid';
import StarIcon from 'material-ui-icons/Star';
import Receipt from 'material-ui-icons/Receipt';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import { WithCurrent, } from '../containers';
import { Cart, } from '../sales';
import Text from 'material-ui/Typography';
import RoleForm from './roleform';

const styleSheet = createStyleSheet('Dash', () => ({
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
}));

class Dash extends Component {
  state = {
    open: {
      top: false,
      left: false,
      bottom: false,
      right: false,
    },
  };

  toggleDrawer = (side, open) => {
    const drawerState = {};

    drawerState[side] = open;
    this.setState({ open: drawerState, });
  };

  handleRightOpen = () => this.toggleDrawer('right', true);
  handleRightClose = () => this.toggleDrawer('right', false);

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    const { currentUser, } = this.props;

    return (
      <Grid >
        <Text secondary align="center" type="headline">{`Welcome, ${currentUser.username}`}</Text>
        <Button onClick={this.handleRightOpen}>View Cart</Button>
        <Drawer
          anchor="right"
          open={this.state.open.right}
          onRequestClose={this.handleRightClose}
        >
          <List>
            <RoleForm formID="navrole" />

            <ListItem button>
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText primary="Histort" />
            </ListItem>
          </List>
          <Cart />
        </Drawer>
      </Grid>
    );
  }
}

Dash.contextTypes = { styleManager: customPropTypes.muiRequired, };
export default WithCurrent(Dash);
