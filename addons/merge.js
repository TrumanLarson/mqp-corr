export const merge = (g1, g2, specs) => {
    var centerX = 180
    var centerY = 180

    var addRotate = "rotate(47.75," + centerX + "," + centerY + ")"
    if (!specs.rotate) addRotate = ""

    g1.transition().duration(specs.animationDuration)
        .transition().attr("transform", "translate(200, 0)" + addRotate)

    g2.transition().duration(specs.animationDuration)
        .transition().attr("transform", "translate(200, 0)" + addRotate)

}