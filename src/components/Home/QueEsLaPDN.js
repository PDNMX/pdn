import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    root: { flexGrow:1}
});
class QueEsLaPDN extends React.Component{

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={12}>
                        <Typography variant="headline">
                            ¿Qué es la Plataforma Digital Nacional?
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(QueEsLaPDN);