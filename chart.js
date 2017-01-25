
var renderChart = function(selectedVitamin, selectedDemographic) {

d3.json("data.json", function(error, data){

  var vitamin = data[selectedVitamin] || data["vitamin A"];
  var demographic = vitamin.recommendedIntakes[selectedDemographic] || vitamin.recommendedIntakes["adults"];

  var labelsLength = demographic.labels.length;
  var seriesLength = demographic.series.length;
  var chartWidth = 700;
  var barHeight = 35;
  var gapBetweenGroups = 10;

  // var groupHeight = 250; //480; //line down side of graph
  var groupHeight = ((barHeight + gapBetweenGroups) * 2)  * labelsLength - 35;

  var spaceForLabels = 150;
  var spaceForLegend = 150;
  var totalChartWidth = chartWidth + spaceForLabels + spaceForLegend;

  // Zip the series data together (first values, second values, etc.)
  var dataSet = [];
  for (var i = 0; i < labelsLength; i++) {
    for (var j = 0; j < seriesLength; j++) {
      dataSet.push( demographic.series[j].values[i] );
    }
  }

  // Color scale
  var color = d3.scale.category20();
  var chartHeight = (barHeight * dataSet.length) + (gapBetweenGroups * labelsLength);
               // = 20 * 12 + 10 * 6 = 300;

  var x = d3.scale.linear()
      .domain([0, d3.max(dataSet)])
      .range([0, chartWidth]);

  var y = d3.scale.linear()
      .range([groupHeight + gapBetweenGroups, 0]);

  var yAxis = d3.svg.axis()
      .scale(y)
      .tickFormat('')
      .tickSize(0)
      .orient("left");

  // Specify the chart area and dimensions
  var chart = d3.select(".chart").append('svg')
      .attr("viewBox", "0 0 "+ totalChartWidth + " "+ groupHeight)
      // .attr("height", chartHeight);

  // Create bars
  var bar = chart.selectAll("g")
      .data(dataSet)
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups *
        (0.5 + Math.floor(i/seriesLength))) + ")";
      });

  // Create rectangles of the correct width
  bar.append("rect")
      .attr("fill", function(d,i) { return color(i % seriesLength); })
      .attr("class", "bar")
      .attr("width", x)
      .attr("height", barHeight - 1 );

  // Add text label in bar
  bar.append("text")
      .attr("x", function(d) { return x(d) - 10; })
      .attr("y", barHeight/2)
      .attr("fill", "red")
      .attr("dy", ".35em")
      .text(function(d) { return d; });

  // Draw labels
  bar.append("text")
      .attr("class", "label")
      .attr("x", function(d) { return - 10; })
      .attr("y", groupHeight/12)
      .attr("dy", ".35em")
      .text(function(d,i) {
        if (i % seriesLength === 0)
          return demographic.labels[Math.floor(i/seriesLength)];
        else
          return ""});

  chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
        .call(yAxis);

  // Draw legend
  var legendRectSize = 18,
      legendSpacing  = 4;

  var legend = chart.selectAll('.legend')
      .data(demographic.series)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = -gapBetweenGroups/2;
          var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
      });

  legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', function (d, i) { return color(i); })
      .style('stroke', function (d, i) { return color(i); });

  legend.append('text')
      .attr('class', 'legend')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function (d) { return d.label; });
  });

};

renderChart();
