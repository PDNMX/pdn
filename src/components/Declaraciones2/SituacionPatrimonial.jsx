import React from 'react';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';

import MenuLateral from './MenuLateral';
import DatosGenerales from './SituacionPatrimonial/01DatosGenerales';
import Domicilio from './SituacionPatrimonial/02Domicilio';
import DatosCurriculares from './SituacionPatrimonial/03DatosCurriculares';
import EmpleoCargoComision from './SituacionPatrimonial/04EmpleoCargoComision';
import ExperienciaLaboral from './SituacionPatrimonial/05ExperienciaLaboral';
import DatosPareja from './SituacionPatrimonial/06DatosPareja';
import DependientesEconomicos from './SituacionPatrimonial/07DatosDependienteEconomico';
import Ingresos from './SituacionPatrimonial/08Ingresos';
import ServidorAnioAnterior from './SituacionPatrimonial/09ServidorAnioAnterior';
import Bienesinmuebles from './SituacionPatrimonial/10Bienesinmuebles';
import Vehiculos from './SituacionPatrimonial/11Vehiculos';
import BienesMuebles from './SituacionPatrimonial/12BienesMuebles';
import Inversiones from './SituacionPatrimonial/13Inversiones';
import Adeudos from './SituacionPatrimonial/14Adeudos';
import Prestamo from './SituacionPatrimonial/15Prestamo';

import ErrorBoundary from './ErrorBoundary';

import { info } from './utils';
import style from './style';

const situacionPatrimonial = (data, tipo) => {
  let { datosCurricularesDeclarante, experienciaLaboral, bienesInmuebles, vehiculos, bienesMuebles, inversiones, adeudos, prestamoOComodato } = data;

  const onlyDec = i => i.titular.length === 1 && i.titular[0].clave === 'DEC';

  let bienInmueble, vehiculo, bienMueble, inversion, adeudo, tExperienciaLaboral, tprestamoOComodato;
  // let bienInmueble = bienesInmuebles.ninguno ? 0 : bienesInmuebles.bienInmueble.filter(onlyDec);
  // let vehiculo = vehiculos.ninguno ? 0 : vehiculos.vehiculo.filter(onlyDec);
  // let bienMueble = bienesMuebles.ninguno ? 0 : bienesMuebles.bienMueble.filter(onlyDec);
  // let inversion = inversiones.ninguno ? 0 : inversiones.inversion.filter(onlyDec);
  // let adeudo = adeudos.ninguno ? 0 : adeudos.adeudo.filter(onlyDec);

  if (bienesInmuebles) {
    if (bienesInmuebles.ninguno) {
      bienInmueble = 0;
    } else {
      bienInmueble = bienesInmuebles.bienInmueble ? bienesInmuebles.bienInmueble.filter(onlyDec) : 0;
    }
  } else {
    bienInmueble = 0;
  }

  if (vehiculos) {
    if (vehiculos.ninguno) {
      vehiculo = 0;
    } else {
      vehiculo = vehiculos.vehiculo ? vehiculos.vehiculo.filter(onlyDec) : 0;
    }
  } else {
    vehiculo = 0;
  }

  if (bienesMuebles) {
    if (bienesMuebles.ninguno) {
      bienMueble = 0;
    } else {
      bienMueble = bienesMuebles.bienMueble ? bienesMuebles.bienMueble.filter(onlyDec) : 0;
    }
  } else {
    bienMueble = 0;
  }

  if (typeof inversiones === 'undefined' || inversiones.ninguno) {
    inversion = 0;
  } else {
    inversion = inversiones.inversion ? inversiones.inversion.filter(onlyDec) : 0;
  }

  if (adeudos) {
    if (adeudos.ninguno) {
      adeudo = 0;
    } else {
      adeudo = adeudos.adeudo ? adeudos.adeudo.filter(onlyDec) : 0;
    }
  } else {
    adeudo = 0;
  }

  if (experienciaLaboral.ninguno) {
    tExperienciaLaboral = 0;
  } else {
    tExperienciaLaboral = experienciaLaboral.experiencia ? experienciaLaboral.experiencia.length : 0;
  }

  if (prestamoOComodato) {
    if (prestamoOComodato.ninguno) {
      tprestamoOComodato = 0;
    } else {
      tprestamoOComodato = prestamoOComodato.prestamo ? prestamoOComodato.prestamo.length : 0;
    }
  } else {
    tprestamoOComodato = 0;
  }

  const tDatosCurricurales = typeof datosCurricularesDeclarante === 'undefined' ? 0 : datosCurricularesDeclarante.escolaridad.length;

  // const tExperienciaLaboral = typeof experienciaLaboral === 'undefined' ? 0 : experienciaLaboral.experiencia.length;

  // const tprestamoOComodato = typeof prestamoOComodato === 'undefined' ? 0 : prestamoOComodato.prestamo.length;

  const menu = [
    { clave: 'DATOS GENERALES', valor: 0 },
    { clave: 'DOMICILIO DEL DECLARANTE', valor: 0 },
    {
      clave: 'DATOS CURRICULARES DEL DECLARANTE',
      valor: tDatosCurricurales
    },
    { clave: 'DATOS DEL EMPLEO, CARGO O COMISIÓN', valor: 0 },
    {
      clave: 'EXPERIENCIA LABORAL',
      valor: tExperienciaLaboral
    },
    { clave: 'DATOS DE LA PAREJA', valor: 0 },
    { clave: 'DATOS DEL DEPENDIENTE ECONÓMICO', valor: 0 },
    {
      clave: 'INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS',
      valor: 0
    },
    {
      clave: '¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR?',
      valor: 0
    },
    { clave: 'BIENES INMUEBLES', valor: bienInmueble.length },
    { clave: 'VEHÍCULOS', valor: vehiculo.length },
    { clave: 'BIENES MUEBLES', valor: bienMueble.length },
    {
      clave: 'INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES/ACTIVOS',
      valor: inversion.length
    },
    { clave: 'ADEUDOS/PASIVOS', valor: adeudo.length },
    {
      clave: 'PRÉSTAMO O COMODATO POR TERCEROS',
      valor: tprestamoOComodato
    }
  ];

  switch (tipo) {
    case 'INICIAL':
    case 'CONCLUSIÓN':
      return menu;
    case 'MODIFICACIÓN':
      return menu.filter((op, index) => index !== 8);
    default:
      info('Tipo declaración: ' + tipo);
      break;
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.opaque
  }
}));

