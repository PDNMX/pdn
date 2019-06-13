import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import {Link} from 'react-router-dom';
import CardContent from "@material-ui/core/CardContent/CardContent";
import {Typography} from "@material-ui/core"
const styles = theme => ({
    card: {
        [theme.breakpoints.up('sm')]:{
            height: theme.spacing(35),
            width: '100%'

        },
        [theme.breakpoints.down('sm')]:{
            height: theme.spacing(28),
            width: 250
        },
        [theme.breakpoints.up('xl')]:{
           height: theme.spacing(60),
            width: '100%',
        },
      //  backgroundColor : theme.palette.primary.light

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
    },
    textoCentrado:{
        textAlign:"center"
    },
    containerCard:{
        //marginRight: theme.spacing(5)
    }
});


function SimpleCard(props) {
    const { classes } = props;
    const title = props.title;
    const imagen = props.icon;
    const to = props.to;
    const content = props.content;
    return (
        <div className={classes.containerCard}>
            <Card className={classes.card}>
               <CardContent>
                   <CardMedia className={classes.media}
                              image={imagen}
                              component={Link}
                              to ={to}
                   />
                   <Typography  component="p" variant="h6" className={classes.textoCentrado}>
                       {title}
                   </Typography>
                   <Typography component="p" variant="body1" className={classes.textoCentrado}>
                       {content}
                   </Typography>

                </CardContent>
            </Card>
        </div>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);