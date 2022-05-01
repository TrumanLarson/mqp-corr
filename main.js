import { boundingBox } from "./ideas/boundingBox.js"
import { distance } from "./ideas/distance.js"
import { ellipse } from "./ideas/ellipse.js"
import { generateDataSet } from "./base/datagen.js"

let r1 = .5
let r2 = .98


/*


- menu feature selection
	- clean ui
	- select from 
        - chart type, 
        - rotation, 
        - transformation, 
        - axis fade, 
        - r values, 
        - trendline, 
        - animation speed, etc
- click to switch highlight
- convex hull draw function


*/
const specs = {
    width: 400,
    height: 400,
    margin: {
        left: 40,
        top: 20,
        right: 20,
        bottom: 20,
    },
    animationDuration: 2500,
    color1: 'green',
    color2: 'blue',
}

const getData = (r) => {
    return generateDataSet(r)
}

window.onload = () => {
    console.log(d3) // check d3
    document.getElementById("redraw").onclick = () => draw()
    document.addEventListener("keyup", function(ev) {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            draw()
        }
    })
    draw()
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

    const data1 = getData(r1)
    const data2 = getData(r2)
    ellipse(data1, data2, specs, r1, r2)
    distance(data1, data2, specs)
}