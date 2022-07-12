import React, {useState} from "react";
import GeneralData from "@Compartidos/Dashboards/GeneralData";
import axios from "axios";

const aux = () => axios({
    url: process.env.REACT_APP_S3P_BACKEND + '/charts/getTotalMultas',
    json: true,
    method: "GET"
});

const TotalRows = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(false);

    React.useEffect(() => {
        aux().then(res => {
            setData({
                digit: parseInt(res.data.data[0].total,10),
                text: 'en multas del 2004 al 2022'
            })
        })
            .catch(error => {
                console.error(error);
                setError(true);
            });
    },[]);

    return(
        <GeneralData digit={data.digit} text={data.text} currency={true}/>
    );
}

export default TotalRows;