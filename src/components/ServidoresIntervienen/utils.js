import * as d3 from 'd3'

/*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
export function createNodes(rawData, type) {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
    const maxAmount = type==='sanciones'?d3.max(rawData, d => +  d.sanciones_total): d3.max(rawData,d=> +d.monto_total);
    const minAmount = type==='sanciones'?d3.min(rawData,d=> d.sanciones_total) : d3.min(rawData, d=> d.monto_total);
    const promAmount = type==='sanciones'?d3.median(rawData,d=> d.sanciones_total) : d3.median(rawData, d=> d.monto_total);

    let pivote = (maxAmount-minAmount)/3;
    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
    const radiusScale = d3.scalePow()
        .exponent(0.5)
        .range([2, 85])
        .domain([0, maxAmount]);

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    let id=0;
    const myNodesSanciones = rawData.map(d => (
        {
        id: (id+1).toString(),
        radius: radiusScale(+d.sanciones_total),
        dependencia: d.dependencia,
        group: d.sanciones_total<=pivote?'low':(d.sanciones_total<=pivote*2?'medium':'high'),
        sancionesTotal : d.sanciones_total,
        montoTotal : d.monto_total,
        x: Math.random() * 900,
        y: Math.random() * 800,
    }));
    let id2=0;
    const myNodesMontos = rawData.map(d => (
        {
            id: (id2+1).toString(),
            radius: radiusScale(+d.monto_total),
            dependencia: d.dependencia,
            group: d.monto_total<=pivote?'low':(d.monto_total<=pivote*2?'medium':'high'),
            sancionesTotal : d.sanciones_total,
            montoTotal : d.monto_total,
            x: Math.random() * 900,
            y: Math.random() * 800,
        }));

    // sort them descending to prevent occlusion of smaller nodes.
    type==='sanciones'?myNodesSanciones.sort((a, b) => b.sancionesTotal - a.sancionesTotal):myNodesMontos.sort((a, b) => b.montoTotal - a.montoTotal);

    return type==='sanciones'? myNodesSanciones : myNodesMontos;
}

export const fillColor = d3.scaleOrdinal().domain(['low', 'medium', 'high']).range(['#B2DFDB', '#00897B', '#004D40']);
