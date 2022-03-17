import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';
import PDNLogo from '../../../../assets/logo_PDN_2.svg';
import {Typography} from "@mui/material"

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

const style = theme => ({
        root: {
            flexGrow: 1
        },

        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        item1: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        item2: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2)
        },
        item3: {
            maxWidth: 1200,
        },
        s2: {
            maxWidth: '170px'
        },
        whiteText: {
            color: '#fff'
        },
        pdnLogo: {
            maxWidth: 110,
            paddingLeft: "40px",
            paddingTop: "40px",
            paddingBottom: "40px"
        }
    }
);

class Header extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {/*<PDNAppBar/>*/}

                <Grid container spacing={0} justifyContent="center" style={{background: '#fff'}}>
                    <Grid item xs={12} className={classes.item3}>
                        <Link to="/" className={classes.link}>
                            <img src={PDNLogo} alt="PDN" className={classes.pdnLogo}/>
                        </Link>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className="breadcrumb" justifyContent='center'>
                    <Grid item xs={12} className={classes.item3}>
                        <ul>
                            <li>
                                <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                            </li>
                            <li>
                                <Link className={classes.link} to='/sancionados'>Sancionados</Link>
                            </li>
                            <li>
                                Dashboard
                            </li>

                        </ul>
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{background: "#5fb1e6", padding: "82px 0"}} justifyContent='center'>
                    <Grid item xs={12} md={7} className={classes.item2} align='center'>
                        <Typography variant="h2" paragraph className={classes.whiteText}>
                            Sancionados
                        </Typography>
                        <Typography variant="h4" paragraph className={classes.whiteText}>
                            Dashboard
                        </Typography>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default withWidth()(withStyles(style)(Header));
