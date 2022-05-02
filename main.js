import { boundingBox } from "./ideas/boundingBox.js"
import { distance } from "./ideas/distance.js"
import { ellipse } from "./ideas/ellipse.js"
import { generateDataSet } from "./base/datagen.js"
import { buildChart } from "./base/buildChart.js"
import { convexHull } from "./ideas/convexHull.js"

let r1 = .5 // set default values here
let r2 = .98


/*


- [x]menu feature selection
	- select from
        - chart type, x
        - rotation, x
        - transformation, x
        - axis fade, x
        - r values, x
        - trendline, x
        - animation speed x
    - implement selection functionality x

- [x]click to switch highlight
- [x]clean up ui
- [x]convex hull draw function
- []widen click field on checkboxes


*/


let specs = {
    width: 400,
    height: 400,
    margin: {
        left: 40,
        top: 20,
        right: 20,
        bottom: 20,
    },
    animationDuration: 1500,
    color1: 'green',
    color2: 'blue',
    merge: true,
    rotate: true,
    fadeAxis: true,
    trendline: true
}

const getData = (r) => {
    return generateDataSet(r)
}

window.onload = () => {
    console.log(d3) // check d3
    document.getElementById("draw").onclick = () => {
        $('.sidebar').sidebar('hide');
        draw()
    }
    document.getElementById("redraw").onclick = () => draw()

    document.getElementById("settings").onclick = () => {
        $('.sidebar').sidebar('toggle')
    }



    document.addEventListener("keyup", function(ev) {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            $('.sidebar').sidebar('hide');
            draw()
        }
    })

    expandCheckToParent('merge')
    expandCheckToParent('rotate')
    expandCheckToParent('fadeAxis')
    expandCheckToParent('trendline')

    document.getElementById('merge').checked = specs.merge
    document.getElementById('rotate').checked = specs.rotate
    document.getElementById('fadeAxis').checked = specs.fadeAxis
    document.getElementById('trendline').checked = specs.trendline

    $('#select')
        .dropdown();
    $('.sidebar')
        .sidebar('setting', 'transition', 'overlay')
    draw()
}

function expandCheckToParent(id) {
    let element = document.getElementById(id)
    element.parentElement.children[1].onclick = () => {
        element.checked = !element.checked
    }
}


export function draw() {

    d3.selectAll('svg').remove()

    const givenR1 = document.getElementById('r1').value
    const givenR2 = document.getElementById('r2').value

    if (givenR1 == '') {
        document.getElementById('r1').value = r1
    } else {
        r1 = givenR1
    }
    if (givenR2 == '') {
        document.getElementById('r2').value = r2
    } else {
        r2 = givenR2
    }

    const givenASpeed = document.getElementById('speed').value

    if (givenASpeed == '') {
        document.getElementById('speed').value = specs.animationDuration
    } else {
        specs.animationDuration = givenASpeed
    }

    specs.merge = document.getElementById('merge').checked
    specs.rotate = document.getElementById('rotate').checked
    specs.fadeAxis = document.getElementById('fadeAxis').checked
    specs.trendline = document.getElementById('trendline').checked

    const data1 = getData(r1)
    const data2 = getData(r2)

    let feedback = $('#select').dropdown('get value')
    if (feedback == "none") {
        const svg = d3.select('#container')
            .append('svg').attr('width', specs.width * 2).attr('height', specs.height)
        buildChart(data1, data2, svg, specs, r1, r2, "none")
    } else if (feedback == "ellipse") {
        ellipse(data1, data2, specs, r1, r2)
    } else if (feedback == "boundingBox") {
        boundingBox(data1, data2, specs, r1, r2)
    } else if (feedback == "distance") {
        distance(data1, data2, specs, r1, r2)
    } else if (feedback == "convexHull") {
        convexHull(data1, data2, specs, r1, r2)
    }


}