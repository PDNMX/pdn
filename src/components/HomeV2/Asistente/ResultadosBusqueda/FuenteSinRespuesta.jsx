import { Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

import { BoxAccordion, BoxAccordionSummary } from '../../../Sistema1/common/BoxAccordion'
import styles from '../../../style'

const useStyles = makeStyles()(styles)

const FuenteSinRespuesta = ({ p }) => {
  const { classes } = useStyles()

  return (
    <BoxAccordion square>
      <BoxAccordionSummary
        aria-disabled='true'
        sx={{
          pointerEvents: 'none',
          backgroundColor: '#f3f0e8 !important',
          borderColor: '#d8d0bc !important',
          color: '#8a857c !important'
        }}
      >
        <Grid container spacing={0} sx={{ width: '100%' }}>
          <Grid size={8}>
            <Typography className={classes.resultadosHeading}>{p.supplier_name}</Typography>
            {Array.isArray(p.levels) && p.levels.length > 0 && (
              <Typography className={classes.resultadosHeading}>[{p.levels.join(', ')}]</Typography>
            )}
          </Grid>
          <Grid size={4} />
        </Grid>
      </BoxAccordionSummary>
    </BoxAccordion>
  )
}

export default FuenteSinRespuesta
