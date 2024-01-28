import { FormControl, MenuItem, Select, InputLabel } from '@mui/material'
import withStyles from '@mui/styles/withStyles'

// const dataSuppliers = require("./suppliers.json");

import dataSuppliers from './suppliers'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(4)
  },
  fondo: {
    background: theme.palette.background.noSelect
  }
})

const SelectSupplier = props => {
  const { classes, dataSupplier, setDataSupplier } = props
  const handleSetDataSupplier = e => setDataSupplier(e.target.value)

  return (
    <div className={classes.root}>
      {/*
            <Paper className={classes.paper} elevation={3}>
            <Typography paragraph>
                <b>Proveedor de información</b>
            </Typography>
            */}

      <FormControl fullWidth>
        <InputLabel>
          Selecciona el proveedor de información que deseas consultar
        </InputLabel>
        <Select className={classes.fondo} value={dataSupplier} onChange={handleSetDataSupplier} label='Selecciona el proveedor de información que deseas consultar'>
          {
                        dataSuppliers.map((s, i) => {
                          return (
                            <MenuItem value={s.id} key={i}>
                              {s.name}
                            </MenuItem>
                          )
                        })
                    }
        </Select>
      </FormControl>

      {/* </Paper> */}
    </div>
  )
}

export default withStyles(styles)(SelectSupplier)
