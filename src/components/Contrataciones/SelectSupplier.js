import React from 'react';
import {FormControl, InputLabel, MenuItem, Paper, Select, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({
    paper:{
        padding : theme.spacing(2),
        paddingBottom: theme.spacing(3),
        marginBottom: theme.spacing(2)
    }
});

const suppliers = [
    {
        name: "Secretaría de Hacienda y Crédito Público",
        value: 1,
        disclaimer: "",
        download_url: ""
    },
    {
        name: "Banco de México",
        value: 2,
        disclaimer: "",
        download_url: ""
    }
]

const SelectSupplier = props => {
    const {classes, supplier, setSupplier} = props;
    const handleSetSupplier = e => setSupplier(e.target.value);

    return <div>
        <Paper className={classes.paper} elevation={3}>
            <Typography paragraph>
                <b>Proveedor de información</b>
            </Typography>

            <FormControl fullWidth>
                <InputLabel>
                    Selecciona el proveedor de información que deseas consultar
                </InputLabel>
                <Select value={supplier} onChange={handleSetSupplier}>
                    {
                        suppliers.map((s,i)=> {
                            return <MenuItem value={s.value}>
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