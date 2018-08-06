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
        padding: '50px 0',
        backgroundPosition:'bottom',
        backgroundRepeat: 'no-repeat',
        textAlign:'center',
        backgroundSize:'cover'
    },
    container:{
        marginLeft :'auto',
        marginRight : 'auto',
        paddingRight : '15px',
        paddingLeft:  '15px'
    }
}
function Banner(props){
    const { classes } = props;
    return (
            <div className={classes.bgImg}>
                <div className={classes.container}>
                    <Typography variant="display3" style={{color:'white',paddingTop:'10px'}}>
                        Plataforma Diginal Nacional
                    </Typography>
                </div>

            </div>
    );

}
export default withStyles(styles)(Banner);