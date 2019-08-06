import React, {Component} from 'react';

import {RadialChart, Hint} from 'react-vis';

export default class SimpleRadialChart extends Component {
    state = {
        value: false
    };
    render() {
        const {value} = this.state;
        return (
            <RadialChart
                className={'donut-chart-example'}
                innerRadius={70}
                radius={140}
                getAngle={d => d.theta}
                data={this.props.data/*[
                    {theta: 2, className: 'custom-class'},
                    {theta: 6},
                    {theta: 2},
                    {theta: 3},
                ]*/}
                onValueMouseOver={v => this.setState({value: v})}
                onSeriesMouseOut={v => this.setState({value: false})}
                width={300}
                height={300}
                padAngle={0.04}
                colorType="literal"
                //showLabels={true}
            >
                {value !== false && <Hint value={value} />}
            </RadialChart>
        );
    }
}