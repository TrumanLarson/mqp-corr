import { idea1 } from "./idea1.js"
import { idea2 } from "./idea2.js"
import { generateDataSet } from "./datagen.js"

const width = 400
const height = 400
let r1 = .5
let r2 = .6

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
    idea2(data1, data2, width, height, r1, r2)
    idea1(data1, data2, width, height)
}