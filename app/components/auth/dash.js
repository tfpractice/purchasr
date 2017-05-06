import React, { Component, } from 'react';
import { createStyleSheet, } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import { List, ListItem, ListItemIcon, ListItemText, } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import { WithCurrent, } from '../containers';
import { Cart, } from '../sales';

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

    const mailFolderListItems = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Send mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </div>
    );

    const otherMailFolderListItems = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="All mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Spam" />
        </ListItem>
      </div>
    );

    const fullList = (
      <div>
        <List className={classes.listFull} disablePadding>
          {mailFolderListItems}
        </List>
        <Divider />
        <List className={classes.listFull} disablePadding>
          {otherMailFolderListItems}
        </List>
      </div>
    );

    console.log('DASH.props', this.props);
    return (
      <div>
        <Button onClick={this.handleRightOpen}>Open Right</Button>

        <Drawer
          anchor="right"
          open={this.state.open.right}
          onRequestClose={this.handleRightClose}
        >
          <Cart />
        </Drawer>
      </div>
    );
  }
}

Dash.contextTypes = { styleManager: customPropTypes.muiRequired, };
export default WithCurrent(Dash);
