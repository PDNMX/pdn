
import React from 'react';
//import ShowcaseButton from './ShowcaseButton';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    ChartLabel,
    Hint,
} from 'react-vis';

/*
const myDATA = [
    {id: '00036', y: 200400, x: 1504121437},
    {id: '00036', y: 200350, x: 1504121156},
    {id: '00036', y: 200310, x: 1504120874},
    {id: '00036', y: 200260, x: 1504120590},
    {id: '00036', y: 200210, x: 1504120306},
    {id: '00036', y: 200160, x: 1504120024},
    {id: '00036', y: 200120, x: 1504119740},
    {id: '00036', y: 200070, x: 1504119458},
    {id: '00036', y: 200020, x: 1504119177},
    {id: '00036', y: 199980, x: 1504118893},
    {id: '00036', y: 199930, x: 1504118611},
    {id: '00036', y: 199880, x: 1504118330},
    {id: '00036', y: 199830, x: 1504118048},
    {id: '00036', y: 199790, x: 1504117763},
    {id: '00036', y: 199740, x: 1504117481}
];

const yDomain = myDATA.reduce(
    (res, row) => {
        return {
            max: Math.max(res.max, row.y),
            min: Math.min(res.min, row.y)
        };
    },
    {max: -Infinity, min: Infinity}
);*/


export default class Example extends React.Component {
    state = {
        useCanvas: false,
        value: false
    };

    render() {

        const {value} = this.state;

        const tipStyle = {
            display: 'flex',
            color: '#fff',
            background: '#666666',
            alignItems: 'center',
            padding: '5px',
            fontSize: 12,
            fontWeight: 400,
            borderRadius: 4,
            maxWidth: 150

        };

        let colors = [
            '#25A8E6',
            '#3FB9F2',
            '#3CB3E6',
            '#359CCC',
            '#1B7AA6',
            '#2B7FA6',
            '#187099',
            '#096A99',
            '#145E80',
            '#1B4E66',
            '#00344D',
            '#0E4259'
        ];

        colors.reverse();

        let data = this.props.data.map((d,i) => {
            return {name: d.data._id[0].name , x: d.data._id[0].id, y: d.data.total/ 1000000, total: d.data.total, color: colors[i]};
        });

        console.log(this.props.data)

        const {useCanvas} = this.state;
        const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;




        return (
            <div>
                <XYPlot
                    margin={{left: 100, bottom: 100}}
                    xType="ordinal"
                    width={500}
                    height={450}
                    yDomain={[0, 25000]}//{[yDomain.min, yDomain.max]}
                >
                    <BarSeries className="vertical-bar-series-example" data={data}
                               onValueMouseOver={v => this.setState({value: v})}
                               onSeriesMouseOut={v => this.setState({value: false})}
                               colorType="literal"
                    />
                    <XAxis tickLabelAngle={-45} />
                    <YAxis position="middle"/>
                    <ChartLabel
                        text="Millones de pesos"
                        className="alt-y-label"
                        includeMargin={true}
                        xPercent={0.06}
                        yPercent={0.06}
                        style={{
                            transform: 'rotate(-90)',
                            textAnchor: 'end',
                        }}
                    />

                    <ChartLabel
                        text="Proveedores"
                        className="alt-x-label"
                        includeMargin={true}
                        xPercent={0.5}
                        yPercent={0.75}
                        style={{
                            //transform: 'rotate(-90)',
                            textAnchor: 'center',
                        }}
                    />

                    {value !== false &&
                    <Hint value={value} style={tipStyle}>
                        <div align="center">
                            <p>
                                {value.name}
                            </p>
                            <p>
                                <b>{ new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(value.total)}</b>
                            </p>
                        </div>
                    </Hint>}
                </XYPlot>
            </div>
        );
    }
}