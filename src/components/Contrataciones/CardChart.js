import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Grafica1 from './Grafica1'
import CardContent from "@material-ui/core/CardContent/CardContent";

const g = <Grafica1/>

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
    media: {
        paddingTop : '75%',
        //width: '100%',
        height:'0',
        //height: theme.spacing.unit * 32*0.7,
        //maxHeight:'70%'

    },
    headerCard:{
        [theme.breakpoints.up('md')]:{
            fontSize: 'calc(1.1vw)',
        },
        [theme.breakpoints.down('md')]:{
            fontSize: 'calc(1rem)',
        }


    },
    headerCardRoot:{
        height:'15%',
        alignItems: 'unset'
    }
});


function CardChart(props) {
    const { classes } = props;
    const title = props.titleCard;
    const contenido = props.content;
    return (
        <div>
            <Card className={classes.card}>
                <CardHeader
                    classes={{
                        title: classes.headerCard,
                        root: classes.headerCardRoot
                    }}
                    title={title}
                />
               <CardContent>
                    {g}
               </CardContent>
            </Card>
        </div>
    );
}

CardChart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardChart);