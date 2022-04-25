import { createChart } from "../base/chart.js"
import { animateMerge } from "../addons/merge.js";
import { drawTrendline } from "../addons/trendline.js";


const disToLine = (x, y, inner_width, inner_height) => {
    let x1 = 10
    let x2 = inner_width - 10
    let y1 = inner_height - 10
    let y2 = 10
    let m = (y2 - y1) / (x2 - x1)
    let C = (m * x2) - y2
    let B = 1
    let A = -m
    console.log(Math.sqrt((A * A) + (B * B)))
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
            return line([
                [xScale(d[0]), yScale(d[1])],
                [xScale(d[0]) - (dis / root2), yScale(d[1]) - (dis / root2)]
            ])
        })
        .attr("stroke", color)
}


const buildChart = (data1, data2, svg, specs, r1, r2) => {
    console.log("building distances...")
    const g1 = svg.append("g")
    const g2 = svg.append("g").attr("transform", "translate(400, 0)")


    createChart(g1, specs.width, specs.height, data1, specs.color1)
    createChart(g2, specs.width, specs.height, data2, specs.color2)

    drawDistances(data1, g1, specs, specs.color1)
    drawDistances(data2, g2, specs, specs.color2)

    drawTrendline(data1, g1, specs)
    drawTrendline(data2, g2, specs)

    animateMerge(g1, g2, specs)
}


export function distance(data1, data2, specs, r1, r2) {
    const svg = d3.select('#container')
        .append('svg').attr('width', specs.width * 2).attr('height', specs.height)
    buildChart(data1, data2, svg, specs, r1, r2)
}