import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
//import Typography from "@material-ui/core/Typography";
//import BG from '../../../assets/img/fenito.jpg';
import PDNLogo from '../../../assets/PDN.png';
import S2 from '../../../assets/iconos_azul/2_icono.svg'
//import PDNAppBar from "../../PDNAppBar/PDNAppBar";
import Typography from "@material-ui/core/Typography";
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import './Header.css';

const style = theme => ({
        root: {
            flexGrow:1
        },
        container1: {
            background: 'grey',
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            zIndex: 5
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        item1:{
            paddingRight: theme.spacing.unit * 2,
        },
        item2:{
            paddingLeft: theme.spacing.unit * 2
        },
        item3:{
            maxWidth: 1200
        },
        s2: {
            maxWidth: '150px'
        },
        whiteText: {
            color: '#fff'
        },
        pdnLogo: {
            maxWidth: 110,
            paddingLeft: "40px",
            paddingTop: "40px",
            paddingBottom: "40px"
        }
    }
);

class Header extends React.Component{

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>



                {/*<figure>
                    <img src={BG} alt="Sistema 2" style={{zIndex: -1, position: 'absolute', width: '100%', right: 0,top:0, bottom: 0}}/>
                </figure>*/}

                {/*<PDNAppBar/>*/}


                <Grid container spacing={0} justify="center">
                    <Grid item xs={12} className={classes.item3}>
                        <Link to="/" className={classes.link}>
                            <img src={PDNLogo} alt="PDN" className={classes.pdnLogo}/>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className="breadcrumb" justify='center'>
                    <Grid item xs={12} className={classes.item3}>
                        <ul>
                            <li>
                                <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                            </li>
                            <li>
                                Servidores que intervienen en procesos de contratación
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className={classes.container1} justify='center'>

                    <Grid item xs={12} md={4} align={isWidthUp('md', this.props.width)? 'right':'center'} className={classes.item1}>
                        <img src={S2} alt="Sistema 2" className={classes.s2}/>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item2} align={isWidthUp('md', this.props.width)? 'left':'center'} >
                        <Typography variant="h4" paragraph className={classes.whiteText}>
                            Servidores que intervienen en
                        </Typography>
                        <Typography variant="h4" paragraph className={classes.whiteText}>
                            Procesos de contratación
                        </Typography>
                        <Typography className={classes.whiteText}>
                            Conoce a los servidores públicos responsables de llevar
                        </Typography>
                        <Typography className={classes.whiteText}>
                            correctamiente las compras del gobierno.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withWidth()(withStyles(style) (Header));