export const highlights = (svg, g1, g2, specs) => {
    const primaryOpacity = 1
    const secondaryOpacity = .3
    const secondaryColor = 'grey'
    let state = 'g1'

    g1.selectAll('.dot')
        .transition().ease(d3.easePoly).duration(specs.animationDuration)
        .attr('opacity', primaryOpacity)
        .style('fill', specs.color1)
    g2.selectAll('.dot')
        .transition().ease(d3.easePoly).duration(specs.animationDuration)
        .attr("opacity", secondaryOpacity)
        .style('fill', "grey")

    svg.on('click', function(ev) {
        state = (state == 'g1') ? 'g2' : 'g1'
        if (state == 'g1') {
            g1.selectAll('.dot').attr('opacity', primaryOpacity).style('fill', specs.color1)
            g2.selectAll('.dot').attr('opacity', secondaryOpacity).style('fill', "grey")
        } else if (state == 'g2') {
            g2.selectAll('.dot').attr('opacity', primaryOpacity).style('fill', specs.color2)
            g1.selectAll('.dot').attr('opacity', secondaryOpacity).style('fill', "grey")
        }
    })


}