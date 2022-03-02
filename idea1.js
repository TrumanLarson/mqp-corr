import { createChart } from "./chart.js"

const animationDuration = 2500

const margin = {
    left: 40,
    top: 20,
    right: 20,
    bottom: 20,
};



const drawMargin = (data, svg, width, height, color) => {
    const inner_height = height - margin.bottom;
    const inner_width = width - margin.left - margin.right;
    const xAry = data.map(d => d[0]);
    const yAry = data.map(d => d[1]);
    var xScale = d3.scaleLinear().range([0, inner_width]);
    var yScale = d3.scaleLinear().range([inner_height, 0]);
    xScale.domain([d3.min(xAry), d3.max(xAry)]).range([0 + 10, inner_width - 10]);
    yScale.domain([d3.min(yAry), d3.max(yAry)]).range([inner_height - 10, 0 + 10]);

    const POS = 1
    const NEG = -1

    function findBiggestDiff(xd, yd, sign) {
        var maxDiff = 0
        xd.forEach((e, i) => {
            var diff = e - yd[i]
            if (diff * sign > maxDiff * sign) {
                maxDiff = diff
            }
        });
        return maxDiff
    }
    const maxDisTop = findBiggestDiff(xAry, yAry, NEG)
    const maxDisBot = findBiggestDiff(xAry, yAry, POS)

    const maxDis = (-maxDisTop) > maxDisBot ? (-maxDisTop) : maxDisBot
    console.log(maxDis)
    const absMaxDis = yScale(yScale.domain()[1] - maxDis)
    console.log(absMaxDis)
    const topLineData = [
        [0 + 10, inner_width - 10 - absMaxDis],
        [inner_height - 10, 0 + 10 - absMaxDis]
    ]

    const botLineData = [
        [0 + 10, inner_width - 10 + absMaxDis],
        [inner_height - 10, 0 + 10 + absMaxDis]
    ]

    const line = d3.line().context(null)


    const topPath = svg.append("path")
        .attr('d', line(topLineData))
        .attr('stroke', color)

    const botPath = svg.append("path")
        .attr('d', line(botLineData))
        .attr('stroke', color)

    const topLength = topPath.node().getTotalLength();
    const botLength = botPath.node().getTotalLength();

    topPath.attr("stroke-dasharray", topLength + " " + topLength)
        .attr("stroke-dashoffset", topLength)
        .transition()
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .duration(animationDuration / 2)
    botPath.attr("stroke-dasharray", botLength + " " + botLength)
        .attr("stroke-dashoffset", botLength)
        .transition()
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .duration(animationDuration / 2)

    svg.append("polygon")
        .attr("points", function() {
            return [
                topLineData[0].join(","),
                topLineData[0].join(","),
                botLineData[0].join(","),
                botLineData[0].join(",")
            ].join(" ")
        })
        .attr("stroke", "none")
        .attr("fill", color)
        .attr("opacity", 0.1)
        .transition().duration(animationDuration / 2)
        .attr("points", function() {
            return [
                topLineData[0].join(","),
                topLineData[1].join(","),
                botLineData[1].join(","),
                botLineData[0].join(",")
            ].join(" ")
        })
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

const buildChart = (data1, data2, svg, width, height) => {
    console.log("building idea 1...")
    const g1 = svg.append("g")
    const g2 = svg.append("g").attr("transform", "translate(400, 0)")
    createChart(g1, width, height, data1, 'green')
    createChart(g2, width, height, data2, 'blue')

    drawMargin(data1, g1, width, height, 'green')
    drawMargin(data2, g2, width, height, 'blue')

    drawTrendline(data1, g1, width, height)
    drawTrendline(data2, g2, width, height)

    g1.transition().duration(animationDuration)
        .attr("transform", "translate(200, 0)")
    g1.selectAll('g').attr("opacity", 1).transition().duration(animationDuration).attr("opacity", 0)
    g1.selectAll('.dot').attr('opacity', 1).transition().duration(animationDuration).attr("opacity", .3)

    g2.transition().duration(animationDuration)
        .attr("transform", "translate(200, 0)")
    g2.selectAll('g').attr("opacity", 1).transition().duration(animationDuration).attr("opacity", 0)
    g2.selectAll('.dot').attr('opacity', 1).transition().duration(animationDuration).attr("opacity", .3)
}



export function idea1(data1, data2, w, h) {
    const svg = d3.select('#container')
        .append('svg').attr('width', w * 2).attr('height', h)
        // const svg2 = d3.select('#container')
        //     .append('svg').attr('width', w).attr('height', h)
    buildChart(data1, data2, svg, w, h)
}