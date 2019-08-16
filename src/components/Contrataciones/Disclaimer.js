import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: 0,
        paddingTop: 0
    },
    bullet: {
        backgroundColor: '#89d4f2',
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        display: 'inline-block',
        marginLeft: '-20px',
        marginRight: "10px",
        marginBottom: '1px'
    },
    ul: {
        listStyle: 'none',
        //marginLeft: 0,
        paddingLeft: '20px'
    },
    li: {
        //paddingBottom: theme.spacing(2)
    },
});

class Disclaimer extends React.Component{

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography paragraph>
                    Aquí encontrarás la siguiente información:
                </Typography>

                <ul className={classes.ul}>
                    <li className={classes.li}> <Typography><span className={classes.bullet}/>Cuánto gasta el gobierno</Typography></li>
                    <li className={classes.li}><Typography><span className={classes.bullet}/>Qué tipos de procedimientos</Typography></li>
                    <li className={classes.li}><Typography><span className={classes.bullet}/>Información sobre los proveedores que participan</Typography></li>
                </ul>
            </div>
        );
    }
}

export default withStyles(styles)(Disclaimer);