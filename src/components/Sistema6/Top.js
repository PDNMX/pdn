import React from 'react';
import {withStyles} from '@mui/styles';
import Typography from "@mui/material/Typography";
import NivoBar from "./Charts/NivoBar";
import NivoBarSuppliers from "./Charts/NivoBarSuppliers";
import axios from 'axios';
import Grid from '@mui/material/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

const CustomTypography = withStyles(theme => ({
    root: {
        color: theme.palette.text.main
    }
}))(Typography);

const Top = props =>  {
    const {classes, dataSupplier} = props;
    const [barChartData, setBarChartData] = React.useState([]);
    const [suppliers, setSuppliers] = React.useState([]);

    React.useEffect(() => {
        //console.log("Data supplier: ", dataSupplier);
        //alert(dataSupplier);
        const supplier_id = dataSupplier;

        const _buyers = () => axios({
            url: process.env.REACT_APP_S6_BACKEND + '/api/v1/top/10/buyers',
            params: {
                supplier_id
            },
            method :'GET',
            json: true
        });

        const _suppliers = () => axios({
            url: process.env.REACT_APP_S6_BACKEND + '/api/v1/top/10/suppliers',
            params: {
                supplier_id
            },
            method :'GET',
            json: true
        });

        Promise.all([_buyers(), _suppliers()]).then(res => {
            //console.log(JSON.stringify(res))
            setBarChartData(res[0].data);
            setSuppliers(res[1].data);
        }).catch(error => {
            console.log(error);
        });
    },[dataSupplier]);

    return(
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <CustomTypography variant="h6" color="textPrimary" paragraph>Top 10 unidades compradoras</CustomTypography>
                    {/*barChartData && barChartData.length > 0 &&
                        <BarChart data={barChartData}/>
                    */}

                    {barChartData && barChartData.length > 0 &&
                        <div style={{height: 400}}>
                            <NivoBar data={barChartData}/>
                        </div>
                    }
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <CustomTypography variant="h6" color="textPrimary" paragraph> Top 10 proveedores</CustomTypography>
                    {/*suppliers && suppliers.length > 0 &&
                        <SuppliersBarChart data={suppliers}/>
                    */}

                    {suppliers && suppliers.length > 0 &&
                        <div style={{height: 400}}>
                            <NivoBarSuppliers data={suppliers}/>
                        </div>
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Top);
