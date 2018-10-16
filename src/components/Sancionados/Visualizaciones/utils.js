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
    const maxAmount = d3.max(rawData, d => +  d.total_sanciones);
    const minAmount = d3.min(rawData,d=> d.total_sanciones);

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
    const myNodesServidores = rawData.map(d => (
        {
            id: (id+1).toString(),
            radius: radiusScale(+d.total_sanciones),
            dependencia: d.dependencia,
            group: d.total_sanciones<=pivote?'low':(d.total_sanciones<=pivote*2?'medium':'high'),
            sancionesTotal : d.total_sanciones,
            x: Math.random() * 900,
            y: Math.random() * 800,
        }));
    let id2=0;
    const myNodesParticulares = rawData.map(d => (
        {
            id: (id2+1).toString(),
            radius: radiusScale(+d.total_sanciones),
            dependencia: d.dependencia,
            group: d.total_sanciones<=pivote?'low':(d.total_sanciones<=pivote*2?'medium':'high'),
            sancionesTotal : d.total_sanciones,
            x: Math.random() * 900,
            y: Math.random() * 800,
        }));

    // sort them descending to prevent occlusion of smaller nodes.
    type===1?myNodesServidores.sort((a, b) => b.sancionesTotal - a.sancionesTotal):myNodesParticulares.sort((a, b) => b.sancionesTotal - a.sancionesTotal);

    return type===1? myNodesServidores : myNodesParticulares;
}

export const fillColor = d3.scaleOrdinal().domain(['low', 'medium', 'high']).range(['#B2DFDB', '#009688', '#FFC107']);
