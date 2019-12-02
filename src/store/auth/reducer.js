import actionTypes from './types';

const INITIAL_STATE = {
  isLoggingIn: false,
  isSigningUp: false,
  isLoggingOut: false,
  isVerifying: false,

  user: null,
  isAuthenticated: false,

  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        isAuthenticated: false,
        error: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        error: action.payload.error,
      };

    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        error: null,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        error: action.payload.error,
      };

    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        error: null,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: null,
      };
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        error: action.payload.error,
      };

    case actionTypes.VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        error: null,
      };
    case actionTypes.VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };

    default:
      return state;
  }
};
