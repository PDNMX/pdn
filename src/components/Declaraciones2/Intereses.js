import React from 'react';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';

import MenuLateral from './MenuLateral';

import Participacion from './Intereses/01Participacion';
import TomaDecisiones from './Intereses/02TomaDecisiones';
import ApoyosBeneficiosPublicos from './Intereses/03ApoyosBeneficiosPublicos';
import Representacion from './Intereses/04Representacion';
import ClientesPrincipales from './Intereses/05ClientesPrincipales';
import BeneficiosPrivados from './Intereses/06BeneficiosPrivados';
import Fideicomisos from './Intereses/07Fideicomisos';
import { Disclaimer } from './utils';

import ErrorBoundary from './ErrorBoundary';
import style from './style';

const onlyDec = i => i.titular && i.titular.length === 1 && i.titular[0].clave === 'DEC';

const Menu = data => {
  let { participacion, participacionTomaDecisiones, apoyos, representacion, clientesPrincipales, beneficiosPrivados, fideicomisos } = data;

  let participaciones, tomaDeciones, apoyo, representaciones, cliente, beneficio, fideicomiso;

  // const participaciones = participacion.ninguno ? 0 : participacion.participacion.length;
  // const tomaDeciones = participacionTomaDecisiones.ninguno ? 0 : participacionTomaDecisiones.participacion.length;
  // const apoyo = apoyos.ninguno ? 0 : apoyos.apoyo.length;
  // const representaciones = representacion.ninguno ? 0 : representacion.representacion.length;
  // const cliente = clientesPrincipales.ninguno ? 0 : clientesPrincipales.cliente.length;
  // const beneficio = beneficiosPrivados.ninguno ? 0 : beneficiosPrivados.beneficio.length;
  // const fideicomiso = fideicomisos.ninguno ? 0 : fideicomisos.fideicomiso.length;

  if (participacion.ninguno) {
    participaciones = 0;
  } else {
    participaciones = participacion.participacion ? participacion.participacion.filter(onlyDec) : 0;
    participaciones = participaciones.length !== 0 ? participaciones : participacion.participacion;
  }

  if (participacionTomaDecisiones.ninguno) {
    tomaDeciones = 0;
  } else {
    tomaDeciones = participacionTomaDecisiones.participacion ? participacionTomaDecisiones.participacion.filter(onlyDec) : 0;
  }

  if (apoyos.ninguno) {
    apoyo = 0;
  } else {
    apoyo = apoyos.apoyo ? apoyos.apoyo.filter(onlyDec) : 0;
  }

  if(representacion)
  if (representacion.ninguno) {
    representaciones = 0;
  } else {
    representaciones = representacion.representacion ? representacion.representacion.filter(onlyDec) : 0;
  }

  if (clientesPrincipales.ninguno) {
    cliente = 0;
  } else {
    cliente = clientesPrincipales.cliente ? clientesPrincipales.cliente.filter(onlyDec) : 0;
  }

  if (beneficiosPrivados.ninguno) {
    beneficio = 0;
  } else {
    beneficio = beneficiosPrivados.beneficio ? beneficiosPrivados.beneficio.filter(onlyDec) : 0;
  }

  if (fideicomisos.ninguno) {
    fideicomiso = 0;
  } else {
    fideicomiso = fideicomisos.fideicomiso ? fideicomisos.fideicomiso.filter(onlyDec) : 0;
  }

  return [
    {
      clave: 'PARTICIPACIÓN EN EMPRESAS, SOCIEDADES O ASOCIACIONES',
      valor: participaciones.length
    },
    {
      clave: '¿PARTICIPA EN LA TOMA DE DECISIONES DE ALGUNA DE ESTAS INSTITUCIONES?',
      valor: tomaDeciones.length
    },
    { clave: 'APOYOS O BENEFICIOS PÚBLICOS', valor: apoyo.length },
    { clave: 'REPRESENTACIÓN', valor: representaciones?representaciones.length:0 },
    { clave: 'CLIENTES PRINCIPALES', valor: cliente.length },
    { clave: 'BENEFICIOS PRIVADOS', valor: beneficio.length },
    { clave: 'FIDEICOMISOS', valor: fideicomiso.length }
  ];
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.opaque
  }
}));

const styles = makeStyles(style);

