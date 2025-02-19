import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Grid, 
  Box, 
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField
} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { 
  Business, 
  Category,
  SearchOutlined 
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import axios from 'axios';

// MexicoIcon component remains the same
const MexicoIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 512 512">
    <path d="M453.7,273.8l-16.7,17.5-5.3,21.5-11.6,12.3-32.5,10.5-32.5-17-19.8-25-13.1-40.3,2-40.1,7.2-7.2-9.2-13.7-30.3-16.4-22.4-37.6c-7.9-9.2-30.2-17-30.2-17l-16.7,12-33.3-35.8-27.2-13.3-67.1,1.9L19.2,53.4.3,59.8s41,85.2,43,91.5c-4.7,1.1-9.5,1.8-14.4,2.2l-.9,8.4,34,23.8,7.9,21.7,12.8,14.9,14.7,25,13.7-10.3-8.5-20.8-34.5-71.5-16.4-29.6-6.8-22.8,12,3.9,99.3,142.5,25.2,47.8-3.7,19.9,81.9,59,71.1,26.2s15.4.4,25.1,0c9.8-.5,5.1.2,11.7-.2,0,.6,25.3-1.2,25.3-1.2l29.2,15.1,7.5-7.9-1.9-13.7,19.6-1.5,8.5-15.4s-13.3-12.6-13.7-15.8h.4l18.5-1.9,15.5-17.9,11.7,2.2,23.5-62.1c-.2-.7-12.7-8.2-12.7-8.2l-45.5,10.5v.2ZM263.5,64.6h-58.3v-12.8h58.3v12.8ZM263.5,95.8h-58.3v-12.8h58.3v12.8ZM487.4,208.9h-58.3v-12.8h58.3v12.8ZM487.4,240.2h-58.3v-12.8h58.3v12.8ZM58.7,344.8h58.3v12.8h-58.3v-12.8ZM58.7,376.1h58.3v12.8h-58.3v-12.8ZM251.1,399.2h58.3v12.8h-58.3v-12.8ZM251.1,430.4h58.3v12.8h-58.3v-12.8Z"/>
  </SvgIcon>
);

// Styles remain exactly the same
const styles = theme => ({
  searchButton: {
    cursor: 'pointer',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(1),
    transition: 'all 0.3s ease',
    border: '1px solid #e0e0e0',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderColor: '#42a5cc',
      '& $icon': {
        color: '#42a5cc',
      }
    }
  },
  searchButtonActive: {
    backgroundColor: '#1b6887',
    borderColor: '#1b6887',
    '& $buttonText': {
      color: '#ffffff',
    },
    '& $subtitle': {
      color: '#e0e0e0',
    },
    '& $icon': {
      color: '#ffffff',
    },
    '&:hover': {
      transform: 'none',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      '& $icon': {
        color: '#ffffff',
      }
    }
  },
  icon: {
    fontSize: 40,
    marginRight: theme.spacing(2),
    color: '#1b6887',
    transition: 'color 0.3s ease'
  },
  buttonText: {
    color: '#1b6887',
    fontWeight: 500,
    transition: 'color 0.3s ease'
  },
  subtitle: {
    color: '#666',
    fontSize: '0.875rem',
    transition: 'color 0.3s ease'
  },
  controlsPanel: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.spacing(1),
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  }
});

