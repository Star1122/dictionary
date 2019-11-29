import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import makeStyles from '@material-ui/styles/makeStyles';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor: theme.palette.primary.darker,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      // width: theme.spacing(9),
    },
  },
}));

function LeftDrawer({ open }) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classnames(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    />
  );
}

LeftDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  // handleDrawerClose: PropTypes.func,
};

LeftDrawer.defaultProps = {
  // handleDrawerClose: null,
};

export default LeftDrawer;
