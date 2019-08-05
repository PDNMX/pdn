import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import InputBusqueda from './InputBusqueda';
import TablaResultados from './TablaResultados';
import rp from 'request-promise';

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});
class Busqueda extends React.Component{


    state = {
        inputText: "",
        pagination: {
          limit: 0,
          skip: 0,
          total: 0
        },
        results: []
    };


    componentWillMount() {

        //fetch data

        rp({
            uri: process.env.REACT_APP_DUMMY_API + "/api/s6/search",
            method: 'POST',
            body: {skip: 10000},
            json: true
        }).then(  data => {
            console.log (data );
            this.setState({
                pagination: data.pagination,
                results: data.data
            })
        })


    }


    setInputText = text => {
        this.setState({inputText: text});
    };

    //buscar

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
    }


    render() {


        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <InputBusqueda setInputText={this.setInputText}/>
                <TablaResultados data={this.state.results} pagination={this.state.pagination}/>

            </div>
        );
    }

}

export default withStyles(styles)(Busqueda);