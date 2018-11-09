import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {CSVLink,CSVDownload} from "react-csv";
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
    state = {
        data:[
            {concesionesLicencias: 'a' , contrataciones: 'b', dictamenes: 'c', enajenacion: 'd', id:35, institucion:'of',puesto: 'EVENTUAL',servidor:'aaa',tipoArea: 'REQUIERENTE'}
        ]
    };
    constructor(props){
        super(props);
        this.cvsLink = React.createRef();
    }
    triggerDown(){
        console.log("TRigger");
        this.setState({data:this.props.data},()=>{
            this.cvsLink.current.link.click();
        });

    };

    render (){
        console.log("EN RENDER : ",this.state.data);
        let {classes,data,columnas,filtrado,fnSearch,fileName} = this.props;
        let nombreArchivo = filtrado ? (fileName+" filtrados.csv") :  fileName+".csv" ;
        let labelButton = filtrado ?   "Descargar mi búsqueda" : "Descargar todo";
        let headers = columnas.map((item)=>{
            return {
                label: item.label,
                key: item.id
            }
        });
        return (
            <div >
            <Button color="primary" variant="contained" size="small" className={classNames(classes.button)}
                    onClick={() => {
                        filtrado?fnSearch('FILTER'):fnSearch('ALL');
                    }}>
                <DownloadIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                {labelButton}
            </Button>
            <CSVLink ref = {this.cvsLink} data = {this.state.data} filename = {nombreArchivo} asyncOnClick={true} target={"_blank"}
                     headers = {headers} className = {classes.linkTransparent} uFEFF={true}
                     onClick={(event,done)=>{
                         this.setState({data: data},()=>{
                             console.log("handler:  ",this.state.data);
                         });
                         console.log("state¡¡¡¡ : ",this.state.data);
                         done();
                      }}
            />
            </div>
        );
    }
}

BajarCSV.propTypes = {
    classes : PropTypes.object.isRequired
};


export default withStyles(styles)(BajarCSV);
