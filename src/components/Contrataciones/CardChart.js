import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    card: {
        [theme.breakpoints.up('sm')]:{
            height: 63* theme.spacing.unit,
            width: '100%'

        },
        [theme.breakpoints.down('sm')]:{
            height: 28* theme.spacing.unit,
            width: "100%"
        },
        [theme.breakpoints.up('xl')]:{
            height: 53* theme.spacing.unit,
            width: '100%'

        },

    },
    titleBox:{
        color: theme.palette.fontLight.color,
        backgroundColor: theme.palette.greyTitle.color,
        paddingTop:'1rem',
        paddingBottom:'1rem',
        paddingLeft:'6rem',
        paddingRight:'2rem',
        fontSize:'1rem',
        display:'inline-block',
        fontWeight:700,
        marginLeft:"-3rem",
        marginBottom: "2rem",
        marginTop: "1rem"

    },
    descripcion:{
        color:theme.palette.grey.color,
        maxWidth:"32rem"
    }
});


function CardChart(props) {
    const { classes } = props;
    const title = props.titleCard;
    const contenido = props.content;
    const descripcion = props.descripcion;
    return (
        <div>
            <Card className={classes.card}>
               <CardContent>
                   <Typography variant="headline" className={classes.titleBox}>
                       {title}
                   </Typography>
                   <Typography variant="body1" className={classes.descripcion}>
                       {descripcion}
                   </Typography>
                   {contenido}
               </CardContent>
            </Card>
        </div>
    );
}

CardChart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardChart);