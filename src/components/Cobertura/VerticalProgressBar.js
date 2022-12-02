import React from 'react';
import withStyles from "@mui/styles/withStyles";
import {v4 as uuidv4} from 'uuid';

const styles = theme => ({
    emptySpace: {
        background: '#155065'//theme.palette.background.opaque
    }
})
// Progress bar settings
const width = 50;
const height = 200

const VerticalProgressBar = props => {
    // value must be between 0 and 100
    const {value, color, classes} = props;
    const id = uuidv4();
    React.useEffect(() => {
        const c = document.getElementById(id);
        const ctx = c.getContext("2d");

        const fill_height = (height / 100) * value;
        const y_value = height - fill_height;

        // Progress
        ctx.fillStyle = color;
        ctx.fillRect(0, y_value, width, fill_height);

        /* Empty section
        ctx.fillStyle = '#fff000';
        ctx.fillRect(0, 0, width, 170);
        */
    },[]);


    React.useEffect(() => {
        const c = document.getElementById(id);
        const ctx = c.getContext("2d");

        const fill_height = (height / 100) * value;
        const y_value = height - fill_height;


        //borrar el color anterior
        ctx.fillStyle = '#155065';
        ctx.fillRect(0, 0, width, height);

        // Progress
        ctx.fillStyle = color;

        ctx.fillRect(0, y_value, width, fill_height);
    }, [value]);

    return <canvas id={id} width={width} height={height} style={{
        border: "2px", borderStyle: "solid", color: "#d3d3d3",
        borderRadius: "30px 30px 0px 0",
    }}
                   className={classes.emptySpace}
    />
}


export default withStyles(styles)(VerticalProgressBar);