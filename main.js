import { idea1 } from "./idea1.js"
import { idea2 } from "./idea2.js"
import { generateDataSet } from "./datagen.js"

const width = 400
const height = 400
const r1 = .5
const r2 = .6

const getData = (r) => {
    return generateDataSet(r)
}

window.onload = function() {
    console.log(d3) // check d3
    const data1 = getData(r1)
    const data2 = getData(r2)
    idea2(data1, data2, width, height, r1, r2)
    idea1(data1, data2, width, height)
}