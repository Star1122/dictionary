import { firebase, db } from 'utils/firebase';
import types from './types';

export const fetchDictionaries = () => (dispatch, getState) => {
  if (getState().dictionaries.isFetchingList) {
    return Promise.reject();
  }

  dispatch({
    type: types.FETCH_DICTIONARIES_REQUEST,
  });

  const user = firebase.auth().currentUser;

  return db
    .collection('dictionaries')
    .where('createdBy', '==', user.uid)
    .get()
    .then((querySnapshot) => {
      const dictionaries = [];
      querySnapshot.forEach((doc) => {
        dictionaries.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      dispatch({
        type: types.FETCH_DICTIONARIES_SUCCESS,
        payload: { dictionaries },
      });

      return dictionaries;
    })
    .catch((error) => {
      dispatch({
        type: types.FETCH_DICTIONARIES_FAILURE,
        payload: { error },
      });

      throw error;
    });
};

export const createDictionary = ({ name, lang }) => (dispatch, getState) => {
  if (getState().dictionaries.isCreating) {
    return Promise.reject();
  }

  dispatch({
    type: types.CREATE_DICTIONARY_REQUEST,
  });

  const user = firebase.auth().currentUser;

  return db
    .collection('dictionaries')
    .add({
      name,
      lang,
      createdBy: user.uid,
    })
    .then(() => {
      dispatch({
        type: types.CREATE_DICTIONARY_SUCCESS,
      });

      dispatch(fetchDictionaries());

      return true;
    })
    .catch((error) => {
      dispatch({
        type: types.CREATE_DICTIONARY_FAILURE,
        payload: { error },
      });

      throw error;
    });
};

export const updateDictionary = ({ id, name, lang }) => (dispatch, getState) => {
  if (getState().dictionaries.isUpdating) {
    return Promise.reject();
  }

  dispatch({
    type: types.UPDATE_DICTIONARY_REQUEST,
  });

  return db
    .collection('dictionaries')
    .doc(id)
    .update({ name, lang })
    .then(() => {
      dispatch({
        type: types.UPDATE_DICTIONARY_SUCCESS,
      });

      dispatch(fetchDictionaries());

      return true;
    })
    .catch((error) => {
      dispatch({
        type: types.UPDATE_DICTIONARY_FAILURE,
        payload: { error },
      });

      throw error;
    });
};

const deleteAction = (id) => db
  .collection('dictionaries')
  .doc(id)
  .delete();

export const deleteDictionaries = (ids) => (dispatch, getState) => {
  if (getState().dictionaries.isDeleting) {
    return Promise.reject();
  }

  dispatch({
    type: types.DELETE_DICTIONARY_REQUEST,
  });

  return Promise.all(ids.map((id) => deleteAction(id)))
    .then(() => {
      dispatch(fetchDictionaries());

      dispatch({
        type: types.DELETE_DICTIONARY_SUCCESS,
      });

      return true;
    })
    .catch((error) => {
      dispatch(fetchDictionaries());

      dispatch({
        type: types.DELETE_DICTIONARY_FAILURE,
        payload: { error },
      });

      throw error;
    });
};
