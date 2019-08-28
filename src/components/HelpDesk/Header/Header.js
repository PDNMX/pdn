import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {Typography} from "@material-ui/core"
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import BG from "../../../assets/img/mesa_ayuda.jpg";
import Logo from '../../../assets/img/logomesa_ayuda.svg';
import BarraLogoMenu from "../../Compartidos/BarraLogoMenu";

const style = theme => ({
        root: {
            flexGrow:1,
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        item1: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        },
        item2: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
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
        },
        container: {
            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            backgroundImage: `url(${BG})`
        },
        logo: {
            width: 150
        },
        mesa: {
            marginTop: '50px',
            fontSize: '36px',
            fontWeight: 300,
            color: '#fff'
        }
    }
);

class Header extends React.Component{

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>

                <BarraLogoMenu/>

                <Grid container spacing={0} className="breadcrumb" justify='center'>
                    <Grid item xs={12} className={classes.item3}>
                        <ul>
                            <li>
                                <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                            </li>
                            <li>
                                Mesa de ayuda
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify='center' style={{ padding: "82px 0"}} className={classes.container}>

                    <Grid item xs={12} md={4} align={isWidthUp('md', this.props.width)? 'right':'center'} className={classes.item1}>
                        <img src={Logo} alt="Mesa de ayuda" className={classes.logo} />
                    </Grid>

                    <Grid item xs={12} md={6} align={isWidthUp('md', this.props.width)? 'left':'center'} className={classes.item2}>
                        <Typography variant="h1" paragraph className={classes.mesa}>
                            Mesa de ayuda
                        </Typography>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default withWidth()(withStyles(style) (Header));
