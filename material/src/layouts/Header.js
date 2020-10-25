import React, { Component, Fragment } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info";
import StarsIcon from "@material-ui/icons/Stars";
import GitHubIcon from "@material-ui/icons/GitHub";
import { withRouter } from "react-router-dom";

import { drawerToggle } from "../actions/ui";
const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

export class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    drawerToggle: PropTypes.func.isRequired,
  };
  state = {
    open: false,
  };
  handleDrawerOpen = () => {
    this.props.drawerToggle(true);
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.props.drawerToggle(false);
    this.setState({ open: false });
  };
  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    const { handleDrawerOpen, handleDrawerClose } = this;
    return (
      <Fragment>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>

            <Grid
              justify="space-between" // Add it here :)
              container
              // spacing={24}
            >
              <Grid item>
                <Typography variant="h6" noWrap>
                  Skin Disease Detector
                </Typography>
              </Grid>

              <Grid item>
                <div>{/* <LoginForm /> */}</div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component="a" href="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Prediction" />
            </ListItem>
            <ListItem button component="a" href="/repos">
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary="Git repository" />
            </ListItem>
            <ListItem button component="a" href="/acknowledgement">
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary="Acknowledgement" />
            </ListItem>
            <ListItem button component="a" href="/Register">
              <ListItemIcon>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
            <ListItem button component="a" href="/aboutus">
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="AboutUs" />
            </ListItem>
          </List>
        </Drawer>
      </Fragment>
    );
  }
}

export default compose(
  withStyles(useStyles, { withTheme: true }),
  connect(null, { drawerToggle }),
  withRouter
)(Header);