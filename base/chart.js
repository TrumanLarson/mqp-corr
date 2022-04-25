export function createChart(svg, width, height, data) {
    // const {
    //     width,
    //     height,
    //     data,
    //     handleSelection
    // } = this.props;
    // data in format [x1,y1], [x2,y2]
    // console.log("data to charts" + data)
    const margin = {
        left: 40,
        top: 20,
        right: 20,
        bottom: 20,
    };
    const inner_height = height - margin.bottom;
    const inner_width = width - margin.left - margin.right;
    const xAry = data.map(d => d[0]);
    const yAry = data.map(d => d[1]);
    var xScale = d3.scaleLinear().range([0, inner_width]);
    var yScale = d3.scaleLinear().range([inner_height, 0]);
    const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(0)
        .tickFormat(function(d) { return ''; });

    const yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSize(0);

    svg.attr("width", width) // !!! This is changed from original code
        .attr("height", height);
    svg.selectAll("*").remove()
    svg.append("g")
        .attr('transform', `translate(0, ${height-margin.bottom})`)
        .attr('class', 'main axis date').call(xAxis);

    svg.append("g")
        .attr('class', 'main axis date').call(yAxis);
    xScale.domain([d3.min(xAry), d3.max(xAry)]).range([0 + 10, inner_width - 10]);
    yScale.domain([d3.min(yAry), d3.max(yAry)]).range([inner_height - 10, 0 + 10]);


    svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", d => {
            return xScale(d[0])
        })
        .attr("cy", d => {
            return yScale(d[1])
        })
        .style("fill", 'black')
}