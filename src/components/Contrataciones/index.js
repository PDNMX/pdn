import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PDNAppBar from "../PDNAppBar/PDNAppBar";
import PDNLinks from "../PDNLinks/PDNLinks";
import Footer from "../Footer/Footer";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    contents: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        [theme.breakpoints.up('sm')]:{
            marginLeft: '100px',
            marginRight: '100px'
        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        }
    },
    paper: {
        padding: theme.spacing.unit * 2,
        //textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Index extends React.Component{
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <PDNAppBar/>

                <div className={classes.contents}>
                    <Typography>
                        Contrataciones
                    </Typography>
                </div>
                <PDNLinks/>
                <Footer/>
            </div>
        );
    }
}

export default withStyles(styles)(Index);