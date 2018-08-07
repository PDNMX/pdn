import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";

const styles = {
    appBar: {
        flexWrap: 'wrap'
    },
    tabs: {
        width: '100%',
        color : 'black'
    },
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
        marginLeft :'auto',
        marginRight : 'auto',
        paddingRight : '1em',
        paddingLeft:  '1em'
    }
};

class Banner extends React.Component {
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.bgImg}>
                <div className={classes.container}>
                    <Typography variant="display2" style={{color: 'white', paddingTop: '30px'}}>
                        Plataforma Digital Nacional
                    </Typography>
                    <Typography variant="subheading" style={{color: 'white', paddingTop: '10px'}}>
                        Inteligencia de datos anticorrupción
                    </Typography>
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(Banner);