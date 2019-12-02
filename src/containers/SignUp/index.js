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

import { signup } from 'store/auth/actions';
import { confirmMessage } from 'utils';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { isSigningUp, history, signup } = props;

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

    signup(state)
      .then(() => {
        history.push('/');
      })
      .catch((e) => {
        confirmMessage(enqueueSnackbar, e.message, 'error');
      });
  };

  return (
    <Box className={classes.container} p={3} display="flex" alignItems="center" justifyContent="center">
      <Box className={classes.paper} display="flex" alignItems="center" flexDirection="column">
        <Typography component="h1" variant="h5">Sign Up</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                type="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                value={state.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            disabled={isSigningUp}
          >
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

SignUp.propTypes = {
  isSigningUp: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  isSigningUp: store.auth.isSigningUp,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signup,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
