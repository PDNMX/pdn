/*import React from 'react';
import ReactDOM from 'react-dom';
import LineChart from 'react-d3';
import Chart from 'react-d3-core';
*/
var React = require('react');
var ReactDOM = require('react-dom');
var LineChart = require('react-d3').LineChart;
var Chart = require('react-d3-core').Chart;

/*
function LineTest(){
    // load your general data
    var chartData = [
        {"name":"Darron Weissnat IV","BMI":20.72,"age":39,"birthday":"2005-01-03T00:00:00.000Z","city":"East Russel","married":false,"index":0}
        ,
        {"name":"Pablo Ondricka","BMI":19.32,"age":38,"birthday":"1974-05-13T00:00:00.000Z","city":"Lake Edytheville","married":false,"index":1}
        ,
        {"name":"Mr. Stella Kiehn Jr.","BMI":16.8,"age":34,"birthday":"2003-07-25T00:00:00.000Z","city":"Lake Veronicaburgh","married":false,"index":2}
        ,
        {"name":"Lavon Hilll I","BMI":20.57,"age":12,"birthday":"1994-10-26T00:00:00.000Z","city":"Annatown","married":true,"index":3}
        ,
        {"name":"Clovis Pagac","BMI":24.28,"age":26,"birthday":"1995-11-10T00:00:00.000Z","city":"South Eldredtown","married":false,"index":4}
        ,
        {"name":"Gaylord Paucek","BMI":24.41,"age":30,"birthday":"1975-06-12T00:00:00.000Z","city":"Koeppchester","married":true,"index":5}
        ,
        {"name":"Ashlynn Kuhn MD","BMI":23.77,"age":32,"birthday":"1985-08-09T00:00:00.000Z","city":"West Josiemouth","married":false,"index":6}

    ];

    var width = 700,
        height = 300,
        margins = {left: 100, right: 100, top: 50, bottom: 50},
        title = "User sample",
        // chart series,
        // field: is what field your data want to be selected
        // name: the name of the field that display in legend
        // color: what color is the line
        chartSeries = [
            {
                field: 'BMI',
                name: 'BMI',
                color: '#ff7f0e'
            }
        ],
        // your x accessor
        x = function(d) {
            return d.index;
        }

    ReactDOM.render(

        <Chart
            title={title}
            width={width}
            height={height}
            margins= {margins}
        >
            <LineChart
                showXGrid= {false}
                showYGrid= {false}
                margins= {margins}
                title={title}
                data={chartData}
                width={width}
                height={height}
                chartSeries={chartSeries}
                x={x}
            />
        </Chart>
        , document.getElementById('line-user')
    )

}

export default (LineTest);
*/


(function() {
    // load your general data
    var chartData = [
        {"name":"Darron Weissnat IV","BMI":20.72,"age":39,"birthday":"2005-01-03T00:00:00.000Z","city":"East Russel","married":false,"index":0}
        ,
        {"name":"Pablo Ondricka","BMI":19.32,"age":38,"birthday":"1974-05-13T00:00:00.000Z","city":"Lake Edytheville","married":false,"index":1}
        ,
        {"name":"Mr. Stella Kiehn Jr.","BMI":16.8,"age":34,"birthday":"2003-07-25T00:00:00.000Z","city":"Lake Veronicaburgh","married":false,"index":2}
        ,
        {"name":"Lavon Hilll I","BMI":20.57,"age":12,"birthday":"1994-10-26T00:00:00.000Z","city":"Annatown","married":true,"index":3}
        ,
        {"name":"Clovis Pagac","BMI":24.28,"age":26,"birthday":"1995-11-10T00:00:00.000Z","city":"South Eldredtown","married":false,"index":4}
        ,
        {"name":"Gaylord Paucek","BMI":24.41,"age":30,"birthday":"1975-06-12T00:00:00.000Z","city":"Koeppchester","married":true,"index":5}
        ,
        {"name":"Ashlynn Kuhn MD","BMI":23.77,"age":32,"birthday":"1985-08-09T00:00:00.000Z","city":"West Josiemouth","married":false,"index":6}

    ];
    var width = 700,
        height = 300,
        margins = {left: 100, right: 100, top: 50, bottom: 50},
        title = "User sample",
        // chart series,
        // field: is what field your data want to be selected
        // name: the name of the field that display in legend
        // color: what color is the line
        chartSeries = [
            {
                field: 'BMI',
                name: 'BMI',
                color: '#ff7f0e'
            }
        ],
        // your x accessor
        x = function(d) {
            return d.index;
        }

    ReactDOM.render(
            <div>
                <button onClick={this.onClick}>toggle</button>
            <Chart
            title={title}
            width={width}
            height={height}
            margins= {margins}
            >
            <LineChart
                showXGrid= {false}
                showYGrid= {false}
                margins= {margins}
                title={title}
                data={chartData}
                width={width}
                height={height}
                chartSeries={chartSeries}
                x={x}
            />
        </Chart>
                />
            </div>

    )
})()
