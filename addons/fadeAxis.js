export const fadeAxis = (g1, g2, specs) => {
    g1.selectAll('g')
        .attr("opacity", 1)
        .transition().duration(specs.animationDuration)
        .attr("opacity", 0)

    g2.selectAll('g')
        .attr("opacity", 1)
        .transition().duration(specs.animationDuration)
        .attr("opacity", 0)

}