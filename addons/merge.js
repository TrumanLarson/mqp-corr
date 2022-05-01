export const animateMerge = (svg, g1, g2, specs) => {

    var centerX = 180
    var centerY = 180
    var interpol_rotate = d3.interpolateString("rotate(0," + centerX + "," +
        centerY + ")", "rotate(47.75," + centerX + "," + centerY + ")")

    g1.transition().delay(specs.animationDuration / 2).duration(specs.animationDuration)
        .attrTween("transform", function(d, i, a) { return interpol_rotate })
        .transition().attr("transform", "translate(200, 0) rotate(47.75," + centerX + "," + centerY + ")")
    g1.selectAll('g')
        .attr("opacity", 1)
        .transition().duration(specs.animationDuration)
        .attr("opacity", 0)
    g1.selectAll('.dot')
        .attr('opacity', 1)
        .style('fill', 'black')
        .transition().ease(d3.easePoly).duration(specs.animationDuration)
        .attr("opacity", .3)
        .style('fill', specs.color1)

    var interpol_rotate2 = d3.interpolateString("rotate(0," + (centerX + specs.width) + "," +
        centerY + ") translate(400, 0)", "rotate(47.75," + (centerX + specs.width) + "," + centerY + ") translate(400, 0)")

    g2.transition().delay(specs.animationDuration / 2).duration(specs.animationDuration)
        .attrTween("transform", function(d, i, a) { return interpol_rotate2 })
        .transition().attr("transform", "translate(200, 0) rotate(47.75," + centerX + "," + centerY + ")")
    g2.selectAll('g')
        .attr("opacity", 1)
        .transition().duration(specs.animationDuration)
        .attr("opacity", 0)
    g2.selectAll('.dot')
        .attr('opacity', 1)
        .style('fill', 'black')
        .transition().ease(d3.easePoly).duration(specs.animationDuration)
        .attr("opacity", .3)
        .style('fill', specs.color2)
}