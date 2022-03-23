import React from 'react';
import {FormControl, MenuItem, Select, InputLabel, Typography} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { ThemeProvider } from '@mui/material/styles';
import themeV2 from "../../ThemeV2";

const dataSuppliers = require("./suppliers.json");

const styles = theme => ({
    root: {
        paddingTop : theme.spacing(4),
    }
});

const SelectSupplier = props => {
    const {classes, dataSupplier, setDataSupplier} = props;
    const handleSetDataSupplier = e => setDataSupplier(e.target.value);

    return (
        <ThemeProvider theme={themeV2}>
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
                <Select value={dataSupplier} onChange={handleSetDataSupplier} label={'Selecciona el proveedor de información que deseas consultar'}>
                    {
                        dataSuppliers.map((s,i)=> {
                            return <MenuItem value={s.id} key={i}>
                                {s.name}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>

        {/*</Paper>*/}
    </div>
        </ThemeProvider>
    );
}

export default withStyles(styles)(SelectSupplier);