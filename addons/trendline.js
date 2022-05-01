export const drawTrendline = (data, svg, specs) => {
    const inner_height = specs.height - specs.margin.bottom;
    const inner_width = specs.width - specs.margin.left - specs.margin.right;

    const lineData = [
        [0 + 10, inner_height - 10],
        [inner_width - 10, 0 + 10]
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
        .duration(specs.animationDuration / 2)
}