const styles = makeStyles(style);

const titulos = {
  INICIAL: [
    '1. DATOS GENERALES',
    '2. DOMICILIO DEL DECLARANTE',
    '3. DATOS CURRICULARES DEL DECLARANTE',
    '4. DATOS DEL EMPLEO, CARGO O COMISIÓN QUE INICIA',
    '5. EXPERIENCIA LABORAL (ÚLTIMOS CINCO EMPLEOS)',
    '6. DATOS DE LA PAREJA',
    '7. DATOS DEL DEPENDIENTE ECONÓMICO',
    '8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (SITUACIÓN ACTUAL)',
    '9. ¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR?',
    '10. BIENES INMUEBLES (SITUACIÓN ACTUAL)',
    '11. VEHÍCULOS (SITUACIÓN ACTUAL)',
    '12. BIENES MUEBLES (SITUACIÓN ACTUAL)',
    '13. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES/ACTIVOS (SITUACIÓN ACTUAL)',
    '14. ADEUDOS/PASIVOS (SITUACIÓN ACTUAL)',
    '15. PRÉSTAMO O COMODATO POR TERCEROS (SITUACIÓN ACTUAL)'
  ],
  MODIFICACIÓN: [
    '1. DATOS GENERALES',
    '2. DOMICILIO DEL DECLARANTE',
    '3. DATOS CURRICULARES DEL DECLARANTE',
    '4. DATOS DEL EMPLEO, CARGO O COMISIÓN ACTUAL',
    '5. EXPERIENCIA LABORAL (ÚLTIMOS CINCO EMPLEOS)',
    '6. DATOS DE LA PAREJA',
    '7. DATOS DEL DEPENDIENTE ECONÓMICO',
    '8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (ENTRE EL 1 DE ENERO Y 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR)',
    '9. BIENES INMUEBLES (ENTRE EL 1 DE ENERO Y 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR)',
    '10. VEHÍCULOS (ENTRE EL 1 DE ENERO Y 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR)',
    '11. BIENES MUEBLES (ENTRE EL 1 DE ENERO Y 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR)',
    '12. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES/ACTIVOS (ENTRE EL 1 DE ENERO Y 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR)',
    '13. ADEUDOS/PASIVOS (ENTRE EL 1 DE ENERO Y 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR)',
    '14. PRÉSTAMO O COMODATO POR TERCEROS (ENTRE EL 1 DE ENERO Y 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR)'
  ],
  CONCLUSIÓN: [
    '1. DATOS GENERALES',
    '2. DOMICILIO DEL DECLARANTE',
    '3. DATOS CURRICULARES DEL DECLARANTE',
    '4. DATOS DEL EMPLEO, CARGO O COMISIÓN QUE CONCLUYE',
    '5. EXPERIENCIA LABORAL (ÚLTIMOS CINCO EMPLEOS)',
    '6. DATOS DE LA PAREJA',
    '7. DATOS DEL DEPENDIENTE ECONÓMICO',
    '8. INGRESOS NETOS DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS',
    '9. ¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR?',
    '10. BIENES INMUEBLES (SITUACIÓN ACTUAL)',
    '11. VEHÍCULOS (SITUACIÓN ACTUAL)',
    '12. BIENES MUEBLES',
    '13. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES/ACTIVOS (SITUACIÓN ACTUAL)',
    '14. ADEUDOS/PASIVOS (SITUACIÓN ACTUAL)',
    '15. PRÉSTAMO O COMODATO POR TERCEROS (SITUACIÓN ACTUAL)'
  ]
};

