import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';
import {Typography} from "@mui/material"
import BG from "../../../assets/img/mesa_ayuda.jpg";
import BarraLogoMenu from "../../Compartidos/BarraLogoMenu";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

const style = theme => ({
        root: {
            flexGrow:1
        },

        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        item1:{
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        item2:{
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2)
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
            backgroundImage: `url(${BG})`,
            padding: '82px 0 82px'
        }
    }
);

class Header extends React.Component{

    render(){
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {/*<PDNAppBar/>*/}

                <BarraLogoMenu/>

                <Grid container spacing={0} className="breadcrumb" justifyContent='center'>
                    <Grid item xs={12} className={classes.item3}>
                        <ul>
                            <li>
                                <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                            </li>
                            <li>
                                Términos de uso
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className={classes.container} justifyContent='center'>
                  <Grid item xs={12} md={7} className={classes.item2} align='center' >
                      <Typography variant="h1" paragraph className={classes.whiteText} style={{fontSize: '36px', fontWeight: 300}}>
                          Términos y condiciones de uso
                      </Typography>
                  </Grid>
                </Grid>

            </div>
        );
    }
}

export default withWidth()(withStyles(style) (Header));
