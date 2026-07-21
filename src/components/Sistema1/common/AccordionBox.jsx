import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import style from '../../style'
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(style);

export function BoxAccordion (props) {
  return <Accordion>{props.children}</Accordion>
}

export function BoxAccordionSummary (props) {
  const { classes } = useStyles()
  return (
    <AccordionSummary {...props} className={classes.tituloResultados}>
      {props.children}
    </AccordionSummary>
  )
}

export function BoxAccordionDetails (props) {
  const { classes } = useStyles()
  return (
    <AccordionDetails {...props} className={classes.contenidoResultado}>
      {props.children}
    </AccordionDetails>
  )
}
