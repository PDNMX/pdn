import React from 'react';
import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    ChartLabel,
    Hint,
} from 'react-vis';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    chartLabel: {
        color: '#3e3 !important',
        fontSize: '24px !important'
    }
});

class Example extends React.Component {
    state = {
        useCanvas: false,
        value: false
    };

    render() {

        const {value} = this.state;

        const {classes} = this.props;

        const tipStyle = {
            display: 'flex',
            color: '#fff',
            background: '#666666',
            alignItems: 'center',
            padding: '5px',
            fontSize: 12,
            fontWeight: 400,
            fontFamily: 'Noto Sans SC',
            borderRadius: 4,
            maxWidth: 150,

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

        const {useCanvas} = this.state;
        const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;



        return (
            <div>
                <FlexibleWidthXYPlot
                    margin={{left: 100, bottom: 100}}
                    xType="ordinal"

                    height={450}
                    yDomain={[0, 25000]}//{[yDomain.min, yDomain.max]}
                >
                    <BarSeries className="vertical-bar-series-example" data={data}
                               onValueMouseOver={v => this.setState({value: v})}
                               onSeriesMouseOut={v => this.setState({value: false})}
                               colorType="literal"
                    />
                    <XAxis tickLabelAngle={-45}/>
                    <YAxis position="middle"/>
                    <ChartLabel
                        text="Millones de pesos"
                        //className="alt-y-label"
                        includeMargin={true}
                        xPercent={0.06}
                        yPercent={0.06}
                        style={{
                            transform: 'rotate(-90)',
                            textAnchor: 'end',
                            fontFamily: 'Noto Sans SC, "Helvetica", "Arial", "sans-serif"',
                        }}
                        className={classes.chartLabel}
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
                            fontFamily: 'Noto Sans SC'
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
                </FlexibleWidthXYPlot>
            </div>
        );
    }
}


export default withStyles(styles)(Example);