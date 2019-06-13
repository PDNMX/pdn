import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {Typography} from "@material-ui/core"
import IconoConexiones from '../../../assets/Cards/icono-conexion.svg';
import Grid from "@material-ui/core/Grid/Grid";
import rp from "request-promise";
import {Link} from "react-router-dom";

const styles = {
    card: {
        maxWidth: 345,
        margin : '0 auto'
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    number:{
        textAlign : 'center'
    },
    category:{
        textAlign : 'center'
    },
    actions :{
        margin : '0 auto'
    }
};
const MyLink = props => <Link to="/administracionPDN/consultasolicitudes"  {...props}/>;

class CardSolicitudesConexion extends React.Component  {
    state={
        numeroConexiones : 0,
    };
    componentDidMount() {
        this.getEstadisticas();
    };

    getEstadisticas = () => {
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/solicitudes_conexion?select=count=eq.exact',
            json: true,
            qs: {
                estatus : 'in.("ENVIADA","PENDIENTE")'
            }
        };
        rp(options)
            .then(data => {
                this.setState({numeroConexiones: data[0].count});
            }).catch(err => {
            alert("_No se pudó obtener la información");
            console.log(err);
        });
    };
    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea component={MyLink}>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    alt="Conexiones"
                                    className={classes.media}
                                    height="140"
                                    image={IconoConexiones}
                                    title="Conexiones"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h2" color={"primary"} className={classes.number}>
                                    {this.state.numeroConexiones}
                                </Typography><br/>
                                <Typography  variant="h5" color={"textSecondary"} className={classes.category}>
                                    Solicitudes<br/>conexión
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="secondary" className={classes.actions} component={MyLink}>
                        Ver
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles) (CardSolicitudesConexion);