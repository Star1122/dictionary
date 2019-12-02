import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import HomeIcon from '@material-ui/icons/Home';

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
  toolbarIcon: {
    height: 80,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    ...theme.mixins.toolbar,
  },
  title: {
    color: theme.palette.common.white,
  },
  list: {
    padding: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
  listItem: {
    minHeight: theme.spacing(7),
    borderRadius: theme.spacing(0.25),
    overflow: 'hidden',

    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  activeItem: {
    backgroundColor: theme.palette.action.active,
  },
  listItemIcon: {
    minWidth: 40,
    color: theme.palette.common.white,
  },
  listItemText: {
    margin: 0,
    fontSize: 18,
    lineHeight: '24px',
    color: theme.palette.common.white,
  },
}));

const list = [
  { link: '/', label: 'Home', icon: <HomeIcon /> },
];

function LeftDrawer(props) {
  const classes = useStyles();

  const { location: { pathname }, open } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classnames(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <Typography variant="h5" className={classes.title}>Dictionary</Typography>
      </div>

      <List className={classes.list}>
        {list.map((item) => (
          <Link to={item.link} className={classes.link} key={item.label}>
            <ListItem button className={classnames(classes.listItem, pathname === item.link ? classes.activeItem : '')}>
              <ListItemIcon className={classes.listItemIcon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} className={classes.listItemText} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}

LeftDrawer.propTypes = {
  location: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  // handleDrawerClose: PropTypes.func,
};

LeftDrawer.defaultProps = {
  // handleDrawerClose: null,
};

export default LeftDrawer;
