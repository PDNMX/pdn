import React from 'react';
import {FormControl, InputLabel, MenuItem, Paper, Select, Typography, withStyles} from "@material-ui/core";

const dataSuppliers = require("./suppliers.json");

const styles = theme => ({
    paper: {
        padding : theme.spacing(2),
        paddingBottom: theme.spacing(3),
        marginBottom: theme.spacing(2)
    }
});

const SelectSupplier = props => {
    const {classes, dataSupplier, setDataSupplier} = props;
    const handleSetDataSupplier = e => setDataSupplier(e.target.value);

    return <div>
        <Paper className={classes.paper} elevation={3}>
            <Typography paragraph>
                <b>Proveedor de información</b>
            </Typography>

            <FormControl fullWidth>
                <InputLabel>
                    Selecciona el proveedor de información que deseas consultar
                </InputLabel>
                <Select value={dataSupplier} onChange={handleSetDataSupplier}>
                    {
                        dataSuppliers.map((s,i)=> {
                            return <MenuItem value={s.id} key={i}>
                                {s.name}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>

        </Paper>
    </div>
}

export default withStyles(styles)(SelectSupplier);