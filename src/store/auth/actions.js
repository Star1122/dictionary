import { firebase } from 'utils/firebase';
import types from './types';

export const login = ({ email, password }) => (dispatch, getState) => {
  if (getState().auth.isLoggingIn) {
    return Promise.reject();
  }

  dispatch({
    type: types.LOGIN_REQUEST,
  });

  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user },
      });

      return user;
    })
    .catch((error) => {
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: { error },
      });

      throw error;
    });
};

export const signup = ({ email, password }) => (dispatch, getState) => {
  if (getState().auth.isSigningUp) {
    return Promise.reject();
  }

  dispatch({
    type: types.SIGNUP_REQUEST,
  });

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      dispatch({
        type: types.SIGNUP_SUCCESS,
        payload: { user },
      });

      return user;
    })
    .catch((error) => {
      dispatch({
        type: types.SIGNUP_FAILURE,
        payload: { error },
      });

      throw error;
    });
};

export const logout = () => (dispatch, getState) => {
  if (getState().auth.isLoggingOut) {
    return Promise.reject();
  }

  dispatch({
    type: types.LOGOUT_REQUEST,
  });

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: types.LOGOUT_SUCCESS,
      });

      return true;
    })
    .catch((error) => {
      dispatch({
        type: types.LOGOUT_FAILURE,
        payload: { error },
      });

      throw error;
    });
};

export const verifyAuth = () => (dispatch, getState) => {
  if (getState().auth.isVerifying) {
    return Promise.reject();
  }

  dispatch({
    type: types.VERIFY_REQUEST,
  });

  firebase
    .auth()
    .onAuthStateChanged((user) => {
      if (user !== null) {
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: { user },
        });
      }

      dispatch({
        type: types.VERIFY_SUCCESS,
      });
    });
};
