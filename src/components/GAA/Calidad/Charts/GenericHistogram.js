import React from 'react';
import * as d3 from 'd3';
import {withStyles} from "@material-ui/core/styles";
import MoraData from '../mora_data.json';
import PropTypes from 'prop-types'

import {
    XAxis,
    YAxis,
    VerticalBarSeries,
    ChartLabel,
    Hint,
    makeWidthFlexible,
    XYPlot,
} from 'react-vis';

const styles = theme => {
};

const tipStyle = {
    display: 'flex',
    color: '#fff',
    background: '#666666',
    align: 'center',
    padding: '5px',
    fontSize: 12,
    fontWeight: 400,
    fontFamily: 'Noto Sans SC',
    borderRadius: 4,
    maxWidth: 150,
    alignItems: 'center'

};

class Histogram extends React.Component{

    state = {
        bins: [],
        value: false
    };

    render(){

        const {value} = this.state;
        const {width, yMin, yMax} = this.props;

        let map = MoraData.map(function(d,i){ return parseFloat(d.data_quality_eval); });

        var x = d3.scaleLinear()
            .rangeRound([0, width])
            .domain([d3.min(map), d3.max(map)]);


        var bins = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(4))
            (map);

        //console.log(d3.max(bins));

        let data = bins.map((b,i) => {
            return {x: b.x0+" - "+b.x1, y: b.length, color: '#3CB3E6'}
        });

        //let data=[ {x: 1, y: bins[0].length}];


        return (
            <div>

                {/*<svg id="chart" width="600" height="300"/>*/}

                <XYPlot
                    margin={{left: 100, bottom: 100}}
                    xType="ordinal"
                    width={width}
                    height={450}
                    yDomain={[yMin, yMax]}//{[yDomain.min, yDomain.max]}
                >
                    <VerticalBarSeries className="vertical-bar-series-example" data={data}
                               onValueMouseOver={v => this.setState({value: v})}
                               onSeriesMouseOut={v => this.setState({value: false})}
                               colorType="literal"
                    />
                    <XAxis tickLabelAngle={-45} />
                    <YAxis position="middle"/>
                    <ChartLabel
                        text="Frecuencia"
                        className="alt-y-label"
                        includeMargin={true}
                        xPercent={0.06}
                        yPercent={0.06}
                        style={{
                            transform: 'rotate(-90)',
                            textAnchor: 'end',
                            fontFamily: 'Noto Sans SC',
                        }}
                    />

                    <ChartLabel
                        text="Evaluación de la calidad de datos"
                        className="alt-x-label"
                        includeMargin={true}
                        xPercent={0.5}
                        yPercent={0.75}
                        style={{
                            //transform: 'rotate(-90)',
                            textAnchor: 'center',
                            fontFamily: 'Noto Sans SC',
                        }}
                    />

                    {value !== false &&
                    <Hint value={value} style={tipStyle} align>
                        <p>
                            Frecuencia: <b>{ value.y }</b>
                        </p>
                    </Hint>}
                </XYPlot>
            </div>
        )

    }

}

Histogram.propTypes = {
    width: PropTypes.number.isRequired
};

let FlexibleHistogram = makeWidthFlexible(Histogram);

export default withStyles(styles)(FlexibleHistogram);