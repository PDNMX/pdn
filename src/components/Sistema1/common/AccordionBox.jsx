import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import style from '../../style'
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(style);

export function BoxAccordion (props) {
  const id = React.useId()

  // MUI links the summary and the region through these ids. Without them every
  // accordion in the page reused the same hardcoded id.
  return (
    <Accordion>
      {React.Children.map(props.children, child =>
        React.isValidElement(child) && child.type === BoxAccordionSummary
          ? React.cloneElement(child, { id: `${id}-header`, 'aria-controls': `${id}-content` })
          : child
      )}
    </Accordion>
  )
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
