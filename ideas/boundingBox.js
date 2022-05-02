import { buildChart } from '../base/buildChart.js'

const drawMargin = (data, svg, specs, color) => {
    const inner_height = specs.height - specs.margin.bottom;
    const inner_width = specs.width - specs.margin.left - specs.margin.right;
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
    const absMaxDis = yScale(yScale.domain()[1] - maxDis)

    const topLineData = [
        [0 + 10, inner_height - 10 - absMaxDis],
        [inner_width - 10, 0 + 10 - absMaxDis]
    ]

    const botLineData = [
        [0 + 10, inner_height - 10 + absMaxDis],
        [inner_width - 10, 0 + 10 + absMaxDis]
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
        .duration(specs.animationDuration / 2)
    botPath.attr("stroke-dasharray", botLength + " " + botLength)
        .attr("stroke-dashoffset", botLength)
        .transition()
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .duration(specs.animationDuration / 2)

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
        .transition().duration(specs.animationDuration / 2)
        .attr("points", function() {
            return [
                topLineData[0].join(","),
                topLineData[1].join(","),
                botLineData[1].join(","),
                botLineData[0].join(",")
            ].join(" ")
        })
}



export function boundingBox(data1, data2, specs, r1, r2) {
    const svg = d3.select('#container')
        .append('svg').attr('width', specs.width * 2).attr('height', specs.height)
    buildChart(data1, data2, svg, specs, r1, r2, drawMargin)
}