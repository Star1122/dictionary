import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import { useSnackbar } from 'notistack';

import { login } from 'store/auth/actions';
import { confirmMessage } from 'utils';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
    backgroundColor: theme.palette.common.white,
  },
  paper: {
    maxWidth: 400,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoggingIn, history, login } = props;

  const [state, setState] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    e.persist();

    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    login(state)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        confirmMessage(enqueueSnackbar, error.message, 'error');
      });
  };

  return (
    <Box className={classes.container} p={3} display="flex" alignItems="center" justifyContent="center">
      <Box className={classes.paper} display="flex" alignItems="center" flexDirection="column">
        <Typography component="h1" variant="h5">Login</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={state.email}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            type="password"
            name="password"
            label="Password"
            autoComplete="current-password"
            value={state.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            disabled={isLoggingIn}
          >
            Login
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

Login.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  isLoggingIn: store.auth.isLoggingIn,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
