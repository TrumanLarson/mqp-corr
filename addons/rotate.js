export const rotate = (g1, g2, specs) => {
    var centerX = 180
    var centerY = 180
    var interpol_rotate = d3.interpolateString("rotate(0," + centerX + "," +
        centerY + ")", "rotate(47.75," + centerX + "," + centerY + ")")

    g1.transition().delay(specs.animationDuration / 2).duration(specs.animationDuration)
        .attrTween("transform", function(d, i, a) { return interpol_rotate })

    var interpol_rotate2 = d3.interpolateString("translate(400, 0) rotate(0," + centerX + "," +
        centerY + ")", "translate(400, 0) rotate(47.75," + centerX + "," + centerY + ")")

    g2.transition().delay(specs.animationDuration / 2).duration(specs.animationDuration)
        .attrTween("transform", function(d, i, a) { return interpol_rotate2 })
}