import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MUIDataTable from 'mui-datatables';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

import { fetchDictionaries, deleteDictionaries } from 'store/dictionaries/actions';
import { confirmMessage } from 'utils';
import AddDictionary from './AddDictionary';
import EditDictionary from './EditDictionary';

function Home(props) {
  const { enqueueSnackbar } = useSnackbar();

  const { dictionaries, fetchDictionaries, deleteDictionaries } = props;

  useEffect(() => {
    fetchDictionaries();
  }, [fetchDictionaries]);

  const handleRowsDelete = (rowsDeleted) => {
    const ids = rowsDeleted.data.map(({ index }) => dictionaries[index].id);
    deleteDictionaries(ids)
      .then(() => {
      })
      .catch((e) => {
        confirmMessage(enqueueSnackbar, e.message, 'error');
      });

    return false;
  };

  const [state, setState] = useState(null);
  const handleClick = (id) => () => {
    const dictionary = dictionaries.find((d) => d.id === id);
    setState(dictionary);
  };
  const handleCloseEdit = () => {
    setState(null);
  };

  const columns = [
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'lang',
      label: 'Language',
    },
    {
      name: 'id',
      label: 'Actions',
      options: {
        customBodyRender: (value) => (
          <Button variant="outlined" color="primary" onClick={handleClick(value)}>Edit</Button>
        ),
      },
    },
  ];

  return (
    <>
      <AddDictionary />

      {Boolean(state) && (
        <EditDictionary dictionary={state} onClose={handleCloseEdit} />
      )}

      <MUIDataTable
        title="List of Dictionaries"
        data={dictionaries}
        columns={columns}
        options={{
          onRowsDelete: handleRowsDelete,
        }}
      />
    </>
  );
}

Home.propTypes = {
  dictionaries: PropTypes.array.isRequired,
  fetchDictionaries: PropTypes.func.isRequired,
  deleteDictionaries: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  dictionaries: store.dictionaries.dictionaries,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchDictionaries,
  deleteDictionaries,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
