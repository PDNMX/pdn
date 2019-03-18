import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
//import Typography from "@material-ui/core/Typography";
import BG from '../../../assets/img/about.png';
import PDNLogo from '../../../assets/logo_PDN_2.svg';
import S3 from '../../../assets/iconos_azul/3_icono.svg'
import Star from '../../../assets/img/plataforma.svg';
//import PDNAppBar from "../../PDNAppBar/PDNAppBar";
import Typography from "@material-ui/core/Typography";
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import './Header.css';
import classNames from 'classnames';

const style = theme => ({
        root: {
            flexGrow:1
        },
        container1: {
            //background: 'grey',
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        item1:{
            paddingRight: theme.spacing.unit * 2,
            paddingLeft: theme.spacing.unit * 2,
        },
        item2:{
            paddingRight: theme.spacing.unit * 2,
            paddingLeft: theme.spacing.unit * 2
        },
        item3:{
            maxWidth: 1200,
        },
        s2: {
            maxWidth: '170px'
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
                {/*<PDNAppBar/>*/}

                <Grid container spacing={0} justify="center" style={{background: '#fff'}}>
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
                                ¿Qué es la PDN?
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <section className="pdn_title">
                  <img src={BG} alt="¿Qué es la PDN?" className="fenito"/>
                <Grid container spacing={0} className={classNames(classes.container1, 'z5')} justify='center'>
                    <Grid item xs={12} md={3} align={isWidthUp('md', this.props.width)? 'right':'center'} className={classes.item1}>
                        <img src={Star} alt="Sistema 2" className={classes.s2}/>
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.item2} align={isWidthUp('md', this.props.width)? 'left':'center'} >
                        <Typography variant="h3" paragraph className={classes.whiteText} style={{fontSize: '36px', fontWeight: 300}}>
                            ¿Qué es la Plataforma Digital Nacional?
                        </Typography>
                        <Typography className={classes.whiteText} style={{fontSize: '16px',fontWeight: 500, marginBottom: '1.5em'}}>
                        La <strong>Plataforma Digital Nacional</strong> es una fuente de <strong>inteligencia para construir integridad y
combatir la corrupción,</strong> que creará valor para el gobierno y la sociedad, a partir de grandes
cantidades de datos.
                        </Typography>
                        <Typography  className={classes.whiteText} style={{fontSize: '16px',fontWeight: 500}}>
                        La Plataforma es un <strong>medio para el intercambio de datos anticorrupción</strong> del Gobierno, que
busca quitar barreras y romper silos de información para que los datos sean comparables,
accesibles y utilizables, empezando con <strong>seis sistemas de datos prioritarios</strong>.
                        </Typography>
                    </Grid>
                </Grid>
                </section>
            </div>
        )
    }
}

export default withWidth()(withStyles(style) (Header));
