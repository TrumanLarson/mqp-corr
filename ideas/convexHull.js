import { buildChart } from '../base/buildChart.js'

const drawConvexHull = (data, svg, specs, color) => {
    const inner_height = specs.height - specs.margin.bottom;
    const inner_width = specs.width - specs.margin.left - specs.margin.right;
    const xAry = data.map(d => d[0]);
    const yAry = data.map(d => d[1]);
    var xScale = d3.scaleLinear().range([0, inner_width]);
    var yScale = d3.scaleLinear().range([inner_height, 0]);
    xScale.domain([d3.min(xAry), d3.max(xAry)]).range([0 + 10, inner_width - 10]);
    yScale.domain([d3.min(yAry), d3.max(yAry)]).range([inner_height - 10, 0 + 10]);

    let pathData = convexhull.makeHull(data.map(d => { return { x: xScale(+d[0]), y: yScale(+d[1]) } }))
    pathData = pathData.map(d => [d.x, d.y])
    pathData.push(pathData[0])
    const line = d3.line().context(null)
    svg.append("path")
        .attr('d', line(pathData))
        .attr('stroke', color)
        .attr('fill', color)
        .attr('opacity', .1)

    svg.append("path")
        .attr('d', line(pathData))
        .attr('stroke', color)
        .attr('fill', 'none')
        .attr('opacity', 1)
}

export function convexHull(data1, data2, specs, r1, r2) {
    const svg = d3.select('#container')
        .append('svg').attr('width', specs.width * 2).attr('height', specs.height)
    buildChart(data1, data2, svg, specs, r1, r2, drawConvexHull)
}