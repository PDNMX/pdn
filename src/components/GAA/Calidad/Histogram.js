import React from 'react';
import  * as d3 from 'd3';
import mora_data from './mora_data';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalRectSeries
} from 'react-vis';


export default class Example extends React.Component {



    render() {


        //let data = mora_data.map((e,i) => ({x0: i+1, x: i, y: e.data_quality_eval}));
        let width = 300;

        // X axis: scale and draw:
        var x = d3.scaleLinear()
            .domain([0, 5])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
            .range([0, width]);


        // set the parameters for the histogram
        var histogram = d3.histogram()
            .value(function(d) { return +d.data_quality_eval})//price; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(5)//x.ticks(4)); // then the numbers of bins

        // And apply this function to data to get the bins
        var bins = histogram(mora_data);

        //console.log(bins);

        let data = bins.map((d,i) => ({x0: i+1,  x: i,  y: d.length}));
        console.log(data)


        return (
            <XYPlot
                //xDomain={[timestamp - 2 * ONE_DAY, timestamp + 30 * ONE_DAY]}
                xDomain={[0, 5]}
                yDomain={[0, 15]}
                //xType="time"
                width={300}
                height={300}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalRectSeries data={data} style={{stroke: '#fff'}} />
            </XYPlot>
        );

    }

}