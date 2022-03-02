import { createChart } from "./chart.js"


const animationDuration = 2500

const margin = {
    left: 40,
    top: 20,
    right: 20,
    bottom: 20,
};


const ellipse = function(r) {
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

const drawEllipse = (data, svg, width, height, color, r) => {
    const inner_height = height - margin.bottom;
    const inner_width = width - margin.left - margin.right;
    const xAry = data.map(d => d[0]);
    const yAry = data.map(d => d[1]);
    var xScale = d3.scaleLinear().range([0, inner_width]);
    var yScale = d3.scaleLinear().range([inner_height, 0]);
    xScale.domain([d3.min(xAry), d3.max(xAry)]).range([0 + 10, inner_width - 10]);
    yScale.domain([d3.min(yAry), d3.max(yAry)]).range([inner_height - 10, 0 + 10]);

    const cx = (inner_width) / 2
    const cy = (inner_height) / 2

    const ellipseData = ellipse(r)
    console.log(ellipseData)
    svg.append('ellipse')
        .attr('rx', 0)
        .attr('ry', 0)
        .attr('stroke', color)
        .attr('fill', color)
        .attr('opacity', .1)
        .attr('transform', 'translate(' + cx + ',' + cy + ') rotate(49)')
        .transition().duration(animationDuration / 2)
        .attr('rx', ellipseData.ellipse_minor)
        .attr('ry', ellipseData.ellipse_major)

    svg.append('ellipse')
        .attr('rx', 0)
        .attr('ry', 0)
        .attr('stroke', color)
        .attr('fill', 'none')
        .attr('transform', 'translate(' + cx + ',' + cy + ') rotate(49)')
        .transition().duration(animationDuration / 2)
        .attr('rx', ellipseData.ellipse_minor)
        .attr('ry', ellipseData.ellipse_major)

}

const drawTrendline = (data, svg, width, height) => {
    const inner_height = height - margin.bottom;
    const inner_width = width - margin.left - margin.right;

    const lineData = [
        [0 + 10, inner_width - 10],
        [inner_height - 10, 0 + 10]
    ]

    const line = d3.line().context(null)


    const path = svg.append("path")
        .attr('d', line(lineData))
        .attr('stroke', "black")

    const length = path.node().getTotalLength();

    path.attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length)
        .transition()
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .duration(animationDuration / 2)
}

const buildChart = (data1, data2, svg, width, height, r1, r2) => {
    console.log("building idea 2...")
    const g1 = svg.append("g")
    const g2 = svg.append("g").attr("transform", "translate(400, 0)")

    const color1 = 'green'
    const color2 = 'blue'

    createChart(g1, width, height, data1, 'green')
    createChart(g2, width, height, data2, 'blue')

    drawEllipse(data1, g1, width, height, color1, r1)
    drawEllipse(data2, g2, width, height, color2, r2)

    drawTrendline(data1, g1, width, height)
    drawTrendline(data2, g2, width, height)

    g1.transition().delay(animationDuration / 2).duration(animationDuration)
        .attr("transform", "translate(200, 0)")
    g1.selectAll('g')
        .attr("opacity", 1)
        .transition().duration(animationDuration)
        .attr("opacity", 0)
    g1.selectAll('.dot')
        .attr('opacity', 1)
        .style('fill', 'black')
        .transition().ease(d3.easePoly).duration(animationDuration)
        .attr("opacity", .3)
        .style('fill', color1)

    g2.transition().delay(animationDuration / 2).duration(animationDuration)
        .attr("transform", "translate(200, 0)")
    g2.selectAll('g')
        .attr("opacity", 1)
        .transition().duration(animationDuration)
        .attr("opacity", 0)
    g2.selectAll('.dot')
        .attr('opacity', 1)
        .style('fill', 'black')
        .transition().ease(d3.easePoly).duration(animationDuration)
        .attr("opacity", .3)
        .style('fill', color2)
}



export function idea2(data1, data2, w, h, r1, r2) {
    const svg = d3.select('#container')
        .append('svg').attr('width', w * 2).attr('height', h)
    buildChart(data1, data2, svg, w, h, r1, r2)
}