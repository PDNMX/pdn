import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {OutlinedInput} from "@mui/material";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        marginLeft: 0,
        marginTop: 0,
        paddingTop: 0
        //minWidth: 120,
        //maxWidth: 300,
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const procedimientos = [
    {
        key: 1,
        value: 'Sistema6'
    },
    {
        key: 2,
        value: 'Concesiones'
    },
    {
        key: 3,
        value: 'Enajenaciones'
    },
    {
        key: 4,
        value: 'Dictámenes'
    }
];

const TipoProcedimiento = props => {
    const classes = useStyles();
    const {tipoProcedimiento, asignarTipoProcedimiento} = props;

    const handleChange = event => {
        asignarTipoProcedimiento(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-mutiple-checkbox-label">Procedimientos</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={tipoProcedimiento}
                    onChange={handleChange}
                    input={<OutlinedInput label="Procedimientos"/>}
                    renderValue={selected => selected.map(e => e.value).join(', ')}
                    MenuProps={MenuProps}
                    fullWidth
                >
                    {procedimientos.map((p, i) => (
                        <MenuItem key={i} value={p}>
                            <Checkbox checked={
                                typeof tipoProcedimiento.find(proc => proc.key === p.key) !== 'undefined'
                            } />
                            <ListItemText primary={p.value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default TipoProcedimiento;
