import React from 'react';
import ShowcaseButton from './ShowcaseButton';

import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries,
    MarkSeriesCanvas,
    Hint
} from 'react-vis';

function getRandomData() {
    return new Array(100).fill(0).map(row => ({
        x: Math.random() * 10,
        y: Math.random() * 20,
        size: Math.random() * 10,
        color: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.5
    }));
}
const colorRanges = {
    typeA: ['#59E4EC', '#0D676C'],
    typeB: ['#EFC1E3', '#B52F93']
};

const randomData = getRandomData();
const nextType = {
    typeA: 'typeB',
    typeB: 'typeA'
};

const nextModeContent = {
    canvas: 'Cambiar a SVG',
    svg: 'Cambiar a CANVAS'
};

const drawModes = ['canvas', 'svg'];

export default class ScatterPlot extends React.Component {
    state = {
        drawMode: 0,
        data: randomData,
        colorType: 'typeA',
        value: false
    };

    render() {
        const {drawMode, data, colorType} = this.state;
        const markSeriesProps = {
            animation: true,
            className: 'mark-series-example',
            sizeRange: [5, 15],
            seriesId: 'my-example-scatterplot',
            colorRange: colorRanges[colorType],
            opacityType: 'literal',
            data,
            onNearestXY: value => this.setState({value})
        };

        const mode = drawModes[drawMode];
        return (
            <div className="canvas-wrapper">
                <div className="canvas-example-controls">
                    <div>{`Modo: ${mode}`}</div>
                    <ShowcaseButton
                        onClick={() => this.setState({drawMode: (drawMode + 1) % 2})}
                        buttonContent={nextModeContent[mode]}
                    />
                    <ShowcaseButton
                        onClick={() => this.setState({data: getRandomData()})}
                        buttonContent={'Actualizar datos'}
                    />
                    <ShowcaseButton
                        onClick={() => this.setState({colorType: nextType[colorType]})}
                        buttonContent={'Actualizar color'}
                    />
                </div>
                <XYPlot
                    onMouseLeave={() => this.setState({value: false})}
                    width={600}
                    height={300}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    {mode === 'canvas' && <MarkSeriesCanvas {...markSeriesProps} />}
                    {mode === 'svg' && <MarkSeries {...markSeriesProps} />}
                    {this.state.value ? <Hint value={this.state.value} /> : null}
                </XYPlot>
            </div>
        );
    }
}