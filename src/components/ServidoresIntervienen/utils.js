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
    console.log("type:  ",type);
   console.log("rawData: ",rawData);
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
    const maxAmount = type === 'sanciones' ? d3.max(rawData, d => +d.sanciones_total) : type === 'monto' ? d3.max(rawData, d => +d.monto_total): d3.max(rawData, d => d.numero_servidores);
    const minAmount = type === 'sanciones' ? d3.min(rawData, d => d.sanciones_total) : type === 'monto' ?  d3.min(rawData, d => d.monto_total): d3.min(rawData, d => d.numero_servidores);
    const promAmount = type === 'sanciones' ? d3.median(rawData, d => d.sanciones_total) : type === 'monto' ? d3.median(rawData, d => d.monto_total): d3.median(rawData, d=> d.numero_servidores);

    let pivote = (maxAmount - minAmount) / 10;
    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
    let max = type!=='servidores'? 100 : 80;
    const radiusScale = d3.scalePow()
        .exponent(0.5)
        .range([5, max])
        .domain([0, maxAmount]);

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.

    let id3=0;
    const myNodesServidores = rawData.map(d =>(
        {
            id: (id3 + 1).toString(),
            radius: radiusScale(+d.numero_servidores),
            institucion : d.institucion,
            group: d.numero_servidores <= pivote ? 'n1' : (d.numero_servidores <= pivote * 2 ? 'n2' : d.numero_servidores <= pivote * 3 ? 'n3': d.numero_servidores <= pivote *4 ? 'n4' : d.numero_servidores <= pivote * 5 ? 'n5' : d.numero_servidores <= pivote*6 ? 'n6': d.numero_servidores <= pivote*7 ? 'n7': d.numero_servidores<= pivote* 8 ? 'n8': d.numero_servidores <= pivote * 9 ? 'n9': 'n10'),
            numero_servidores: d.numero_servidores,
            x: Math.random() * 900,
            y: Math.random() * 800,
        }
    ));

    // sort them descending to prevent occlusion of smaller nodes.

    myNodesServidores.sort((a,b) => b.numero_servidores -  a.numero_servidores);

    return myNodesServidores;
}

export const fillColor = d3.scaleOrdinal().domain(['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10']).range(['#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c'],);