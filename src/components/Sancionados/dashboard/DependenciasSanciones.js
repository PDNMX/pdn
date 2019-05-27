import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import "./index.css";
import Typography from "@material-ui/core/Typography";
import {Treemap} from "d3plus-react";
import rp from "request-promise";

const styles = theme => ({
    frameChart : {
        marginTop : "15px",
        marginBottom : "15px"
    },
    desc:{
        textAlign : "center"
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: 'http://localhost:3100/viz/getDependenciaCausa',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            alert("_No se pudo obtener la información");
            console.log(err);
        });
    });
}


class DependenciasSanciones extends React.Component {
    state= {

    };

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return  {
                     id : item.dependencia,
                    group : item.causa,
                    value : parseInt(item.total)
                }
            });

            this.setState({
                    methods: {
                        data: aux,
                        legend: true,
                        height: 400,
                        id : ["group"],
                        size:"value"
                        }
                }
            )
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={0} justify='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.desc}>
                            {"Dependencias con mayor número de sanciones"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <Treemap config={this.state.methods}/>
                        }

                    </Grid>
                </Grid>

            </div>
        )
    }

}

DependenciasSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DependenciasSanciones);