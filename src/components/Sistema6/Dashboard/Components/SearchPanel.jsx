import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import SelectSupplier from '../../SelectSupplier';

const styles = theme => ({
  panel: {
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: '100%'
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  }
});

const SearchPanel = ({
  classes,
  activeButton,
  searchParams,
  searchFilters,
  handleStateChange,
  handleSupplierChange,
  handleInstitutionChange,
  handleContractTypeChange,
  handleSearchIdChange,
  handleSearchIdSubmit,
  selectedState,
  estados,
  suppliers,
  institutions,
  loading,
  dataSupplier,
  setDataSupplier
}) => {
  if (!activeButton) return null;

  const renderPanelContent = () => {
    switch (activeButton) {
      case 'estado':
        return (
          <FormControl className={classes.formControl}>
            <InputLabel>Selecciona el estado</InputLabel>
            <Select
              value={selectedState}
              onChange={handleStateChange}
              label="Selecciona el estado"
            >
              <MenuItem value="todos">Todos los Estados</MenuItem>
              {estados.map((estado) => (
                <MenuItem value={estado.id} key={estado.id}>
                  {estado.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'empresa':
        return (
          <>
            
            <FormControl className={classes.formControl}>
              <InputLabel>Institución</InputLabel>
              <Select
                value={searchParams.institution || ''}
                onChange={handleInstitutionChange}
                label="Institución"
                disabled={!dataSupplier || loading}
                className={classes.fondo}
              >
                <MenuItem value="">
                  <em>Todas las Instituciones</em>
                </MenuItem>
                {institutions && institutions.map((institution) => (
                  <MenuItem value={institution.id} key={institution.id}>
                    {institution.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );

      case 'tipo':
        return (
          <FormGroup className={classes.checkboxGroup}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={searchFilters.contractTypes.open}
                  onChange={handleContractTypeChange('open')}
                  disabled={loading}
                />
              }
              label="Licitación pública"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={searchFilters.contractTypes.direct}
                  onChange={handleContractTypeChange('direct')}
                  disabled={loading}
                />
              }
              label="Adjudicación directa"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={searchFilters.contractTypes.selective}
                  onChange={handleContractTypeChange('selective')}
                  disabled={loading}
                />
              }
              label="Invitación restringida"
            />
          </FormGroup>
        );

      case 'id':
        return (
          <FormControl className={classes.formControl}>
            <TextField
              label="Ingrese ID o OCID"
              variant="outlined"
              fullWidth
              size="small"
              value={searchFilters.searchId}
              onChange={handleSearchIdChange}
              onKeyPress={handleSearchIdSubmit}
              disabled={loading}
              placeholder="Presione Enter para buscar"
            />
          </FormControl>
        );

      default:
        return null;
    }
  };

  return (
    <Paper className={classes.panel}>
      {renderPanelContent()}
    </Paper>
  );
};

SearchPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  activeButton: PropTypes.string,
  searchParams: PropTypes.object.isRequired,
  searchFilters: PropTypes.object.isRequired,
  handleStateChange: PropTypes.func.isRequired,
  handleSupplierChange: PropTypes.func.isRequired,
  handleInstitutionChange: PropTypes.func.isRequired,
  handleContractTypeChange: PropTypes.func.isRequired,
  handleSearchIdChange: PropTypes.func.isRequired,
  handleSearchIdSubmit: PropTypes.func.isRequired,
  selectedState: PropTypes.string.isRequired,
  estados: PropTypes.array.isRequired,
  suppliers: PropTypes.array,
  institutions: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  dataSupplier: PropTypes.string.isRequired,
  setDataSupplier: PropTypes.func.isRequired
};

export default withStyles(styles)(SearchPanel);