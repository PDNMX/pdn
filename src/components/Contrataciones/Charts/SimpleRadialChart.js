import React, {Component} from 'react';

import {RadialChart, Hint} from 'react-vis';


const AmountTooltip  = props => {
    return (
        <div>
            <p>
                <b>{props.value.type}</b>
            </p>
            <p>
                Porcentaje:
                <br/>
                <b>{props.value.label}</b>
            </p>
            <p>
                Monto gastado:
            <br/>
                <b>{new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(props.value.theta)}</b>
            </p>
        </div>
    );
};


const CountTooltip  = props => {
    return (
        <div>
            <p>
                <b>{props.value.type}</b>
            </p>
            <p>
                Porcentaje:
                <br/>
                <b>{props.value.label}</b>
            </p>
            <p>
                Número de contrataciones:
            <br/>
                <b>{
                    //props.value.theta.toFixed(0)
                    new Intl.NumberFormat('es-MX').format(props.value.theta)
                }</b>
            </p>
        </div>
    );
};

export default class SimpleRadialChart extends Component {
    state = {
        value: false
    };
    render() {
        const {value} = this.state;


        const tipStyle = {
            display: 'flex',
            color: '#fff',
            background: '#666666',
            //alignItems: 'left',
            padding: '5px',
            fontSize: 12,
            fontWeight: 400,
            borderRadius: 4,
            fontFamily: 'Noto Sans SC'
        };

        return (
            <RadialChart
                className={'donut-chart-example'}
                innerRadius={65}
                radius={130}
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
                showLabels={false}
                labelsStyle={{
                    fontSize: 10
                }}
            >
                {value !== false &&
                <Hint value={value}>
                    <div style={tipStyle}>

                        {this.props.dataType === 'amounts'?
                            <AmountTooltip value={value}/>:
                            <CountTooltip value={value}/>
                        }
                    </div>
                </Hint>}
            </RadialChart>
        );
    }
}