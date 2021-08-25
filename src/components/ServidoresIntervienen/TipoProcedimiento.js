import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

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
        value: 'Contrataciones'
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
                    input={<Input />}
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
