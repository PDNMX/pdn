import React from 'react';
import {withStyles} from "@mui/styles";
//import InputBusqueda from './InputBusqueda';
import TablaResultados from './TablaResultados';
import axios from 'axios';
import SearchControls from "./SearchControls";
import Grid from '@mui/material/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
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
        loading: true,
        buyers: [],
        buyer_id: 'any',
        procurementMethod: 'any',
        supplierName: "",
        cycle: 'any',
        cycles: []
    };

    componentDidMount() {
        //fetch data
        //alert(this.props.dataSupplier)
        const supplier_id = this.props.dataSupplier;

        const _buyers = () => axios({
            url: process.env.REACT_APP_S6_BACKEND +'/api/v1/buyers',
            params: {
                supplier_id
            },
            method: 'GET',
            json: true
        });

        const _search = () => axios({
            url: process.env.REACT_APP_S6_BACKEND + "/api/v1/search",
            params: {
                supplier_id
            },
            method: 'POST',
            json: true
        });

        const _cycles = () => axios({
            url: process.env.REACT_APP_S6_BACKEND + "/api/v1/cycles",
            params: {
                supplier_id
            },
            method: 'GET',
            json: true
        });


        Promise.all([_buyers(), _search(), _cycles()]).then(  res => {
            //console.log (data);
            this.setState({
                buyers: res[0].data,
                pagination: res[1].data.pagination,
                results: res[1].data.data,
                cycles: res[2].data,
                loading: false
            });
        }).catch(error => {
            console.log(error);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataSupplier !== prevProps.dataSupplier){
            //alert(this.props.dataSupplier);
            this.search(false);
        }
    }

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
                page: page, //incrementar página
                pageSize: this.state.pagination.pageSize
            }
        } , () => {
            this.search(true)
        });
    };

    setBuyer = buyer_id => {
        this.setState({
            buyer_id: buyer_id
        }, () => {

            this.search(false);
        });
    };

    setProcurementMethod = pm => {
        this.setState({
            procurementMethod : pm
        }, () =>{
            this.search(false);
        });
    };

    setSupplierName = name => {
        this.setState({
            supplierName: name
        },()=> {
            //this.search(false)
        });
    };

    setInputText = text => {
        this.setState({
            inputText: text
        }, ()=> {
            //this.search(false)
        });
    };

    setCycle = cycle => {
        this.setState({
            cycle: cycle
        }, () => {
            this.search(false)
        });
    };

    //buscar
    search = pageChange => {

        let body = {
            page: pageChange?this.state.pagination.page:0,
            pageSize: this.state.pagination.pageSize,
        };

        if (this.state.buyer_id !== 'any'){
            body.buyer_id = this.state.buyer_id
        }

        if (this.state.procurementMethod !== 'any'){
            body.procurementMethod = this.state.procurementMethod
        }

        if (this.state.supplierName !== ''){
            body.supplierName = this.state.supplierName;
        }

        if (this.state.inputText !== ""){
            body.tender_title = this.state.inputText;
        }

        if (this.state.cycle !== 'any'){
            body.cycle = this.state.cycle;
        }

        this.setState({loading: true}, () => {
            const supplier_id = this.props.dataSupplier;

            axios({
                url: process.env.REACT_APP_S6_BACKEND + "/api/v1/search",
                params: {
                    supplier_id
                },
                method: 'POST',
                data: body,
                json: true
            }).then(res => {
                //console.log(data)
                this.setState({
                    results: res.data.data,
                    pagination: res.data.pagination, //al buscar se debe resetrar la página a 0
                    loading: false
                });
            }).catch(error => {
                console.log(error)
            });
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <SearchControls buyers={this.state.buyers}
                                    buyer_id={this.state.buyer_id}
                                    setBuyer={this.setBuyer}
                                    setProcurementMethod={this.setProcurementMethod}
                                    procurementMethod={this.state.procurementMethod}
                                    setSupplierName={this.setSupplierName}
                                    supplierName={this.state.supplierName}
                                    setInputText={this.setInputText}
                                    search={this.search}
                                    setCycle={this.setCycle}
                                    cycles={this.state.cycles}
                                    cycle={this.state.cycle}
                    />


                    <div style={{"overflow":"auto"}}>

                        <TablaResultados
                            data={this.state.results}
                            pagination={this.state.pagination}
                            handleChangeRowsPerPage = {this.handleChangeRowsPerPage}
                            handleChangePage = {this.handlePageChange}
                            loading={this.state.loading}
                        />

                    </div>

                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Busqueda);