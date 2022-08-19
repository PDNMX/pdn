import React from 'react';
import {Typography,Box, Link, Grid, Paper, Tab, Tabs} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes";
import estados from "./estados.json";
import no_conectados from "./no_conectados.json";
import PropTypes from "prop-types";

import withStyles from "@mui/styles/withStyles";
const styles = theme => ({
    estado: {
        width:"150px", borderStyle: 'solid', border: '1px', borderRadius: 10, color: '#d3d3d3',
        background: theme.palette.background.opaque
    },
    link:{
        textDecoration: 'none'
    },
    tab: {
        //background: theme.palette.background.opaque,
        borderRadius: "10px 10px 0 0"
    },
    tabPanel1: {
        background: theme.palette.background.opaque,
        borderRadius: "0 10px 10px 10px"
    },
    tabPanel2: {
        background: theme.palette.background.opaque,
        borderRadius: "10px 10px 10px 10px"
    },
});

const handleClick = () => {
    //
    alert('No conectao')
}

const Cobertura = props => {
    const section = pdnRoutes.find(r => r.path === '/cobertura');
    const {classes} = props;

    const [value, setValue] = React.useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (<div>
            <HeaderV2 section={section}/>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} style={{maxWidth: 1200}}>


                    <Tabs value={value} onChange={handleChange}>
                        <Tab label={<Typography color="#d3d3d3">Entidades conectadas</Typography>} id="simple-tab-0" aria-controls="simple-tabpanel-0"
                             className={classes.tab} sx={{ background: value === 0 ? '#155065' : '#0d3b49'}}/>
                        <Tab label={<Typography color="#d3d3d3">Entidades no conectadas</Typography>} id="simple-tab-1" aria-controls="simple-tabpanel-1"
                             className={classes.tab} sx={{ background: value === 1 ? '#155065' : '#0d3b49'}}/>
                    </Tabs>


                    <TabPanel value={value} index={0} className={classes.tabPanel1}>
                        {/*<Paper elevation={15}>*/}
                        <Box display="flex" flexWrap="wrap">
                            {estados.map( e =>{
                                const icon = require(`../../assets/Cobertura/iconos_estados/${e.icon}`)
                                return <Box textAlign="center" p={1} m={1} className={classes.estado}>
                                    <Link component={RouterLink} to={e.route} className={classes.link}>
                                        <img src={icon} style={{width: 100}}/>
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
                            {no_conectados.map( e =>{
                                const icon = require(`../../assets/Cobertura/iconos_estados/${e.icon}`)
                                return <Box textAlign="center" p={1} m={1}
                                            className={classes.estado} sx={{cursor: 'pointer'}} onClick={handleClick}>
                                    <img src={icon} style={{width: 100}}/>
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