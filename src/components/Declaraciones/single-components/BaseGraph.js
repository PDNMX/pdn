import React, { Component } from "react";
import * as ConstClass from "../ConstValues.js";

let d3 = Object.assign({}, require("d3-scale"), require("d3-array")),
  uniqid = require("uniqid");

class BaseGraph extends Component {
  render() {
    let conf = ConstClass.BarChartConf,
      data = this.props.data,
      width = conf.width,
      gutter = conf.bars.height + conf.bars.margin,
      height = conf.margin.top + conf.margin.bottom + data.length * gutter,
      hfunc = index => gutter * index + conf.margin.top,
      realWidth = width - conf.margin.left - conf.margin.right,
      realHeight = data.length * gutter,
      labelRightMargin = realWidth * conf.labelsWidthPercent,
      barsLeftMargin = realWidth * conf.dividerWidthPerecent + labelRightMargin,
      barsMaxWidth = realWidth * conf.barsWidthPercent,
      scale = this.makeScale(data, barsMaxWidth),
      _ticks = scale.ticks(5);

    return (
      <svg
        id="resume-graph"
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
      >
        {/* las líneas guías */}
        {this.drawLines(
          realWidth * conf.barsWidthPercent,
          8,
          conf.margin.top / 1.5,
          realHeight,
          barsLeftMargin
        )}

        {/* las etiquetas y las barras */}
        {data.map((d, i) => (
          <g key={uniqid()}>
            <text textAnchor="end" x={labelRightMargin} y={hfunc(i)}>
              {d.name}
            </text>

            {this.makeBars(d.amount, barsLeftMargin, hfunc, conf, scale, i)}
          </g>
        ))}

        {/* las guías numéricas (top) */}
        {this.makeNumGuides(_ticks, barsLeftMargin, conf.margin.top / 2, scale)}

        {/* las guías numéricas (bottom) */}
        {this.makeNumGuides(
          _ticks,
          barsLeftMargin,
          realHeight + conf.margin.top,
          scale
        )}
      </svg>
    );
  }

  /*
   * T E M P L A T E S
   * ----------------------------------------------------------------------
   */

  makeBars(data, lmargin, hfunc, conf, scale, j) {
    let bars,
      slider = lmargin;

    bars = data.map((d, i) => {
      if (!d) {
        return null;
      } else {
        let r = (
          <rect
            key={uniqid()}
            style={{ fill: conf.colors[i] }}
            x={slider}
            y={hfunc(j) - conf.bars.height / 2}
            width={scale(d)}
            height={conf.bars.height}
          />
        );

        slider = slider + (scale(d) || 0);
        return r;
      }
    });

    return bars;
  }
  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  makeNumGuides(ticks, _x, y, scale) {
    let format = this.props.format,
      guides;

    guides = ticks.map(d => (
      <text x={scale(d) + _x} y={y} key={uniqid()}>
        {" "}
        {format(d)}{" "}
      </text>
    ));

    return guides;
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  drawLines(width, total, y0, y1, _x) {
    let spacing = width / total,
      lines = [],
      i;

    for (i = 0; i <= total; i++) {
      let x = spacing * i + _x;

      lines.push(
        <line
          x1={x}
          x2={x}
          y1={y0}
          y2={y0 + y1}
          style={{ stroke: "black" }}
          key={uniqid()}
        />
      );
    }

    return lines;
  }

  /*
   * M E T H O D S
   * ----------------------------------------------------------------------
   */

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  makeScale(data, barsMaxWidth) {
    let values = data.map(d => d.amount.reduce(ConstClass.reducer));

    return d3
      .scaleLinear()
      .domain([0, d3.max(values)])
      .range([0, barsMaxWidth]);
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default BaseGraph;
