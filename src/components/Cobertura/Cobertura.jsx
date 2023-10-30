import React from 'react';
import {Typography,Box, Link, Grid, Tab, Tabs} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes";
import estados from "./estados.json";
import PropTypes from "prop-types";
import DialogoNoConectado from './DialogoNoConectado';

import withStyles from "@mui/styles/withStyles";
const styles = theme => ({
    estado: {
        width:"150px", borderStyle: 'solid', border: '1px', borderRadius: 10, color: '#ae95a9',
        background: theme.palette.background.default
    },
    link:{
        textDecoration: 'none'
    },
    tab: {
        borderRadius: "10px 10px 0 0",
    },
    tabPanel1: {
        background: theme.palette.background.opaque,
        borderRadius: "0 10px 10px 10px",
        borderStyle: 'solid',
        borderColor: theme.palette.primary.main
        //border: "2px",
    },
    tabPanel2: {
        background: theme.palette.background.opaque,
        borderRadius: "0 10px 10px 10px",
        borderStyle: 'solid',
        //border: "2px",
        borderColor: theme.palette.primary.main
    },
});


const Cobertura = props => {
    const section = pdnRoutes.find(r => r.path === '/cobertura');
    const {classes} = props;

    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleClick = () => {
        setOpen(true);
    }

    const tabStyle = selected => ({
        background: selected ? '#b25fac' : '#f2f0f2',
        border: selected ? "solid": "",
        borderColor: selected ? "#583171" : ""
    });

    return (<div>
            <HeaderV2 section={section}/>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} style={{maxWidth: 1200}}>


                    <Tabs value={value} onChange={handleChange}>
                        <Tab label={<Typography color={value == 0 ? "#f1e9f2" : "#713972"}>Entidades conectadas</Typography>}
                             id="simple-tab-0" aria-controls="simple-tabpanel-0"
                             className={classes.tab} style={tabStyle(value === 0 )}/>
                        <Tab label={<Typography color={value == 0 ? "#713972" : "#f1e9f2"}>Entidades no conectadas</Typography>}
                             id="simple-tab-1" aria-controls="simple-tabpanel-1"
                             className={classes.tab} sx={tabStyle(value === 1)}/>
                    </Tabs>


                    <TabPanel value={value} index={0} className={classes.tabPanel1}>
                        {/*<Paper elevation={15}>*/}
                        <Box display="flex" flexWrap="wrap">
                            {estados.filter(e => !e.disabled).map( (e, i) => {
                                //const icon = import (`../../../src/assets`)
                                return <Box textAlign="center" p={1} m={1} key={i} className={classes.estado}>
                                    <Link component={RouterLink} to={e.route} className={classes.link}>
                                        <img src={`../../../src/assets/Cobertura/ico_edos/${e.icon1}`} style={{width: 100}} alt="Estado"/>
                                        <Typography>{e.name}</Typography>
                                    </Link>
                                </Box>
                            })
                            }
                        </Box>
                        {/*</Paper>*/}
                    </TabPanel>

                    <TabPanel value={value} index={1} className={classes.tabPanel2}>
                        <Box display="flex" flexWrap="wrap">
                            {estados.filter(e => e.disabled).map( (e, i) =>{
                                return <Box textAlign="center" p={1} m={1} key={i}
                                            className={classes.estado} sx={{cursor: 'pointer'}} onClick={handleClick}>
                                    <img src={`../../../src/assets/Cobertura/ico_edos/${e.icon1}`} style={{width: 100}} alt="Estado"/>
                                    <Typography>
                                        {e.name}
                                    </Typography>
                                </Box>

                            })
                            }
                        </Box>
                    </TabPanel>

                </Grid>
            </Grid>
            <DialogoNoConectado open={open} setOpen={setOpen}/>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default withStyles(styles)(Cobertura);
