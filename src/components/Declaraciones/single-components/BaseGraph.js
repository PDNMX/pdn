import React, { Component } from "react";
import * as ConstClass from "../ConstValues.js";
import BarChart from "d3plus-react/es/src/BarChart";

class BaseGraph extends Component {
  state = {};

  componentDidMount() {
    let fakeData = [];
    let relacion = [
      "Declarante",
      "Conyugé",
      "Hijo/Hija",
      "Padre/Madre",
      "Suegro/Suegra",
      "Otro"
    ];

    let info = this.props.info;

    this.props.data.map(d => {
      d.amount.map((o, i) => {
        fakeData.push({
          name: d.name,
          amount: o,
          relacion: relacion[i]
        });

        return "";
      });
      return "";
    });

    let format = this.props.format;

    this.setState({
      methods: {
        data: fakeData,
        groupBy: "relacion",
        stacked: true,
        x: "name",
        y: "amount",
        xConfig: {
          title: info.xConfig
        },
        yConfig: {
          title: info.yConfig
        },
        tooltipConfig: {
          title: function(d) {
            return d["name"];
          },
          tbody: [
            [
              function(d) {
                return d["relacion"] + ": " + format(d["amount"]);
              }
            ]
          ]
        },
        height: 400,
        shapeConfig: {
          label: false,
          fill: d =>
            ConstClass.BarChartConf.colors[relacion.indexOf(d.relacion)]
        },
        legend: true,
        axes: {
          fill: "#666672"
        },
        title: info.title
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.methods && <BarChart config={this.state.methods} />}
      </div>
    );
  }
}

export default BaseGraph;
