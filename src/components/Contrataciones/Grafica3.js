import React from 'react';
import "./css/Grafica1.css"
import * as d3 from 'd3';
import dataFile from '../../data/contratosPeriodo'

class Grafica3 extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.drawChart();
    }


    drawChart = () => {

        let node = this.node;
        function draw() {
            var margin = {top: 20, right: 20, bottom: 30, left: 100},
                width = 800 - margin.left - margin.right,
                height = 300 - margin.top - margin.bottom;
            var div = d3.select(node).append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);


            var svg = d3.select(node).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            var parseTime = d3.timeParse("%d-%m-%Y");

            var x = d3.scaleTime()
                .rangeRound([0, width]);

            var y = d3.scaleLinear()
                .rangeRound([height, 0]);

            var area = d3.area()
                .x(function(d) { return x(d.date); })
                .y1(function(d) { return y(d.noContratos); });

            var focus = svg.append("g")
                .attr("class", "focus")
                .style("display", "none");

            focus.append("circle")
                .attr("r", 5);

            focus.append("text")
                .attr("x", 9)
                .attr("dy", ".35em")
                .style("font-size",15);

            var focus2 = svg.append("g")
                .attr("class", "focus")
                .style("display", "none");

            var bisectDate = d3.bisector(function(d) {
                return d.date;
            }).left;

            function mousemove() {
                var x0 = x.invert(d3.mouse(this)[0]),
                    i = bisectDate(dataFile, x0, 1),
                    d0 = dataFile[i - 1],
                    d1 = dataFile[i],
                    d= x0 - d0.date > d1.date - x0 ? d1 : d0;
                //var depl=parseFloat(d['Safari'])+parseFloat(d['Opera'])+parseFloat(d['Firefox']);
                focus.attr("transform", "translate(" + x(d.date) + "," + (500 - margin.top - margin.bottom)*50/100+ ")");
                focus.select("text").text("test");
            }
            //

            dataFile.forEach(function (data) {
                var s = "01-"+data._id.mes+"-"+data._id.anio;
                data.date = parseTime(s);
            });

            x.domain(d3.extent(dataFile, function(d) {
                return d.date;
                }));
            y.domain([0, d3.max(dataFile, function(d) {
                return d.noContratos;
            })]);

            area.y0(y(0));

            svg.append("path")
                .datum(dataFile)
                .attr("class", "area")
                .attr("d", area);

            // add the x Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            svg.append("g")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Número de contratos");
            //

            /*svg.append("rect")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", function() {
                    focus.style("display", null);
                })
                .on("mouseout", function() {
                    focus.style("display", "none");
                })
                .on("mousemove", mousemove);
                */

        }
        draw();
        }
    render() {
        return (
            <div ref={node=> this.node=node}>
            </div>

        );
    }
}

export default Grafica3;