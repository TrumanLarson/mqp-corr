import { buildChart } from '../base/buildChart.js'


const disToLine = (x, y, inner_width, inner_height) => {
    let x1 = 0
    let x2 = inner_width
    let y1 = inner_height
    let y2 = 0

    let m = (y2 - y1) / (x2 - x1)
    let C = (m * x2) - y2
    let B = 1
    let A = -m
    return ((A * x) + (B * y) + C) / Math.sqrt((A * A) + (B * B))
}


const drawDistances = (data, svg, specs, color) => {
    const inner_height = specs.height - specs.margin.bottom;
    const inner_width = specs.width - specs.margin.left - specs.margin.right;
    const xAry = data.map(d => d[0]);
    const yAry = data.map(d => d[1]);
    var xScale = d3.scaleLinear().range([0, inner_width]);
    var yScale = d3.scaleLinear().range([inner_height, 0]);
    xScale.domain([d3.min(xAry), d3.max(xAry)]).range([0 + 10, inner_width - 10]);
    yScale.domain([d3.min(yAry), d3.max(yAry)]).range([inner_height - 10, 0 + 10]);

    const root2 = Math.sqrt(2)
    const line = d3.line().context(null)

    svg.selectAll('.dis')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'dis')
        .attr('d', d => {
            const dis = disToLine(xScale(d[0]), yScale(d[1]), inner_width, inner_height)
            let angle = 42.75
            return line([
                [xScale(d[0]), yScale(d[1])],
                [xScale(d[0]) - (dis * Math.cos(angle * Math.PI / 180)), yScale(d[1]) - (dis * Math.sin(angle * Math.PI / 180))]
            ])
        })
        .attr("stroke", color)
        .attr("opacity", 0.5)

    // const length = path.node().getTotalLength();

    // path.attr("stroke-dasharray", length + " " + length)
    //     .attr("stroke-dashoffset", length)
    //     .transition()
    //     .ease(d3.easeLinear)
    //     .attr("stroke-dashoffset", 0)
    //     .duration(specs.animationDuration / 2)

}


export function distance(data1, data2, specs, r1, r2) {
    const svg = d3.select('#container')
        .append('svg').attr('width', specs.width * 2).attr('height', specs.height)
    buildChart(data1, data2, svg, specs, r1, r2, drawDistances)
}