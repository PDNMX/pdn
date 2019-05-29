import React  from 'react';
import {withStyles} from "@material-ui/core/styles";
import Header from './Header/Header';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class HelpDesk extends React.Component{

    render() {

        const {classes} = this.props;

        return <div className={classes.root}>
            <Header/>

            <Grid container spacing={0} justify="center">
                <Grid item xs={12}>
                    <Typography>
                        Mesa de ayuda
                    </Typography>
                </Grid>
            </Grid>
        </div>
    }
}


export default withStyles(styles)(HelpDesk);

