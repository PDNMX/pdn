import React, { useState } from 'react';
import withStyles from '@mui/styles/withStyles';

import { Button, Checkbox, FormControl, Grid, ListItemText, MenuItem, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const styles = theme => ({
  'formControl': {
    width: '100%'
  },
  '&$focus': {
    //color: theme.palette.black.color,
  },
  'centrado': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'progress': {
    position: 'fixed',
    margin: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  'desc': {
    color: theme.palette.text.contrastText
  },
  'container': {
    /* marginTop: '30px',
        marginBottom: '30px',*/
    overflowX: 'auto'
  },
  'section': {
    maxWidth: '1200px',
    overflowX: 'auto',
    padding: theme.spacing(1)
  },
  'button': {
    padding: theme.spacing(1),
    fontWeight: 'bold'
  }
});

const tiposSancion = [
  { label: 'Inhabilitado', value: 'I' },
  { label: 'Multado', value: 'M' },
  { label: 'Suspensión del empleo, cargo o comisión', value: 'S' },
  { label: 'Destitución del empleo, cargo o comisión', value: 'D' },
  { label: 'Indemnización resarcitoria', value: 'IRSC' },
  { label: 'Sanción económica', value: 'SE' },
  { label: 'Otro', value: 'O' }
];

const camposOrdenamiento = [
  { label: 'Nombre', value: 'nombres' },
  { label: 'Apellido Uno', value: 'primerApellido' },
  { label: 'Apellido Dos', value: 'segundoApellido' },
  { label: 'Institución', value: 'institucionDependencia' }
];

const tiposOrdenamiento = [
  { label: 'Ascendente', value: 'asc' },
  { label: 'Descendente', value: 'desc' }
];

const FormServidoresSancionados = ({ classes, handleForm, handleOrder, query, order, providersList, institutionsList }) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  return (
    <React.Fragment>
      <Grid item xs={12} md={2}>
        <TextField name='nombres' label='Nombre(s)' onChange={handleForm} value={query.nombres} margin='normal' />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField name='primerApellido' label='Apellido Uno' type='search' onChange={handleForm} value={query.primerApellido} margin='normal' />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl className={classes.formControl}>
          <TextField name='segundoApellido' label='Apellido Dos' type='search' onChange={handleForm} value={query.segundoApellido} margin='normal' />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl className={classes.formControl}>
          <TextField
            name='tipoSancion'
            margin='normal'
            select
            label={'Tipo sanción'}
            SelectProps={{
              multiple: true,
              renderValue: selected => selected.map(s => s.label).join(', '),
              onChange: handleForm,
              value: query.tipoSancion
            }}
          >
            <MenuItem disabled value={[]}>
              <em>Todos</em>
            </MenuItem>
            {tiposSancion.map(tipo => (
              <MenuItem key={tipo.value} value={tipo}>
                <Checkbox checked={query.tipoSancion.indexOf(tipo) > -1} />
                <ListItemText primary={tipo.label} />
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl className={classes.formControl}>
          <TextField name={'nivel'} margin='normal' select label={'Nivel'} value={query.nivel} onChange={handleForm}>
            <MenuItem value='any'>
              <em>Todos</em>
            </MenuItem>
            <MenuItem value={'Federal'} key={'Federal'}>
              {'Federal'}
            </MenuItem>
            <MenuItem value={'Estatal'} key={'Estatal'}>
              {'Estatal'}
            </MenuItem>
          </TextField>
        </FormControl>
      </Grid>
      <Grid item md={4} xs={12}>
        <FormControl className={classes.formControl}>
          <TextField name={'provider'} margin='normal' select label={'Proveedor información'} value={query.provider} onChange={handleForm}>
            <MenuItem value={'any'}>
              <em>Todos</em>
            </MenuItem>
            {providersList.map(item => {
              return (
                <MenuItem value={item.value} key={item.key}>
                  {item.label}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item md={6} xs={12}>
        <FormControl className={classes.formControl}>
          <TextField name={'institucionDependencia'} margin='normal' select label={'Institución'} value={query.institucionDependencia} onChange={handleForm}>
            <MenuItem value='any'>
              <em>Todas</em>
            </MenuItem>
            {institutionsList.map(item => {
              return (
                <MenuItem value={item.value} key={item.key}>
                  {item.label}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => setShowAdvancedSearch(prevState => !prevState)} color={'text'} startIcon={showAdvancedSearch ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
          Búsqueda avanzada
        </Button>
      </Grid>
      {showAdvancedSearch && (
        <React.Fragment>
          <Grid item xs={12} md={3}>
            <FormControl className={classes.formControl}>
              <TextField name={'orderCamp'} margin='normal' select label={'Ordenar por'} value={order.orderCamp} onChange={handleOrder}>
                <MenuItem value={'any'}>
                  <em>Ninguno</em>
                </MenuItem>
                {camposOrdenamiento.map(tipo => {
                  return (
                    <MenuItem key={tipo.value} value={tipo.value}>
                      <ListItemText primary={tipo.label} />
                    </MenuItem>
                  );
                })}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl className={classes.formControl}>
              <TextField name={'orderType'} margin='normal' select label={'Tipo ordenamiento'} value={order.orderType} onChange={handleOrder}>
                <MenuItem value={'any'}>
                  <em>Ninguno</em>
                </MenuItem>
                {tiposOrdenamiento.map(tipo => {
                  return (
                    <MenuItem key={tipo.value} value={tipo.value}>
                      <ListItemText primary={tipo.label} />
                    </MenuItem>
                  );
                })}
              </TextField>
            </FormControl>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(FormServidoresSancionados);
