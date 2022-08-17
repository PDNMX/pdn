import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress, ) (( { theme, bgcolor}) => ({
    height: 40,
    borderRadius: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.background.opaque,//theme.palette.grey['200']
        border: "2px", borderStyle: "solid", color: "#d3d3d3",
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 30,
        backgroundColor: bgcolor
    },
}));

export default function CustomizedProgressBar(props) {
    const {color, value} = props;
    console.log(color)

    return (
        <Box sx={{ flexGrow: 1 }} p={1}>
            <BorderLinearProgress variant="determinate" value={value} bgcolor={color}/>
        </Box>
    );
}
