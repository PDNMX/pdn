import React from 'react';
import {RadialChart} from "react-vis";
import {Box} from '@mui/material';

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

    return <Box display="flex" justifyContent="center" flexGrow={1}>
        <RadialChart colorType='literal' data={data} width={180} height={180}
                     style={{ stroke: '#d3d3d3', strokeWidth: '2px'}}/>
    </Box>
}

export default PieChart;