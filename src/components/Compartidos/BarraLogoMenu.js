import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import PDNLogo from "../../assets/PDN.png";
import MenuSistemas from "./MenuSistemas";
import React from "react";
import withWidth from "@material-ui/core/withWidth/withWidth";
import {withStyles} from "@material-ui/core";

const style = theme => ({

        link: {
            textDecoration: 'none',
            color: 'inherit'
        },

        item3: {
            maxWidth: 1200,
        },

        pdnLogo: {
            maxWidth: 110,
            paddingLeft: "40px",
            paddingTop: "40px",
            paddingBottom: "40px"
        },
    }
);
class BarraLogoMenu extends React.Component{
    render() {
        const {classes} = this.props;
        return (
            <Grid container spacing={0} justify="center" style={{background: '#fff'}}>
                <Grid item xs={11} className={classes.item3}>
                    <Link to="/" className={classes.link}>
                        <img src={PDNLogo} alt="PDN" className={classes.pdnLogo}/>
                    </Link>
                </Grid>
                <Grid item xs={1}>
                    <MenuSistemas/>
                </Grid>
            </Grid>
        );
    }
}


export default withWidth()(withStyles(style)(BarraLogoMenu));