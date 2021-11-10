import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

export function BoxAccordion(props) {
  return <Accordion>{props.children}</Accordion>;
}

export function BoxAccordionSummary(props) {
  return <AccordionSummary {...props}>{props.children}</AccordionSummary>;
}

export function BoxAccordionDetails(props) {
  return <AccordionDetails {...props}>{props.children}</AccordionDetails>;
}
