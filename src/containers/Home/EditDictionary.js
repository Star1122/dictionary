import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/styles/makeStyles';
import { useSnackbar } from 'notistack';

import { updateDictionary } from 'store/dictionaries/actions';
import { confirmMessage } from 'utils';

const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(3),
  },
  actions: {
    padding: theme.spacing(3),
  },
}));

function EditDictionary(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const {
    isUpdating,
    dictionary,
    onClose,
    updateDictionary,
  } = props;

  const [state, setState] = useState(dictionary);
  const handleChange = (e) => {
    e.persist();

    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    updateDictionary(state)
      .then(() => {
        onClose();
      })
      .catch((e) => {
        confirmMessage(enqueueSnackbar, e.message, 'error');
      });
  };

  return (
    <Dialog open={Boolean(dictionary)}>
      <DialogTitle>Edit Dictionary</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          id="name"
          name="name"
          label="Name"
          fullWidth
          value={state.name}
          onChange={handleChange}
        />
        <TextField
          className={classes.mt}
          id="language"
          name="lang"
          label="Language"
          fullWidth
          value={state.lang}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button variant="contained" disabled={isUpdating} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" disabled={isUpdating} onClick={handleSubmit}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditDictionary.propTypes = {
  isUpdating: PropTypes.bool.isRequired,
  dictionary: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  updateDictionary: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  isUpdating: store.dictionaries.isUpdating,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateDictionary,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditDictionary);
