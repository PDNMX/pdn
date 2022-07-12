import React from 'react';
import {withStyles} from "@mui/styles";
//import InputBusqueda from './InputBusqueda';
import TablaResultados from './TablaResultados';
import axios from 'axios';
import SearchControls from "./SearchControls";
import Box from "@mui/material/Box";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
});

const Busqueda = props => {
    const [state, setState] = React.useState({
        dataSupplier: "SHCP",
        inputText: "",
        pagination: {
            pageSize: 10,
            page: 0,
            total: 0
        },
        results: [],
        loading: false,
        buyers: [],
        buyer_id: 'any',
        procurementMethod: 'any',
        supplierName: "",
        cycle: 'any',
        cycles: []
    });

    React.useEffect(() => {
        //fetch data
        const supplier_id = props.dataSupplier; //state.dataSupplier;

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
            //console.log (res);
            setState({
                ...state,
                dataSupplier: supplier_id, //
                buyers: res[0].data,
                pagination: res[1].data.pagination,
                results: res[1].data.data,
                cycles: res[2].data,
                loading: false
            });
        }).catch(error => {
            console.log(error);
        });

    },[]);

    React.useEffect(() => {
        if (state.loading){
            search();
        }
    }, [
        state.loading
        /*
        state.pagination.pageSize,
        state.pagination.page,
        state.buyer_id,
        state.procurementMethod,
        state.cycle
        state.inputText, // la búsqueda se ejecuta hasta dar click en el boton 'BUSCAR'
        state.supplierName // la búsqueda se ejecuta hasta dar click en el boton 'BUSCAR'
        */
    ]);

    React.useEffect(() => {
        /**
         * Cambiar dataSupplier
         * obtener las listas de buyers y cycles
         * limpiar state, asignar dataSupplier y ejecutar búsqueda inicial
        */

        if (props.dataSupplier && props.dataSupplier !== state.dataSupplier){
            console.log(`Setting data supplier to => ${props.dataSupplier}`);
            handleChangeDS(props.dataSupplier);
        }
    },[
        props.dataSupplier
    ]);

    const handleChangeDS = async dataSupplier => {

        const _buyers = await axios({
            url: process.env.REACT_APP_S6_BACKEND +'/api/v1/buyers',
            params: {
                supplier_id: dataSupplier
            },
            method: 'GET',
            json: true
        });

        const _cycles = await axios({
            url: process.env.REACT_APP_S6_BACKEND + "/api/v1/cycles",
            params: {
                supplier_id: dataSupplier
            },
            method: 'GET',
            json: true
        });

        setState({
            ...state,
            dataSupplier: dataSupplier,
            buyers: _buyers.data,
            cycles: _cycles.data,
            pagination: {
                pageSize: 10,
                page: 0,
                total: 0
            },
            buyer_id: 'any',
            procurementMethod: 'any',
            supplierName: "",
            cycle: 'any',
            loading: true
        })
    }


    const handleChangeRowsPerPage = (pageSize) => {
        setState( {
            ...state,
            loading: true,
            pagination: {
                page: 0,
                pageSize: pageSize,
                //total: 0
            },
        });
    };

    const handlePageChange = (page) => {
        setState( {
            ...state,
            loading: true,
            pagination: {
                page: page, //incrementar página
                pageSize: state.pagination.pageSize,
                //total: 0
            }
        });
    };

    const setBuyer = buyer_id => {
        setState({
            ...state,
            loading: true,
            pagination: {
                page: 0,
                pageSize: state.pagination.pageSize,
                //total: 0
            },
            buyer_id: buyer_id
        });
    };

    const setProcurementMethod = pm => {
        setState({
            ...state,
            loading: true,
            pagination: {
                page: 0,
                pageSize: state.pagination.pageSize,
                //total: 0
            },
            procurementMethod : pm
        });
    };

    const setSupplierName = name => {
        setState({
            ...state,
            pagination: {
                page: 0,
                pageSize: state.pagination.pageSize,
                //total: 0
            },
            supplierName: name
        });
    };

    const setInputText = text => {
        setState({
            ...state,
            pagination: {
                page: 0,
                pageSize: state.pagination.pageSize,
                //total: 0
            },
            inputText: text
        });
    };

    const setCycle = cycle => {
        setState({
            ...state,
            loading: true,
            pagination: {
                page: 0,
                pageSize: state.pagination.pageSize,
                // total: 0
            },
            cycle: cycle
        });
    };

    const cleanup = () => {
        setState({
            ...state,
            loading: true,
            pagination: {
                pageSize: 10,
                page: 0,
                //total: 0
            },
            results: [],
            buyer_id: 'any',
            procurementMethod: 'any',
            inputText: "",
            supplierName: "",
            cycle: 'any'
        });
    }

    const handleSearch = () => {
        setState({
            ...state,
            loading: true
        });
    };

    //buscar
    const search = async () => {

        let body = {
            page: state.pagination.page,
            pageSize: state.pagination.pageSize,
        };

        if (state.buyer_id !== 'any'){
            //body.buyer_id = state.buyer_id
            const byr = state.buyers.find(b => b.id === state.buyer_id);
            body.buyer_name = byr.name;
        }

        if (state.procurementMethod !== 'any'){
            body.procurementMethod = state.procurementMethod
        }

        if (state.supplierName !== ''){
            body.supplierName = state.supplierName;
        }

        if (state.inputText !== ""){
            body.tender_title = state.inputText;
        }

        if (state.cycle !== 'any'){
            body.cycle = state.cycle;
        }

        const supplier_id = state.dataSupplier;

        //console.log(body);
        try {
            const res = await axios({
                url: process.env.REACT_APP_S6_BACKEND + "/api/v1/search",
                params: {
                    supplier_id
                },
                method: 'POST',
                data: body,
                json: true
            });

            //console.log(data)
            setState({
                ...state,
                loading: false,
                results: res.data.data,
                pagination: res.data.pagination, //solo debe actualizarse el total
            });
        } catch (error) {
            console.log(error);
            setState({
                ...state,
                loading: false
            });
        }
    };

    const {classes} = props;

    return (
        <div className={classes.root}>
            <Box>
                <SearchControls buyers={state.buyers}
                                buyer_id={state.buyer_id}
                                setBuyer={setBuyer}
                                setProcurementMethod={setProcurementMethod}
                                procurementMethod={state.procurementMethod}
                                setSupplierName={setSupplierName}
                                supplierName={state.supplierName}
                                setInputText={setInputText}
                                inputText={state.inputText}
                                search={handleSearch}
                                setCycle={setCycle}
                                cycles={state.cycles}
                                cycle={state.cycle}
                                cleanup={cleanup}
                />
            </Box>

            <div style={{"overflow":"auto"}}>
                <TablaResultados
                    data={state.results}
                    pagination={state.pagination}
                    handleChangeRowsPerPage = {handleChangeRowsPerPage}
                    handleChangePage = {handlePageChange}
                    loading={state.loading}
                />

            </div>
        </div>
    );
}

export default withStyles(styles)(Busqueda);