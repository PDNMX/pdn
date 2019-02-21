import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
//import Chip from '@material-ui/core/Chip';

import s1 from '../../assets/about/icono1.svg';
import s2 from '../../assets/about/icono2.svg';
import s3 from '../../assets/about/icono3.svg';
import s4 from '../../assets/about/icono4.svg';
import s5 from '../../assets/about/icono5.svg';
import s6 from '../../assets/about/icono6.svg';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit*4,
        paddingBottom: theme.spacing.unit*4,

    },

    icons: {
        width: '80px'
    },
    item: {
        textAlign: 'center'
    },
    chip: {
        background: '#96cb99',
        color: '#fff',
        fontSize: '55px',
        height: '55px',
        width: '55px',
        borderRadius: '50%'
    },
    links:{
        color: '#96cb99'
    }

});

class Sectores extends React.Component {

    render () {
        const {classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant='display2' style={{color: '#96cb99'}}>
                            {/*<Chip label={6} className={classes.chip}/>*/} Sistemas de la PDN
                        </Typography>
                        <br/>
                        <br/>
                    </Grid>

                    <Grid item xs={6} md={4} className={ classes.item }>
                        <a href="https://www.plataformadigitalnacional.org/blog/sistema-1-declaracion-patrimonial-declaracion-de-intereses-y-constancia-de-presentacion-de-declaracion-fiscal/" className={classes.links}>
                            <img className={classes.icons} src={s1} alt="Sistema 1"/>
                            <Typography variant="subheading" className={classes.links}>
                                Declaraciones
                            </Typography>
                        </a>
                    </Grid>
                    <Grid item  xs={6} md={4} className={classes.item}>
                        <a href="https://www.plataformadigitalnacional.org/blog/sistema-2-servidores-publicos-que-intervienen-en-procesos-de-contrataciones-publicas/" className={classes.links}>
                            <img className={classes.icons} src={s2} alt="Sistema 2"/>
                            <Typography variant="subheading" className={classes.links}>
                                Servidores públicos que intervienen en contrataciones
                            </Typography>
                        </a>
                    </Grid>
                    <Grid item  xs={6} md={4} className = {classes.item}>
                        <a href="https://www.plataformadigitalnacional.org/blog/sistema-3-servidores-publicos-y-particulares-sancionados/" className={classes.links}>
                            <img className={classes.icons} src={s3} alt="Sistema 3"/>
                            <Typography variant="subheading" className={classes.links}>
                                Servidores públicos y particulares sancionados
                            </Typography>
                        </a>
                    </Grid>
                    <Grid item  xs={6} md={4} className = {classes.item }>
                        <a href="https://www.plataformadigitalnacional.org/blog/sistema-4-informacion-y-comunicacion-del-sistema-nacional-anticorrupcion-y-el-sistema-nacional-de-fiscalizacion/" className={classes.links}>
                            <img className={classes.icons} src={s4} alt="Sistema 4"/>
                            <Typography variant="subheading" className={classes.links}>
                                Fiscalización
                            </Typography>
                        </a>
                    </Grid>
                    <Grid item xs={6} md={4} className={classes.item}>
                        <a href="https://www.plataformadigitalnacional.org/blog/sistema-5-denuncias-publicas-de-faltas-administrativas-y-hechos-de-corrupcion/" className={classes.links}>
                            <img className={classes.icons} src={s5} alt="Sistema 5"/>
                            <Typography variant="subheading" className={classes.links}>
                                Denuncias
                            </Typography>
                        </a>
                    </Grid>
                    <Grid item  xs={6} md={4} className={classes.item }>
                        <a href="https://www.plataformadigitalnacional.org/blog/sistema-6-informacion-publica-de-contrataciones/" className={classes.links}>
                            <img className={classes.icons} src={s6} alt="Sistema 6"/>
                            <Typography variant="subheading" className={classes.links}>
                                Contrataciones Públicas
                            </Typography>
                        </a>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Sectores.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sectores);