import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import style from '../style';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(style);

export function BoxAccordion(props) {
  return <Accordion>{props.children}</Accordion>;
}

export function BoxAccordionSummary(props) {
  const classes = useStyles();
  return (
    <AccordionSummary {...props} className={classes.resultadosTitulo}>
      {props.children}
    </AccordionSummary>
  );
}

export function BoxAccordionDetails(props) {
  const classes = useStyles();
  return (
    <AccordionDetails {...props} className={classes.resultadoContenido}>
      {props.children}
    </AccordionDetails>
  );
}
