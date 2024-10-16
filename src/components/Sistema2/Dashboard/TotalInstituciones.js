import React, {useState} from "react";
import GeneralData from "@Compartidos/Dashboards/GeneralData";
import axios from "axios";

const aux = () => axios({
    url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getTotalInstituciones',
    json: true,
    method: "GET"
});

const TotalInstituciones = () => {
    const [data, setData] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(false);

    React.useEffect(() => {
        aux().then(res => {
            setData({
                digit: parseInt(res.data.data[0].count, 10),
                text: 'Instituciones federales'
            })
        }).catch(error => {
                console.error(error);
                setError(true);
            });
    }, []);

    return (
        <GeneralData digit={data.digit} text={data.text}/>
    );
}

export default TotalInstituciones;