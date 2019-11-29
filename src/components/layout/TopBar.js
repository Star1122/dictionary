import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import makeStyles from '@material-ui/styles/makeStyles';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${theme.spacing(7)}px)`,
    height: 80,
    marginLeft: theme.spacing(7),
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    height: 80,
    paddingRight: theme.spacing(3), // keep right padding when drawer closed
  },
  menuButton: {
    marginRight: theme.spacing(4.5),
  },
  menuButtonHidden: {
    display: 'none',
  },
}));

function TopBar(props) {
  const classes = useStyles();

  const { open } = props;

  return (
    <AppBar
      position="absolute"
      className={classnames(classes.appBar, open && classes.appBarShift)}
    />
  );
}

TopBar.propTypes = {
  open: PropTypes.bool.isRequired,
  // handleDrawerOpen: PropTypes.func,
};

TopBar.defaultProps = {
  // handleDrawerOpen: null,
};

export default TopBar;
