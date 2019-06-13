import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import Button from "@material-ui/core/Button/Button";
import classNames from 'classnames';
import PropDataUpdatedCSVLink from '../PropDataUpdatedCSVLink';

const styles = theme => ({
    button: {
        backgroundColor : "#FFE01B",
        fontSize : '0.7rem',
        color : theme.palette.textGrey.color,
        textTransform : 'none'
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        width : '25px'
    },
    root: {
        flexGrow: 1,
    },
    linkTransparent: {
        color: 'transparent',
    }

});


class BajarCSV extends React.Component {
    constructor(props) {
        super(props);
        this.cvsLink = React.createRef();
    }

    triggerDown() {
        this.cvsLink.current.link.click();
    };


    render() {
        let {classes, data, columnas, filtrado, fnSearch, fileName} = this.props;
        let nombreArchivo = filtrado ? (fileName + " filtrados.csv") : fileName + ".csv";
        let labelButton = filtrado ? "Descargar mi búsqueda " : "Descargar todo ";
        let headers = columnas.map((item) => {
            return {
                label: item.label,
                key: item.id
            }
        });


        return (
            <div className={classes.root}>
                <Button variant="contained" className={classNames(classes.button)}
                        onClick={() => {
                            filtrado ? fnSearch('FILTER') : fnSearch('ALL');
                        }}>
                    {labelButton}
                    <DownloadIcon className={classNames(classes.rightIcon, classes.iconSmall)}/>

                </Button>
                <PropDataUpdatedCSVLink ref={this.cvsLink} data={data} filename={nombreArchivo} target={"_blank"}
                                        headers={headers} className={classes.linkTransparent}
                />
            </div>
        );
    }
}

BajarCSV.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(BajarCSV);
