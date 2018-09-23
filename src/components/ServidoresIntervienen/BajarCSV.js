import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {CSVLink} from "react-csv";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import Button from "@material-ui/core/Button/Button";
import classNames from 'classnames';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 15,
    },
    flex: {
        flexGrow: 1,
    },
    linkTransparent:{
        color:'transparent',
    }

});


class BajarCSV extends React.Component{
    render (){
        const { classes,data,columnas,filtrado} = this.props;
        let nombreArchivo = filtrado ? "Servidores públicos filtrados.csv" :  "Servidores públicos.csv" ;
        let labelButton = filtrado ?   "Descargar mi búsqueda" : "Descargar todo";
        let headers = columnas.map((item)=>{
            return {
                label: item.label,
                key: item.id
            }
        });
        return (
            <CSVLink data={data} filename={nombreArchivo} headers ={headers} className={classes.linkTransparent}>
                <Button color="primary" variant="contained" size="small" className={classNames(classes.button)}>
                    <DownloadIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                    {labelButton}
                </Button>
            </CSVLink>
        );
    }
}

BajarCSV.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(BajarCSV);
