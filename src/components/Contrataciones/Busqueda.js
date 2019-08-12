import React from 'react';
import {withStyles} from "@material-ui/core/styles";
//import InputBusqueda from './InputBusqueda';
import TablaResultados from './TablaResultados';
import rp from 'request-promise';
import SearchControls from "./SearchControls";

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
        supplierName: ""
    };


    componentWillMount() {
        //fetch data

        let queries = [
            rp({
                uri: process.env.REACT_APP_DUMMY_API +'/api/s6/buyers',
                method: 'GET',
                json: true
            }),
            rp({
                uri: process.env.REACT_APP_DUMMY_API + "/api/s6/search",
                method: 'POST',
                json: true
            })];

        Promise.all(queries).then(  data => {
            //console.log (data );
            this.setState({
                buyers: data[0],
                pagination: data[1].pagination,
                results: data[1].data,
                loading: false
            });
        }).catch(error => {
            console.log(error);
        });
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
                    pagination: data.pagination, //al buscar se debe resetrar la página a 0
                    loading: false
                })
            }).catch(error => {
                console.log(error)
            });
        });
    };

    render() {


        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <SearchControls buyers={this.state.buyers}
                                buyer_id={this.state.buyer_id}
                                setBuyer={this.setBuyer}
                                setProcurementMethod={this.setProcurementMethod}
                                procurementMethod={this.state.procurementMethod}
                                setSupplierName={this.setSupplierName}
                                supplierName={this.state.supplierName}
                                setInputText={this.setInputText}
                                search={this.search}
                />

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