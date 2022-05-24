import React, {useEffect, useState} from "react";
import GeneralData from "../../Compartidos/Dashboards/GeneralData";
import axios from "axios";

const aux = () => axios({
    url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getTotalRows',
    json: true,
    method: "GET"
});

const TotalRows = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(false);

    React.useEffect(() => {
        aux().then(res => {
                setData({
                    digit: parseInt(res.data.data[0].count,10),
                    text: 'registros'
                })
            })
        .catch(error => {
            console.error(error);
            setError(true);
        });
    },[]);

    return(
        <GeneralData digit={data.digit} text={data.text}/>
    );
}

export default TotalRows;