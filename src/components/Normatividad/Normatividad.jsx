import withStyles from '@mui/styles/withStyles';
import ExpansionPanels from './ExpansionPanels';
import HeaderV2 from '../HomeV2/HeaderV2';
import pdnRoutes from '../../routes';
import { Grid, Paper, Box } from '@mui/material';

const styles = theme => ({
    root: {
        flexGrow: 1,
        color: '#713972'
    },
    rootItem: {
        maxWidth: 1200,
        paddingTop: 90,
        paddingBottom: 90,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    sistemas: {
        maxWidth: 200,
        "&:hover": {
            opacity: .5
        }
    },
    link: {
        textDecoration: "none"
    },
    text: {
        color: theme.palette.greyColor,
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario ? theme.palette.secundario.main : 'defaultColor',
        borderRadius: '10px 10px 10px 10px',
        display: 'flex',
        justifyContent: "center"
    },
    box: {
        maxWidth: '900px', paddingTop: '50px', paddingBottom: '50px'
    }
});

const Normatividad = props => {
    const {classes} = props;
    const section = pdnRoutes.find(route => route.path === '/normatividad');

    return (
        <div className={classes.root}>
            <HeaderV2 section={section}/>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} className={classes.rootItem}>
                    <Paper className={classes.paper} elevation={15}>
                        <Box className={classes.box}>

                            <ExpansionPanels/>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>

        </div>
    );
}

export default withStyles(styles)(Normatividad);