const SearchButtons = ({ classes, selectedState, setSelectedState, estados, onSearch }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  // Fetch suppliers when component mounts
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_S6_BACKEND}/api/v1/suppliers`);
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  // Fetch institutions when supplier changes
  useEffect(() => {
    const fetchInstitutions = async () => {
      if (selectedSupplier) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_S6_BACKEND}/api/v1/buyers`, {
            params: { supplier_id: selectedSupplier }
          });
          setInstitutions(response.data);
        } catch (error) {
          console.error('Error fetching institutions:', error);
        }
      } else {
        setInstitutions([]);
      }
    };
    fetchInstitutions();
  }, [selectedSupplier]);

  const handleButtonClick = (buttonId) => {
    setActiveButton(activeButton === buttonId ? null : buttonId);
  };

  const handleSupplierChange = (event) => {
    const value = event.target.value;
    setSelectedSupplier(value);
    setSelectedInstitution(''); // Reset institution when supplier changes
    if (onSearch) {
      onSearch({ type: 'supplier', value });
    }
  };

  const handleInstitutionChange = (event) => {
    const value = event.target.value;
    setSelectedInstitution(value);
    if (onSearch) {
      onSearch({ type: 'institution', supplier: selectedSupplier, value });
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Estado section remains the same */}
      <Grid item xs={12} sm={12} md={3}>
        <Paper 
          className={`${classes.searchButton} ${activeButton === 'estado' ? classes.searchButtonActive : ''}`}
          elevation={0}
          onClick={() => handleButtonClick('estado')}
        >
          <MexicoIcon className={classes.icon} />
          <Box>
            <Typography className={classes.buttonText} variant="h6">
              Contrato por Estado
            </Typography>
            <Typography className={classes.subtitle}>
              Buscar contratos por entidad federativa
            </Typography>
          </Box>
        </Paper>
        <Collapse in={activeButton === 'estado'}>
          <Paper className={classes.controlsPanel}>
            <FormControl className={classes.formControl}>
              <InputLabel>Selecciona el estado</InputLabel>
              <Select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
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
          </Paper>
        </Collapse>
      </Grid>

      {/* Updated Institución section with new selects 
      <Grid item xs={12} sm={12} md={3}>
        <Paper 
          className={`${classes.searchButton} ${activeButton === 'empresa' ? classes.searchButtonActive : ''}`}
          elevation={0}
          onClick={() => handleButtonClick('empresa')}
        >
          <Business className={classes.icon} />
          <Box>
            <Typography className={classes.buttonText} variant="h6">
              Contrato por Institución o proveedor
            </Typography>
            <Typography className={classes.subtitle}>
              Buscar contratos por proveedor
            </Typography>
          </Box>
        </Paper>
        <Collapse in={activeButton === 'empresa'}>
          <Paper className={classes.controlsPanel}>
            <FormControl className={classes.formControl}>
              <InputLabel>Proveedor de información</InputLabel>
              <Select
                value={selectedSupplier}
                onChange={handleSupplierChange}
                label="Proveedor de información"
              >
                <MenuItem value="">
                  <em>Seleccione un proveedor</em>
                </MenuItem>
                {suppliers.map((supplier) => (
                  <MenuItem value={supplier.id} key={supplier.id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl className={classes.formControl}>
              <InputLabel>Institución</InputLabel>
              <Select
                value={selectedInstitution}
                onChange={handleInstitutionChange}
                label="Institución"
                disabled={!selectedSupplier}
              >
                <MenuItem value="">
                  <em>Seleccione una institución</em>
                </MenuItem>
                {institutions.map((institution) => (
                  <MenuItem value={institution.id} key={institution.id}>
                    {institution.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Collapse>
      </Grid>
*/}
      {/* Tipo section remains the same
      <Grid item xs={12} sm={12} md={3}>
        <Paper 
          className={`${classes.searchButton} ${activeButton === 'tipo' ? classes.searchButtonActive : ''}`}
          elevation={0}
          onClick={() => handleButtonClick('tipo')}
        >
          <Category className={classes.icon} />
          <Box>
            <Typography className={classes.buttonText} variant="h6">
              Contrato por Tipo
            </Typography>
            <Typography className={classes.subtitle}>
              Buscar por tipo de contratación
            </Typography>
          </Box>
        </Paper>
        <Collapse in={activeButton === 'tipo'}>
          <Paper className={classes.controlsPanel}>
            <FormGroup className={classes.checkboxGroup}>
              <FormControlLabel
                control={<Checkbox />}
                label="Licitación pública"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Adjudicación directa"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Invitación restringida"
              />
            </FormGroup>
          </Paper>
        </Collapse>
      </Grid>
 */}
      {/* ID section remains the same 
      <Grid item xs={12} sm={12} md={3}>
        <Paper 
          className={`${classes.searchButton} ${activeButton === 'id' ? classes.searchButtonActive : ''}`}
          elevation={0}
          onClick={() => handleButtonClick('id')}
        >
          <SearchOutlined className={classes.icon} />
          <Box>
            <Typography className={classes.buttonText} variant="h6">
              Contrato por ID, OCID 
            </Typography>
            <Typography className={classes.subtitle}>
              Búsqueda por identificador
            </Typography>
          </Box>
        </Paper>
        <Collapse in={activeButton === 'id'}>
          <Paper className={classes.controlsPanel}>
            <FormControl className={classes.formControl}>
              <TextField
                label="Ingrese ID o OCID"
                variant="outlined"
                fullWidth
                size="small"
              />
            </FormControl>
          </Paper>
        </Collapse>
      </Grid>
      */}
    </Grid>
  );
};

export default withStyles(styles)(SearchButtons);