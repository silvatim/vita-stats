var renderDonut = function(selectedVitamin) {
    //Get json data
    d3.json("data.json", function(error, data) {
        //Set initial vitamin
        var vitamin = data[selectedVitamin] || data["vitamin A"];
        var foodList = vitamin.food;
        //Set pie layout
        var pie = d3.layout.pie()
            .value(function(d) {
                return d.amount;
            })
            .sort(null)
            .padAngle(.03);
        //Set width and height of graph
        var w = 240;
        var h = 240;
        //Set radius of graph
        var outerRadius = w / 2;
        var innerRadius = 80;
        //Add color scale
        var color = d3.scale.category10();
        //Set arc for donut graph
        var arc = d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        var svg = d3.select(".donutGraph")
            .append("svg")
            .attr({
                width: w,
                height: h,
                class: 'shadow'
            })
            .append('g')
            .attr({
                transform: 'translate(' + w / 1.6 + ',' + h / 2 + ')'
            });

        var path = svg.selectAll('path')
            .data(pie(foodList))
            .enter()
            .append('path')
            .attr({
                d: arc,
                fill: function(d, i) {
                    return color(d.data.name);
                }
            });

        path.transition()
            .duration(1000)
            .attrTween('d', function(d) {
                var interpolate = d3.interpolate({
                    startAngle: 0,
                    endAngle: 0
                }, d);
                return function(t) {
                    return arc(interpolate(t));
                };
            });


        var restOfTheData = function() {
            var text = svg.selectAll('text')
                .data(pie(foodList))
                .enter()
                .append("text")
                .transition()
                .duration(200)
                .attr("transform", function(d) {
                    return "translate(" + arc.centroid(d) + ")";
                })
                .attr("dy", ".4em")
                .attr("text-anchor", "middle")
                .text(function(d) {
                    return d.data.amount + " " + d.data.unit;
                })
                .style({
                    fill: '#fff',
                    'font-size': '10px'
                });

            var legendRectSize = 20;
            var legendSpacing = 7;
            var legendHeight = legendRectSize + legendSpacing;


            var legend = svg.selectAll('.legend')
                .data(color.domain())
                .enter()
                .append('g')
                .attr({
                    class: 'legend',
                    transform: function(d, i) {
                        //Calculation for x & y position
                        return 'translate(-35,' + ((i * legendHeight) - 65) + ')';
                    }
                });
            legend.append('rect')
                .attr({
                    width: legendRectSize,
                    height: legendRectSize,
                    rx: 20,
                    ry: 20
                })
                .style({
                    fill: color,
                    stroke: color
                });

            legend.append('text')
                .attr({
                    x: 30,
                    y: 15
                })
                .text(function(d) {
                    return d;
                })
                .style({
                    fill: '#929DAF',
                    'font-size': '14px'
                });
        };

        setTimeout(restOfTheData, 1000);

    });

};
renderDonut();
