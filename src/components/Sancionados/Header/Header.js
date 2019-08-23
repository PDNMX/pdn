import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import BG from '../../../assets/img/cintillo_sancionados.jpg';
import S3 from '../../../assets/iconos_azul/3_icono.svg'
import {Typography} from "@material-ui/core"
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import '../../Utils/Header.css'
import classNames from 'classnames';
//import Button from "@material-ui/core/Button";
//import AlertDialog from "../AlertDialolg";
import BarraLogoMenu from "../../Compartidos/BarraLogoMenu";


const style = theme => ({
        root: {
            flexGrow: 1,


        },
        container1: {
            //background: 'grey',
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),

            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            backgroundImage: `url(${BG})`
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        item1: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        item2: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2)
        },
        item3: {
            maxWidth: 1200,
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
        },
        button: {
            background: '#ffe01b',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2)
        }
    }
);

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.btnVideo = React.createRef();
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {/*<PDNAppBar/>*/}

                <BarraLogoMenu/>
                <Grid container spacing={0} className="breadcrumb" justify='center'>
                    <Grid item xs={12} className={classes.item3}>
                        <ul>
                            <li>
                                <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                            </li>
                            <li>
                                Servidores públicos y particulares sancionados
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className={classNames(classes.container1)} justify='center'>
                    <Grid item xs={12} md={4} align={isWidthUp('md', this.props.width) ? 'right' : 'center'}
                          className={classes.item1}>
                        <img src={S3} alt="Sistema 2" className={classes.s2}/>
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.item2}
                          align={isWidthUp('md', this.props.width) ? 'left' : 'center'}>
                        <Typography variant="h4" paragraph className={classes.whiteText} style={{fontWeight: 300}}>
                            Servidores públicos y particulares
                        </Typography>
                        <Typography variant="h4" paragraph className={classes.whiteText} style={{fontWeight: 600}}>
                            Sancionados
                        </Typography>
                        <Typography className={classes.whiteText} style={{fontSize: '18px', fontWeight: 500}}>
                            Consulta y visualiza los datos de las sanciones o inhabilitación firmes <br/>
                            en contra de servidores públicos, así como los datos de particulares <br/>
                            inhabilitados para celebrar contratos con el gobierno.
                        </Typography>
                    </Grid>
                  {  /*<Grid item xs={12} align={'center'}>
                        <Button variant="contained" className={classes.button}
                                onClick={() => this.btnVideo.handleClickOpen()}>Conoce más</Button>
                    </Grid>*/}
                </Grid>
               {/* <AlertDialog innerRef={comp => this.btnVideo = comp}/>*/}
            </div>
        )
    }
}

export default withWidth()(withStyles(style)(Header));
