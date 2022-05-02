import { createChart } from "./chart.js"
import { merge } from "../addons/merge.js";
import { drawTrendline } from "../addons/trendline.js";
import { rotate } from "../addons/rotate.js";
import { fadeAxis } from "../addons/fadeAxis.js";
import { highlights } from "./highlights.js";

export function buildChart(data1, data2, svg, specs, r1, r2, f) {
    console.log("building " + f.name + "...")
    const g1 = svg.append("g")
    const g2 = svg.append("g").attr("transform", "translate(" + specs.width + ", 0)")


    createChart(g1, specs.width, specs.height, data1, specs.color1)
    createChart(g2, specs.width, specs.height, data2, specs.color2)

    if (f != "none") {
        f(data1, g1, specs, specs.color1, r1)
        f(data2, g2, specs, specs.color2, r2)
    }

    if (specs.merge) {
        highlights(svg, g1, g2, specs)
    } else {
        g1.selectAll('.dot')
            .transition().ease(d3.easePoly).duration(specs.animationDuration)
            .style('fill', specs.color1)
        g2.selectAll('.dot')
            .transition().ease(d3.easePoly).duration(specs.animationDuration)
            .style('fill', specs.color2)
    }

    if (specs.fadeAxis) {
        fadeAxis(g1, g2, specs)
    }

    if (specs.trendline) {
        drawTrendline(data1, g1, specs)
        drawTrendline(data2, g2, specs)
    }

    if (specs.merge) {
        merge(g1, g2, specs) // merge function handles merge+rotate if rotate is selected
    } else if (specs.rotate) { // we need seperate behavior for merge + rotate and just rotate;
        rotate(g1, g2, specs)
    }
}