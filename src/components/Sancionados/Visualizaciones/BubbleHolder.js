import React from "react";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";
import Bubbles_SPS from '../../Charts/bubbles/Bubbles_SPS';
import {createNodes} from './utils';
import rp from "request-promise";
import { width, height, center } from './bubbles_constants';
import ControlSelect from "./ControlSelect";
import BubbleChart from "../../Charts/bubbles/BubbleChart";
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
        color : theme.palette.textPrincipal.color
    },

});

class BubbleHolder extends React.Component{
    state = {
        data : [],
        type : 1,
        originalData:[],
        group : 0,
    };

    getData=()=>{
        let options = {
            uri : this.state.type===1?'https://plataformadigitalnacional.org/api/v_sps':'https://plataformadigitalnacional.org/api/v_particulares_sancionados',
            json : true
        };

        rp(options)
            .then(data=>{
                let aux = [];
                let d=null;
                let sum=0;
                data = JSON.parse(JSON.stringify(data));
                data.forEach((item) => {
                    if(d && d !== item.dependencia){
                        aux.push({'dependencia' : d,'total_sanciones':sum});
                        sum = item.sanciones_total;
                        d = item.dependencia;
                    }else{
                        d = item.dependencia;
                        sum += item.sanciones_total;
                    }
                });
                this.setState({
                    data: createNodes(aux,this.state.type),
                    originalData : aux,
                });
            })
            .catch(err=>{
                alert("_No se pudo obtener la información");
                console.log(err);
            });
    };
    componentDidMount(){
        this.getData();
    }

    onTypeChanged = (newType)=>{
        this.setState({type : newType},()=>{
            this.getData(newType);
        });

        /*if(this.state.type !== newType){
            this.setState({
                data:createNodes(this.state.originalData,newType),
                type : newType
            });
        }
*/
    };
    onGroupChanged = (newType)=>{
        if(this.state.type !== newType){
            this.setState({
                type : newType
            });
        }

    };

    render(){
        const {classes} = this.props;
        const {data, type} = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs  = {12}>
                        <Typography variant={"display1"} className={classes.title}>
                            {this.state.type===1?'SERVIDORES PÚBLICOS SANCIONADOS' : 'PARTICULARES SANCIONADOS'}
                        </Typography>
                        <br/>
                        {this.state.type===1 &&
                    <Typography variant={"body1"} className={classes.font}>
                        {'Muestra las dependencias y el númerp de servidores públicos sancionados que tienen'}
                    </Typography>
                    }
                        {this.state.type===2 &&
                        <Typography variant={"body1"} className={classes.font}>
                            {'Muestra las dependencias y el número de particulares sancionados que tienen'}
                        </Typography>
                        }

                    </Grid>
                    <Grid item xs={12}>
                        <ControlSelect onChangeGraphic={this.onTypeChanged} onChangeGroup={this.onGroupChanged} active={type}/>
                    </Grid>
                    <Grid item xs={12}>
                        <BubbleChart width={width} height={height}>
                            <Bubbles_SPS data={data} forceStrength={0.3} center={center} type={type} />
                        </BubbleChart>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(BubbleHolder);