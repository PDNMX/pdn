import React from 'react';
import withStyles from '@mui/styles/withStyles';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
//import NativeSelect from "@mui/material/NativeSelect";
//import InputBase from "@mui/material/InputBase";
import {Box, Grid, Select, MenuItem, TextField, Button } from '@mui/material';
import ReactGA from "react-ga";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    button:{
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    item: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
});

const SearchControls = props => {

    const {classes, buyers, buyer_id, procurementMethod, cycle, cycles, inputText, supplierName} = props;

    //const [age, setAge] = React.useState('');
    const handleChangeBuyer = event => {
        props.setBuyer(event.target.value);
    };

    const handleChangeProcurementMethod = event => {
        props.setProcurementMethod(event.target.value);
    };

    const handleChangeSupplierName = event => {
        props.setSupplierName(event.target.value);
    };

    const handleSetInputText = event => {
        props.setInputText(event.target.value);
    };

    const handleChangeCycle = event => {
        props.setCycle(event.target.value);
    };

    const handleSearch = e => {
        if (e.key === 'Enter'){
            props.search();
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item  xs={12} sm={12} md={4} lg={6} xl={6}  className={classes.item}>

                    <form className={classes.root} autoComplete="off">
                        {/*<FormControl className={classes.margin}>
                            <InputLabel htmlFor="age-customized-input">Age</InputLabel>
                                    <BootstrapInput id="age-customized-input" />
                                </FormControl>
                                */}

                        <FormControl fullWidth>
                            <InputLabel htmlFor="age-customized-native-simple">Institución</InputLabel>
                            <Select
                                value={buyer_id}
                                onChange={handleChangeBuyer}
                                label = {'Institución'}
                                //input={<BootstrapInput name="buyer" id="age-customized-native-simple"/>}
                            >
                                <MenuItem value="any"><em>Todas</em></MenuItem>
                                {
                                    buyers.map((b,i)=>{
                                        return <MenuItem key={i} value={b.id}>{b.name}</MenuItem>
                                    })

                                }
                            </Select>
                        </FormControl>

                    </form>

                </Grid>

                <Grid item  xs={12} sm={12} md={4} lg={3} xl={3}  className={classes.item}>
                    <form className={classes.root}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="age-customized-select">Tipo de contratación</InputLabel>
                            <Select
                                value={procurementMethod}
                                onChange={handleChangeProcurementMethod}
                                //input={<BootstrapInput name="age" id="age-customized-select" />}
                                label = {'Tipo de contratación'}
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

                <Grid item xs={12} sm={12} md={4} lg={3} xl={3} className={classes.item}>

                    <form className={classes.root}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="age-customized-select">Ciclo</InputLabel>
                            <Select
                                value={cycle}
                                onChange={handleChangeCycle}
                                //input={<BootstrapInput name="age" id="age-customized-select" />}
                                label = {'Ciclo'}
                            >
                                <MenuItem value="any">
                                    <em>Cualquiera</em>
                                </MenuItem>
                                {
                                    cycles.map((c,i) => <MenuItem value={c} key={i}>{c}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </form>

                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <TextField
                        id="outlined-full-width1"
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
                        value={supplierName}
                    />
                </Grid>

                <Grid item xs={12} className={classes.item }>
                    <TextField
                        id="outlined-full-width2"
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
                        value={inputText}
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
                    <Box m={0} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="contained" color="secundario" className={classes.button} onClick={props.cleanup}>
                            Limpiar
                        </Button>

                        <Button variant="contained" color="secundario" className={classes.button} 
                                onClick={e => {
                                    props.search(e.target.value);
                                    ReactGA.event({ category: 'busqueda-s6', action: 'click' });
                                  }}
                        >
                            Buscar
                        </Button>
                    </Box>

                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(SearchControls);
