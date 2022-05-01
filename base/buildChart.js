import { createChart } from "./chart.js"
import { animateMerge } from "../addons/merge.js";
import { drawTrendline } from "../addons/trendline.js";

export function buildChart(data1, data2, svg, specs, r1, r2, f) {
    console.log("building " + f.name + "...")
    const g1 = svg.append("g")
    const g2 = svg.append("g").attr("transform", "translate(" + specs.width + ", 0)")


    createChart(g1, specs.width, specs.height, data1, specs.color1)
    createChart(g2, specs.width, specs.height, data2, specs.color2)

    f(data1, g1, specs, specs.color1, r1)
    f(data2, g2, specs, specs.color2, r2)

    drawTrendline(data1, g1, specs)
    drawTrendline(data2, g2, specs)

    animateMerge(svg, g1, g2, specs)
}