import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    buyer: {
       // marginRight: theme.spacing(3)
        //paddingRight: theme.spacing(2)
    },
    procurementMethod: {
        //marginBottom: theme.spacing(3)
        //paddingLeft: theme.spacing(2)
    },
    button:{
        background: '#ffe01b',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    item: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
});

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

class SearchControls extends React.Component{

    render() {

        const {classes, buyers, buyer, procurementMethod} = this.props;

        //const [age, setAge] = React.useState('');
        const handleChangeBuyer = event => {
            this.props.setBuyer(event.target.value);
        };

        const handleChangeProcurementMethod = event => {
            this.props.setProcurementMethod(event.target.value);
        };

        const handleChangeSupplierName = event => {
          this.props.setSupplierName(event.target.value);
        };

        const handleSetInputText = event => {
          this.props.setInputText(event.target.value);
        };

        const handleSearch = e => {
            if (e.key === 'Enter'){
                this.props.search();
            }
        };

        return (

            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={6} className={classes.item}>



                        <form className={classes.root} autoComplete="off">
                            {/*<FormControl className={classes.margin}>
                            <InputLabel htmlFor="age-customized-input">Age</InputLabel>
                                    <BootstrapInput id="age-customized-input" />
                                </FormControl>
                                */}

                            <FormControl className={classes.buyer}
                            fullWidth
                            >
                                <InputLabel htmlFor="age-customized-native-simple">Institución</InputLabel>
                                <NativeSelect
                                    value={buyer}
                                    onChange={handleChangeBuyer}
                                    //input={<BootstrapInput name="buyer" id="age-customized-native-simple"/>}
                                >
                                    <option value="any">Todas</option>
                                    {
                                        buyers.map((b,i)=>{
                                            return <option key={i} value={b.id}>{b.name}</option>
                                        })

                                    }
                                </NativeSelect>
                            </FormControl>

                        </form>

                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                        <form className={classes.root}>
                            <FormControl className={classes.procurementMethod}
                            fullWidth
                            >
                                <InputLabel htmlFor="age-customized-select">Tipo de contratación</InputLabel>
                                <Select
                                    value={procurementMethod}
                                    onChange={handleChangeProcurementMethod}
                                    //input={<BootstrapInput name="age" id="age-customized-select" />}
                                >
                                    <MenuItem value="any">
                                        <em>Cualquiera</em>
                                    </MenuItem>
                                    <MenuItem value="direct">Adjudicación directa</MenuItem>
                                    <MenuItem value="selective">Invitación a tres</MenuItem>
                                    <MenuItem value="open">Licitación pública</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <TextField
                            id="outlined-full-width"
                            label="Proveedor"
                            //style={{  margin : 8}}
                            placeholder="Escriba el nombre de un proveedor"
                            //helperText="Full width!"
                            fullWidth
                            margin="normal"
                            //variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChangeSupplierName}
                            onKeyDown={handleSearch}
                        />
                    </Grid>

                    <Grid item xs={12} className={classes.item }>
                        <TextField
                            id="outlined-full-width"
                            label="Frase de búsqueda"
                            //style={{  margin : 8}}
                            placeholder="Escriba la frase de búsqueda"
                            //helperText="Full width!"
                            fullWidth
                            margin="normal"
                            //variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleSetInputText}
                            onKeyDown={handleSearch}
                        />
                    </Grid>
                    {/*
                    <Grid item xs={6} className={classes.item}>
                        <form className={classes.root}>
                            <FormControl className={classes.procurementMethod}
                                         fullWidth
                            >
                                <InputLabel htmlFor="age-customized-select">Ordenar por</InputLabel>
                                <Select
                                    value={procurementMethod}
                                    onChange={handleChangeProcurementMethod}
                                    input={<BootstrapInput name="age" id="age-customized-select" />}
                                >
                                    <MenuItem value="any">
                                        <em>Ninguno</em>
                                    </MenuItem>
                                    <MenuItem value="amount">Monto</MenuItem>
                                    <MenuItem value="title">Título</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </Grid>*/}

                    <Grid item xs={12} className={classes.item}>
                        <Button variant="contained" className={classes.button} onClick={this.props.search}>Buscar</Button>
                    </Grid>
                </Grid>

            </div>
        );
    }

}


export default withStyles(styles)(SearchControls);