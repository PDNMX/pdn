import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import {Link} from 'react-router-dom';
const styles = theme => ({
    card: {
        height: theme.spacing.unit * 32
    },
    media: {
        //width: '100%',
       // height:'70%',
        //height: theme.spacing.unit * 32*0.7,
        //maxHeight:'70%'
        width: '100%',
        backgroundPosition:'top',
        height: '75%'

    },
    headerCard:{
        [theme.breakpoints.up('sm')]:{
            fontSize: 'calc(1.1vw)',
        },
        [theme.breakpoints.down('sm')]:{
            fontSize: 'calc(.5rem + 2vw)',
        }

    },
    headerCardRoot:{
        height:'15%',
        alignItems: 'unset'
    }
});


function SimpleCard(props) {
    const { classes } = props;
    const title = props.titleCard;
    const imagen = props.content;
    const to = props.to;
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
                <CardMedia className={classes.media}
                               image={imagen}
                               component={Link}
                               to ={to}
                    />
            </Card>
        </div>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);