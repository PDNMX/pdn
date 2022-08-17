import React from 'react';
import {RadialChart} from "react-vis";

const PieChart = props => {
    const {color, value} = props;
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const remaining = 100 - value;

        setData([
            {angle: remaining, color: '#155065'},
            {angle: value, color: color},
        ]);
    },[]);


    React.useEffect(() => {
        const remaining = 100 - value;
        setData([
            {angle: remaining, color: '#155065'},
            {angle: value, color: color},
        ]);
    }, [value, color]);

    return <RadialChart colorType='literal' data={data} width={180} height={180}/>
}

export default PieChart;