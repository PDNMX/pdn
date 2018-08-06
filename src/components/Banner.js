import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";

var styles = {
    appBar: {
        flexWrap: 'wrap'
    },
    tabs: {
        width: '100%',
        color : 'black'
    },
    bgImg:{
        height: '350px',
        backgroundImage: 'url(/BannereDark_PDN.png)',
        /*padding: '50px 0',*/
        backgroundPosition:'bottom',
        backgroundRepeat: 'no-repeat',
        textAlign:'left',
        backgroundSize:'cover'
    },
    container:{
        marginLeft :'auto',
        marginRight : 'auto',
        paddingRight : '1em',
        paddingLeft:  '1em'
    }
}
function Banner(props){
    const { classes } = props;
    return (
            <div className={classes.bgImg}>
                <div className={classes.container}>
                    <Typography variant="display3" style={{color:'white',paddingTop:'.5em'}}>
                        Plataforma Digital Nacional
                    </Typography>
                    <Typography variant="display1" style={{color:'white',paddingTop:'.5em'}}>
                       Inteligencia de datos anticorrupción
                    </Typography>
                </div>

            </div>
    );

}
export default withStyles(styles)(Banner);