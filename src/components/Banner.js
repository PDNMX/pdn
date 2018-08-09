import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    bgImg:{
        height: '350px',
        backgroundImage: 'url(/Header.png)',/*'url(/BannereDark_PDN.png)',*/
        /*padding: '50px 0',*/
        backgroundPosition:'bottom',
        backgroundRepeat: 'no-repeat',
        textAlign:'left',
        backgroundSize:'cover'
    },
    container: {
        [theme.breakpoints.up('sm')]:{
            marginLeft: '100px',
            marginRight: '100px'
        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        }
    }
});

class Banner extends React.Component {
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.bgImg}>
                <div className={classes.container}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="display2" style={{color: "#fff", paddingTop: '30px'}}>
                                Plataforma Digital Nacional
                            </Typography>
                            <Typography variant="subheading" style={{color: '#fff', paddingTop: '10px'}}>
                                Inteligencia de datos anticorrupción
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

Banner.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Banner);