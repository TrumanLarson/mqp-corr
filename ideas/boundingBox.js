import { createChart } from "../base/chart.js"
import { drawTrendline } from "../addons/trendline.js";
import { animateMerge } from "../addons/merge.js";

let margin = null
let animationDuration = null

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
    const absMaxDis = yScale(yScale.domain()[1] - maxDis)

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


const buildChart = (data1, data2, svg, specs) => {
    console.log("building bounding box...")
    const g1 = svg.append("g")
    const g2 = svg.append("g").attr("transform", "translate(400, 0)")

    createChart(g1, specs.width, specs.height, data1)
    createChart(g2, specs.width, specs.height, data2)

    drawMargin(data1, g1, specs.width, specs.height, specs.color1)
    drawMargin(data2, g2, specs.width, specs.height, color2)

    drawTrendline(data1, g1, specs)
    drawTrendline(data2, g2, specs)

    animateMerge(g1, g2, specs)
}



export function boundingBox(data1, data2, specs, r1, r2) {
    const svg = d3.select('#container')
        .append('svg').attr('width', specs.width * 2).attr('height', specs.height)
    margin = specs.margin
    animationDuration = specs.animationDuration
    buildChart(data1, data2, svg, specs)
}