function opcion(valor, data) {
  let { participacion, participacionTomaDecisiones, apoyos, representacion, clientesPrincipales, beneficiosPrivados, fideicomisos } = data;

  switch (valor) {
    case 0:
      return <Participacion data={participacion} />;
    case 1:
      return <TomaDecisiones data={participacionTomaDecisiones} />;
    case 2:
      return <ApoyosBeneficiosPublicos data={apoyos} />;
    case 3:
      return <Representacion data={representacion} />;
    case 4:
      return <ClientesPrincipales data={clientesPrincipales} />;
    case 5:
      return <BeneficiosPrivados data={beneficiosPrivados} />;
    case 6:
      return <Fideicomisos data={fideicomisos} />;

    default:
      break;
  }
}

export default function MenuSuperior({ data, value, setValue }) {
  const classes = useStyles();
  const classes2 = styles();

  let { participacion, participacionTomaDecisiones, apoyos, representacion, clientesPrincipales, beneficiosPrivados, fideicomisos } = data;

  const tipoRelacion = i => i.tipoRelacion === 'DECLARANTE';

  if (participacion.ninguno) {
    data.participacion.participacion = [];
  } else {
    data.participacion.participacion = participacion.participacion ? participacion.participacion.filter(tipoRelacion) : [];
  }

  if (participacionTomaDecisiones.ninguno) {
    data.participacionTomaDecisiones.participacion = [];
  } else {
    data.participacionTomaDecisiones.participacion = participacionTomaDecisiones.participacion ? participacionTomaDecisiones.participacion.filter(onlyDec) : [];
  }

  if (apoyos.ninguno) {
    data.apoyos.apoyo = [];
  } else {
    data.apoyos.apoyo = apoyos.apoyo ? apoyos.apoyo.filter(i => i.beneficiarioPrograma.clave === 'DEC') : [];
  }

  if(representacion)
  if (representacion.ninguno) {
    data.representacion.representacion = [];
  } else {
    data.representacion.representacion = representacion.representacion ? representacion.representacion.filter(tipoRelacion) : [];
  }

  if (clientesPrincipales.ninguno) {
    data.clientesPrincipales.cliente = [];
  } else {
    data.clientesPrincipales.cliente = clientesPrincipales.cliente ? clientesPrincipales.cliente.filter(onlyDec) : [];
  }

  if (beneficiosPrivados.ninguno) {
    data.beneficiosPrivados.beneficio = [];
  } else {
    data.beneficiosPrivados.beneficio = beneficiosPrivados.beneficio ? beneficiosPrivados.beneficio.filter(i => i.beneficiario.length === 1 && i.beneficiario[0].clave === 'DC') : [];
  }

  if (fideicomisos.ninguno) {
    data.fideicomisos.fideicomiso = [];
  } else {
    data.fideicomisos.fideicomiso = fideicomisos.fideicomiso ? fideicomisos.fideicomiso.filter(onlyDec) : [];
  }

  // data.participacion.participacion = participacion.ninguno ? 0 : participacion.participacion.filter(tipoRelacion);
  // data.participacionTomaDecisiones.participacion = participacionTomaDecisiones.ninguno ? 0 : participacionTomaDecisiones.participacion.filter(tipoRelacion);
  // data.apoyos.apoyo = apoyos.ninguno ? 0 : apoyos.apoyo.filter((i) => i.beneficiarioPrograma.clave === 'DEC');
  // data.representacion.representacion = representacion.ninguno	? 0	: representacion.representacion.filter(tipoRelacion);
  // data.clientesPrincipales.cliente = clientesPrincipales.ninguno ? 0	: clientesPrincipales.cliente.filter(tipoRelacion);
  // data.beneficiosPrivados.beneficio = beneficiosPrivados.ninguno ? 0	: beneficiosPrivados.beneficio.filter((i) => i.beneficiario.length === 1 && i.beneficiario[0].clave === 'DC');
  // data.fideicomisos.fideicomiso = fideicomisos.ninguno ? 0 : fideicomisos.fideicomiso.filter(tipoRelacion);

  return data ? (
    <Paper square className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2} className={classes2.menulateral_fondo}>
          <MenuLateral value={value} setValue={setValue} opciones={Menu(data)} />
        </Grid>
        <Grid item xs={12} md={10}>
          <ErrorBoundary>{opcion(value, data)}</ErrorBoundary>
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <Disclaimer />
  );
}
