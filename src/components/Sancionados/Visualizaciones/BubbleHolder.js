import React from "react";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";
import Bubbles_SPS from '../../Charts/bubbles/Bubbles_SPS';
import {createNodes, createNodesGroup} from './utils';
import rp from "request-promise";
import {width, height, center,yearCenters} from './bubbles_constants';
import ControlSelect from "./ControlSelect";
import BubbleChart from "../../Charts/bubbles/BubbleChart";
import GroupTitle from './GroupTitle';
import TablaDetalleServidores from "./TablaDetalleServidores";
import TablaDetalleParticulares from "./TablaDetalleParticulares";

// Styles
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    item: {
        maxWidth: '1024px'
    },
    title: {
        color: theme.palette.textPrincipal.color,
        fontSize: 20,
        textDecoration: 'underline',
        textDecorationColor: theme.palette.secondary.main,
        textUnderlinePosition: 'under'
    },
    font: {
        color: theme.palette.textPrincipal.color
    },

});

class BubbleHolder extends React.Component {
    state = {
        data: [],
        type: 1,
        originalData: [],
        group: false,
        dataGroup: [],
        institucion: null,
    };

    getData = () => {
        let options = {
            uri: this.state.type === 1 ? 'https://plataformadigitalnacional.org/api/v_sps' : 'https://plataformadigitalnacional.org/api/v_particulares_sancionados',
            json: true
        };

        rp(options)
            .then(data => {
                let aux = [], auxGroup = [];
                let existe = -1, existeGroup = -1;
                data = JSON.parse(JSON.stringify(data));
                data.forEach((item) => {
                    existe = aux.findIndex(element => {
                        return element.dependencia === item.dependencia;
                    });
                    existe > -1 ? aux[existe].total_sanciones += item.sanciones_total : aux.push({'dependencia': item.dependencia,'total_sanciones': item.sanciones_total});

                    existeGroup = auxGroup.findIndex(element => {
                        return element.causa === item.causa;
                    });
                    existeGroup > -1 ? auxGroup[existeGroup].total_sanciones += 1 : auxGroup.push({'causa': item.causa,'total_sanciones': 1});
                });
                this.setState({
                    data: createNodes(aux, this.state.type),
                    originalData: data,
                    dataGroup: auxGroup
                });
            })
            .catch(err => {
                alert("_No se pudo obtener la información");
                console.log(err);
            });
    };

    componentDidMount() {
        this.getData();
    }

    onTypeChanged = (newType) => {
        this.setState({type: newType, institucion: null}, () => {
            this.getData(newType);
        });
    };

    onGroupChanged = (newType) => {
        let data = newType === true ? createNodesGroup(this.state.originalData) : createNodes(this.state.data,this.state.type);
        this.setState({
            data : data
        },()=>{
            this.setState({group : newType})
        });
    };

    selectBubble = (bubble) => {
        this.setState({institucion: bubble.dependencia});
        window.location.href = "#tablaDetalle";
    };

    render() {
        const {classes} = this.props;
        const {data, type} = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant={"display1"} className={classes.title}>
                            {this.state.type === 1 ? 'SERVIDORES PÚBLICOS SANCIONADOS' : 'PARTICULARES SANCIONADOS'}
                        </Typography>
                        <br/>
                        {this.state.type === 1 &&
                        <Typography variant={"subheading"} className={classes.font}>
                            {'Muestra las dependencias y el número de servidores públicos sancionados que tienen'}
                        </Typography>
                        }
                        {this.state.type === 2 &&
                        <Typography variant={"subheading"} className={classes.font}>
                            {'Muestra las dependencias y el número de particulares sancionados que tienen'}
                        </Typography>
                        }

                    </Grid>
                    <Grid item xs={12}>
                        <ControlSelect onChangeGraphic={this.onTypeChanged} onChangeGroup={this.onGroupChanged}
                                        active={type}/>
                    </Grid>
                    <Grid item xs={12}>
                        <BubbleChart width={width} height={height}>
                            <Bubbles_SPS data={data} forceStrength={0.3} center={center} type={type}
                                         group={this.state.group} yearCenters={yearCenters} selectBubble={this.selectBubble}/>
                            {this.state.group &&
                                <GroupTitle widh={width} yearCenters={yearCenters}/>
                            }
                        </BubbleChart>
                    </Grid>
                    <Grid item xs={12} id={'tablaDetalle'}>
                        {this.state.institucion && this.state.type=== 1 &&
                        <TablaDetalleServidores institucion={this.state.institucion}/>
                        }
                        {this.state.institucion && this.state.type=== 2 &&
                        <TablaDetalleParticulares institucion={this.state.institucion}/>
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(BubbleHolder);