function OpcionInicialConclusion(valor, data, tipo) {
  const titulo = titulos[tipo][valor];
  switch (valor) {
    case 0:
      return <DatosGenerales data={data.datosGenerales} titulo={titulo} />;
    case 1:
      return <Domicilio titulo={titulo} />;
    case 2:
      return <DatosCurriculares data={data.datosCurricularesDeclarante} titulo={titulo} />;
    case 3:
      return <EmpleoCargoComision data={data.datosEmpleoCargoComision} titulo={titulo} />;
    case 4:
      return <ExperienciaLaboral data={data.experienciaLaboral} titulo={titulo} />;
    case 5:
      return <DatosPareja titulo={titulo} />;
    case 6:
      return <DependientesEconomicos titulo={titulo} />;
    case 7:
      return <Ingresos data={data.ingresos} tipo={tipo} titulo={titulo} />;
    case 8:
      return <ServidorAnioAnterior data={data.actividadAnualAnterior} titulo={titulo} />;
    case 9:
      return <Bienesinmuebles data={data.bienesInmuebles} titulo={titulo} />;
    case 10:
      return <Vehiculos data={data.vehiculos} titulo={titulo} />;
    case 11:
      return <BienesMuebles data={data.bienesMuebles} titulo={titulo} />;
    case 12:
      return <Inversiones data={data.inversiones} tipo={tipo} titulo={titulo} />;
    case 13:
      return <Adeudos data={data.adeudos} tipo={tipo} titulo={titulo} />;
    case 14:
      return <Prestamo data={data.prestamoOComodato} titulo={titulo} />;
    default:
      break;
  }
}

function OpcionModificacion(valor, data, tipo) {
  const titulo = titulos[tipo][valor];
  switch (valor) {
    case 0:
      return <DatosGenerales data={data.datosGenerales} titulo={titulo} />;
    // return (
    // 	<ErrorBoundary seccion={'DatosGenerales'}>
    // 		<DatosGenerales data={data.datosGenerales1} titulo={titulo} />
    // 	</ErrorBoundary>
    // );
    case 1:
      return <Domicilio titulo={titulo} />;
    case 2:
      return <DatosCurriculares data={data.datosCurricularesDeclarante} titulo={titulo} />;
    case 3:
      return <EmpleoCargoComision data={data.datosEmpleoCargoComision} titulo={titulo} />;
    case 4:
      return <ExperienciaLaboral data={data.experienciaLaboral} titulo={titulo} />;
    case 5:
      return <DatosPareja titulo={titulo} />;
    case 6:
      return <DependientesEconomicos titulo={titulo} />;
    case 7:
      return <Ingresos data={data.ingresos} tipo={tipo} titulo={titulo} />;
    case 8:
      return <Bienesinmuebles data={data.bienesInmuebles} titulo={titulo} />;
    case 9:
      return <Vehiculos data={data.vehiculos} titulo={titulo} />;
    case 10:
      return <BienesMuebles data={data.bienesMuebles} titulo={titulo} />;
    case 11:
      return <Inversiones data={data.inversiones} tipo={tipo} titulo={titulo} />;
    case 12:
      return <Adeudos data={data.adeudos} tipo={tipo} titulo={titulo} />;
    case 13:
      return <Prestamo data={data.prestamoOComodato} titulo={titulo} />;
    default:
      break;
  }
}

function opcion(valor, data, tipo) {
  switch (tipo) {
    case 'INICIAL':
      return OpcionInicialConclusion(valor, data, tipo);
    case 'MODIFICACIÓN':
      return OpcionModificacion(valor, data, tipo);
    case 'CONCLUSIÓN':
      return OpcionInicialConclusion(valor, data, tipo);
    default:
      info('Tipo declaración: ' + tipo);
      break;
  }
}

export default function MenuSuperior({ data, value, setValue, tipo }) {
  const classes = useStyles();
  const classes2 = styles();

  return (
    <Paper square className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2} className={classes2.menulateral_fondo}>
          <MenuLateral value={value} setValue={setValue} opciones={situacionPatrimonial(data, tipo)} />
        </Grid>
        <Grid item xs={12} md={10}>
          <ErrorBoundary>{opcion(value, data, tipo)}</ErrorBoundary>
        </Grid>
      </Grid>
    </Paper>
  );
}
