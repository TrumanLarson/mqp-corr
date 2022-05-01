import { buildChart } from '../base/buildChart.js'

const ellipseMath = function(r) {
    var avgX = 150,
        avgY = 150,
        sdX = 300 * 0.2,
        sdY = 300 * 0.2,
        N = 100,
        alpha = 0.05,
        A = sdY * sdY,
        B = -1 * r * sdY * sdX,
        C = sdX * sdX,
        D = (N + 1) * 2 * (N - 1) / (N * (N - 2)) * sdX * sdX * sdY * sdY * (1 - r * r) * jStat.centralF.pdf(alpha, 2, N - 2),
        a = Math.sqrt(2 * D / (A + C - Math.sqrt((A - C) * (A - C) + 4 * B * B))),
        b = Math.sqrt(2 * D / (A + C + Math.sqrt((A - C) * (A - C) + 4 * B * B)))
    if (a < 1 || !a)
        a = 1
    if (b < 1 || !b)
        b = 1
    return {
        ellipse_minor: b * 2,
        ellipse_major: a * 2,
        ellipse_area: Math.PI * a * b,
        ellipse_ratio: b / a,
        ellipse_ratio_reverse: a / b
    }
}

const drawEllipse = (data, svg, specs, color, r) => {
    const inner_height = specs.height - specs.margin.bottom;
    const inner_width = specs.width - specs.margin.left - specs.margin.right;
    const xAry = data.map(d => d[0]);
    const yAry = data.map(d => d[1]);
    var xScale = d3.scaleLinear().range([0, inner_width]);
    var yScale = d3.scaleLinear().range([inner_height, 0]);
    xScale.domain([d3.min(xAry), d3.max(xAry)]).range([0 + 10, inner_width - 10]);
    yScale.domain([d3.min(yAry), d3.max(yAry)]).range([inner_height - 10, 0 + 10]);

    const cx = (inner_width) / 2
    const cy = (inner_height) / 2
    const ellipseData = ellipseMath(r)

    svg.append('ellipse')
        .attr('rx', 0)
        .attr('ry', 0)
        .attr('stroke', color)
        .attr('fill', color)
        .attr('opacity', .1)
        .attr('transform', 'translate(' + cx + ',' + cy + ') rotate(41.75)')
        .transition().duration(specs.animationDuration / 2)
        .attr('rx', ellipseData.ellipse_minor)
        .attr('ry', ellipseData.ellipse_major)

    svg.append('ellipse')
        .attr('rx', 0)
        .attr('ry', 0)
        .attr('stroke', color)
        .attr('fill', 'none')
        .attr('transform', 'translate(' + cx + ',' + cy + ') rotate(41.75)')
        .transition().duration(specs.animationDuration / 2)
        .attr('rx', ellipseData.ellipse_minor)
        .attr('ry', ellipseData.ellipse_major)

}



export function ellipse(data1, data2, specs, r1, r2) {
    const svg = d3.select('#container')
        .append('svg').attr('width', specs.width * 2).attr('height', specs.height)
    buildChart(data1, data2, svg, specs, r1, r2, drawEllipse)
}