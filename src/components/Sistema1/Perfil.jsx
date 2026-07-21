import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { withStyles } from 'tss-react/mui';

import MenuSuperior from './MenuSuperior';
import SituacionPatrimonial from './SituacionPatrimonial';
import Intereses from './Intereses';
import styles from '../style';
import { getMoneda } from './utils';

import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import basicInicial from './SituacionPatrimonial/00_basic_incial';

class Perfil extends React.Component {
  state = {
    menuSuperior: 0,
    menuSituacionPatrimonial: 0,
    menuIntereses: 0
  };

  refPatrimonial = section => {
    this.patrimonial = section;
  };

  refIntereses = section => {
    this.intereses = section;
  };

  handleChangeMenuSuperior = (event, newValue) => {
    this.setState(prevSate => {
      return { ...prevSate, menuSuperior: newValue };
    });
  };

  handleChangeMenuSituacionPatrimonial = (event, newValue) => {
    this.setState(
      prevSate => {
        return { ...prevSate, menuSituacionPatrimonial: newValue };
      },
      () => {
        this.top?.scrollIntoView({ block: 'start' });
      }
    );
  };

  handleChangeMenuIntereses = (event, newValue) => {
    this.setState(
      prevSate => {
        return { ...prevSate, menuIntereses: newValue };
      },
      () => {
        this.top?.scrollIntoView({ block: 'start' });
      }
    );
  };

  calculoQuincenas = fechaTomaPosesion => {
    const [, mes, dia] = fechaTomaPosesion.split('-');
    const mesesRestantes = 12 - mes;
    const quincenasMesesRestantes = mesesRestantes * 2;

    const totalQuincenasRestantes = dia <= 15 ? quincenasMesesRestantes + 2 : quincenasMesesRestantes + 1;

    return totalQuincenasRestantes;
  };

  getTitleIngresos = tipo => {
    switch (tipo) {
      case 'INICIAL':
        return 'INGRESO MENSUAL:';
      case 'MODIFICACIÓN':
      case 'MODIFICACION':
        return 'INGRESO ANUAL:';
      case 'CONCLUSIÓN':
      case 'CONCLUSION':
        return 'INGRESO DE CONCLUSIÓN:';
      default:
        return 'DECLARACIÓN NO DEFINIDA:';
    }
  };

  getIngresos = data => {
    switch (data.metadata.tipo) {
      case 'INICIAL':
        return getMoneda(data.declaracion.situacionPatrimonial.ingresos?.ingresoMensualNetoDeclarante?.valor);
      case 'MODIFICACIÓN':
      case 'MODIFICACION':
        return getMoneda(data.declaracion.situacionPatrimonial.ingresos?.ingresoAnualNetoDeclarante?.valor);
      case 'CONCLUSIÓN':
      case 'CONCLUSION':
        return getMoneda(data.declaracion.situacionPatrimonial.ingresos?.ingresoConclusionNetoDeclarante?.valor);
      default:
        return 'Tipo de declaración no definida';
    }
  };

  render() {
    const { classes, data, handleGoBack, refPerfil } = this.props;

    const datosGenerales = {
      ...basicInicial.datosGenerales,
      ...data.declaracion.situacionPatrimonial.datosGenerales
    };

    const tipo = data.metadata.tipo;

    return (
      <Paper className={classes.paper_search} elevation={15}>
        <Grid container spacing={0} className={classes.perfilRoot} ref={refPerfil}>
          <Grid
            style={{ textAlign: 'right', paddingBottom: '20px' }}
            size={{
              xs: 12,
              md: 12
            }}>
            <Button className={classes.btnBack} onClick={() => handleGoBack()} startIcon={<ArrowBackIosIcon />}>
              Regresar
            </Button>
          </Grid>
          <Grid
            size={{
              xs: false,
              md: 8
            }} />
          <Grid
            className={classes.cuadroActualizacion}
            size={{
              xs: 12,
              md: 4
            }}
            sx={{
              textAlign: 'center'
            }}>
            Actualización: {data.metadata.actualizacion}
          </Grid>
          <Grid size={12}>
            <Paper className={classes.paper_perfil} elevation={10}>
              <Grid container spacing={1}>
                <Grid
                  size={{
                    xs: 12,
                    md: 6
                  }}>
                  <Typography variant='h5' component='h3' className={classes.tituloCard}>
                    {datosGenerales.nombre} {datosGenerales.primerApellido} {datosGenerales.segundoApellido}
                  </Typography>
                  <Typography className={classes.dataCard}>{datosGenerales.correoElectronico.institucional}</Typography>
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 3
                  }}>
                  <Typography variant='h5' component='h3' className={classes.tituloCard}>
                    TIPO DE DECLARACIÓN
                  </Typography>
                  <Typography className={classes.dataCard}>{tipo}</Typography>
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 3
                  }}>
                  <Typography variant='h5' component='h3' className={classes.tituloCard}>
                    {this.getTitleIngresos(data.metadata.tipo)}
                  </Typography>
                  <Typography className={classes.dataCard}>{this.getIngresos(data)}</Typography>
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 6
                  }}>
                  <Typography variant='h5' component='h3' className={classes.tituloCard}>
                    DEPENDENCIA:
                  </Typography>
                  <Typography className={classes.dataCard}>{data.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico}</Typography>
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 3
                  }}>
                  <Typography variant='h5' component='h3' className={classes.tituloCard}>
                    ÁREA DE ADSCRIPCIÓN:
                  </Typography>
                  <Typography className={classes.dataCard}>{data.declaracion.situacionPatrimonial.datosEmpleoCargoComision.areaAdscripcion}</Typography>
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 3
                  }}>
                  <Typography variant='h5' component='h3' className={classes.tituloCard}>
                    ENCARGO ACTUAL:
                  </Typography>
                  <Typography className={classes.dataCard}>{data.declaracion.situacionPatrimonial.datosEmpleoCargoComision.empleoCargoComision}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          className={classes.perfilRoot}
          ref={section => {
            this.top = section;
          }}
        >
          <MenuSuperior menuSuperior={this.state.menuSuperior} handleChangeMenuSuperior={this.handleChangeMenuSuperior} />
          {this.state.menuSuperior ? <Intereses value={this.state.menuIntereses} setValue={this.handleChangeMenuIntereses} data={data.declaracion.interes} tipo={data.metadata.tipo} /> : <SituacionPatrimonial value={this.state.menuSituacionPatrimonial} setValue={this.handleChangeMenuSituacionPatrimonial} data={data.declaracion.situacionPatrimonial} tipo={data.metadata.tipo} />}
          <Grid
            style={{ textAlign: 'right', paddingTop: '20px' }}
            size={{
              xs: 12,
              md: 12
            }}>
            <Button className={classes.btnBack} onClick={() => handleGoBack()} startIcon={<ArrowBackIosIcon />}>
              Regresar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(Perfil, styles);
