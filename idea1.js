import { createChart } from "./chart.js"

const animationDuration = 2500

const drawViolin = (data, svg, width, height) => {

}

const drawTrendline = (data, svg, width, height) => {

}

const buildChart = (data1, data2, svg, width, height) => {
    console.log("building idea 1...")
    const g1 = svg.append("g")
    const g2 = svg.append("g").attr("transform", "translate(400, 0)")
    createChart(g1, width, height, data1, 'black')
    createChart(g2, width, height, data2, 'blue')

    g1.transition().duration(animationDuration)
        .attr("transform", "translate(200, 0)")
    g1.selectAll('g').attr("opacity", 1).transition().duration(animationDuration).attr("opacity", 0)

    g2.transition().duration(animationDuration)
        .attr("transform", "translate(200, 0)")
    g2.selectAll('g').attr("opacity", 1).transition().duration(animationDuration).attr("opacity", 0)

}



export function idea1(data1, data2, w, h) {
    const svg1 = d3.select('#container')
        .append('svg').attr('width', w * 2).attr('height', h)
        // const svg2 = d3.select('#container')
        //     .append('svg').attr('width', w).attr('height', h)
    buildChart(data1, data2, svg1, w, h)
}