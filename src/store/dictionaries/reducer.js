import actionTypes from './types';

const INITIAL_STATE = {
  isFetchingList: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  dictionaries: [],

  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DICTIONARIES_REQUEST:
      return {
        ...state,
        isFetchingList: true,
        error: null,
      };
    case actionTypes.FETCH_DICTIONARIES_SUCCESS:
      return {
        ...state,
        isFetchingList: false,
        dictionaries: action.payload.dictionaries,
      };
    case actionTypes.FETCH_DICTIONARIES_FAILURE:
      return {
        ...state,
        isFetchingList: false,
        error: action.payload.error,
      };

    case actionTypes.CREATE_DICTIONARY_REQUEST:
      return {
        ...state,
        isCreating: true,
        error: null,
      };
    case actionTypes.CREATE_DICTIONARY_SUCCESS:
      return {
        ...state,
        isCreating: false,
      };
    case actionTypes.CREATE_DICTIONARY_FAILURE:
      return {
        ...state,
        isCreating: false,
        error: action.payload.error,
      };

    case actionTypes.UPDATE_DICTIONARY_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    case actionTypes.UPDATE_DICTIONARY_SUCCESS:
      return {
        ...state,
        isUpdating: false,
      };
    case actionTypes.UPDATE_DICTIONARY_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.payload.error,
      };

    case actionTypes.DELETE_DICTIONARY_REQUEST:
      return {
        ...state,
        isDeleting: true,
        error: null,
      };
    case actionTypes.DELETE_DICTIONARY_SUCCESS:
      return {
        ...state,
        isDeleting: false,
      };
    case actionTypes.DELETE_DICTIONARY_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
