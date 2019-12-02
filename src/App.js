import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import makeStyles from '@material-ui/styles/makeStyles';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { PrivateRoute, PublicRoute } from 'routes';

import { LeftDrawer, TopBar } from 'components/layout';

import Login from 'containers/Login';
import SignUp from 'containers/SignUp';
import Home from 'containers/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    height: 70,
    paddingRight: theme.spacing(3), // keep right padding when drawer closed
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: {
    height: 80,
    ...theme.mixins.toolbar,
  },
  appContent: {
    height: 'calc(100% - 80px)',
    padding: theme.spacing(1.875),

    '& > .scrollbar-container': {
      padding: theme.spacing(1.875),
    },
  },
}));

const App = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className={classes.root}>
        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />

        <LeftDrawer open={open} handleDrawerClose={handleDrawerClose} {...props} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <div className={classes.appContent}>
            <PerfectScrollbar
              options={{
                suppressScrollX: true,
                minScrollbarLength: 50,
              }}
            >
              <Switch>
                <PublicRoute exact path="/login" component={Login} props={props} />
                <PublicRoute exact path="/signup" component={SignUp} props={props} />

                <PrivateRoute exact path="/" component={Home} props={props} />
              </Switch>
            </PerfectScrollbar>
          </div>
        </main>
      </div>
    </SnackbarProvider>
  );
};

const mapStateToProps = (store) => ({
  isVerifying: store.auth.isVerifying,
  isAuthenticated: store.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(App));
