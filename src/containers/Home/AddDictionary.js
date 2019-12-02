import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/styles/makeStyles';
import { useSnackbar } from 'notistack';

import { createDictionary } from 'store/dictionaries/actions';
import { confirmMessage } from 'utils';

const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(3),
  },
  actions: {
    padding: theme.spacing(3),
  },
}));

function AddDictionary(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { isCreating, createDictionary } = props;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = useState({ name: '', lang: '' });
  const handleChange = (e) => {
    e.persist();

    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    createDictionary(state)
      .then(() => {
        setState({ name: '', lang: '' });
        handleClose();
      })
      .catch((e) => {
        confirmMessage(enqueueSnackbar, e.message, 'error');
      });
  };

  return (
    <Box mb={3} display="flex" alignItems="center" justifyContent="flex-end">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Dictionary
      </Button>

      <Dialog open={open}>
        <DialogTitle>Add Dictionary</DialogTitle>

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
          <Button variant="contained" disabled={isCreating} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" disabled={isCreating} onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

AddDictionary.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  createDictionary: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  isCreating: store.dictionaries.isCreating,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createDictionary,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddDictionary);
