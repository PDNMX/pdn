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
          pageSize: 10,
          page: 0,
          total: 0
        },
        results: [],
        loading: true
    };


    componentWillMount() {
        //fetch data
        rp({
            uri: process.env.REACT_APP_DUMMY_API + "/api/s6/search",
            method: 'POST',
            json: true
        }).then(  data => {
            //console.log (data );
            this.setState({
                pagination: data.pagination,
                results: data.data,
                loading: false
            });
        });
    }


    setInputText = text => {
        this.setState({inputText: text});
    };


    handleChangeRowsPerPage = (pageSize) => {
        this.setState( {
            loading: true,
            pagination: {
                page: 0,
                pageSize: pageSize
            },
        } , () => {
            this.search()
        });
    };


    handlePageChange = (page) => {
        this.setState( {
            loading: true,
            pagination: {
                page: page,
                pageSize: this.state.pagination.pageSize
            }
        } , () => {
            this.search()
        });
    };

    //buscar
    search = () => {

        let body = {
            page: this.state.pagination.page,
            pageSize: this.state.pagination.pageSize
        };

        if (this.state.inputText !== ""){
            body.contract_title = this.state.inputText;
        }

        this.setState({loading: true}, () => {

            rp({
                uri: process.env.REACT_APP_DUMMY_API + "/api/s6/search",
                method: 'POST',
                body: body,
                json: true
            }).then (data => {
                //console.log(data)
                this.setState({
                    results: data.data,
                    pagination: data.pagination,
                    loading: false
                })
            });
        });
    };

    /*
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
    }*/


    render() {


        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <InputBusqueda setInputText={this.setInputText} search={this.search}/>
                <TablaResultados
                    data={this.state.results}
                    pagination={this.state.pagination}
                    handleChangeRowsPerPage = {this.handleChangeRowsPerPage}
                    handleChangePage = {this.handlePageChange}
                    loading={this.state.loading}
                />

            </div>
        );
    }

}

export default withStyles(styles)(Busqueda);