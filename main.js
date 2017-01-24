
d3.json("data.json", function(error, data){
console.log(data);

var renderStructure = function(selectedVitamin){

  var vitamin = data[selectedVitamin] || data["vitamin A"];
  var nodes = vitamin.nodes;
  var links = vitamin.links;
  var width = 840;
  var height = 495;
  var color = d3.scale.category20();
  var radius = d3.scale.sqrt()
      .range([0, 2]);

  var vitaminStructure = d3.select(".structure").append("svg")
      .attr("viewBox", "0 0 "+ width + " "+ height)
      .attr("preserveAspectRatio", "xMidYMid meet");

  var force = d3.layout.force()
      .size([width,height])
      //.nodes(nodes)
      // .links(links)
      .charge(-200)
      .linkDistance(function(d) { return radius(d.source.size) + radius(d.target.size) + 10; });

  force.nodes(nodes)
        .links(links)
        .on("tick", tick)
        .start();

  var link = vitaminStructure.selectAll(".link")
      .data(links)
      .enter()
      .append("g")
      .attr("class", "link");

  link.append("line")
      .style("stroke-width", function(d) { return (d.bond * 2 - 1) * 2 + "px"; });

  link.filter(function(d) { return d.bond > 1; }).append("line")
      .attr("class", "separator");

  var node = vitaminStructure.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class","node")
      .on("click", function(d) {d.fixed = true})
      .on("dblclick", function(d) {d.fixed = false})
      .call(force.drag);

  node.append("circle")
      .attr("r", function(d) { return radius(d.size) })
      .attr("fill", function(d) { return color(d.atom); });
      // .attr("stroke", "black")
      // .attr("stroke-width", 2);

  node.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.atom; });

    function tick() {
      link.selectAll("line")
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
       node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
   }
};

//Description
var renderDescription = function(selectedVitamin) {

  var vitamin = data[selectedVitamin] || data["vitamin A"];
  var title = vitamin.title;
  var description = vitamin.description;
  var vitaminStructure = d3.select(".structure svg");
  var chart = d3.select(".chart svg");

  var vitaminList = [];
  for (var key in data){
    vitaminList.push(key);
  }

  //dropdown selector for Vitamins
  var vitaminSelector = d3.select("#vitamindrop")
      .append("select")
      .attr("id", "vitamindropdown")
      .on("change", function(d){
         vitaminSelection = document.getElementById("vitamindropdown");
         vitaminStructure.remove("svg");
         chart.remove("svg");
         $('.description h1').remove();
         $('.description p').remove();
          //renderVitamin(vitaminSelection);
      });

  vitaminSelector.selectAll( "option" )
        .data(vitaminList)
        .enter().append( "option" )
        .attr( "value", function( d ) { return d; } )
        .text( function( d ) { return d; } );

  //Adding title and description of vitamin to the information box
  $(".description").append('<h1>'+title+'</h1>').append('<p>'+description+'</p>');

};


//Bar chart

var renderChart = function(selectedVitamin) {

var vitamin = data[selectedVitamin] || data["vitamin A"];
  var intakeList = [];
  for (var key in vitamin.recommendedIntakes){
    intakeList.push(key);
  }

  var labelsLength = vitamin.recommendedIntakes.adults.labels.length;
  var seriesLength = vitamin.recommendedIntakes.adults.series.length;
  var chartWidth = 700;
  var barHeight = 35;
  var gapBetweenGroups = 10;


  // var groupHeight = 250; //480; //line down side of graph
  var groupHeight = ((barHeight + gapBetweenGroups) * 2)  * labelsLength - 35;
  console.log(groupHeight);

  var spaceForLabels = 150;
  var spaceForLegend = 150;
  var totalChartWidth = chartWidth + spaceForLabels + spaceForLegend;

  //Set intial value to first item 'Adults'
 // var recommendedIntakes = vitamin.recommendedIntakes[ intakeList[0] ];
  var recommendedIntakes = vitamin.recommendedIntakes[ intakeList[0] ];
  // Zip the series data together (first values, second values, etc.)
  var dataSet = [];
  for (var i = 0; i < labelsLength; i++) {
    for (var j = 0; j < seriesLength; j++) {
      dataSet.push( recommendedIntakes.series[j].values[i] );
    }
  }

  // dropdown selector for Daily intakes
  var intakeSelector = d3.select("#intakedrop")
      .append("select")
      .attr("id", "dropdown")
      .on("change", function(d){
         intakeSelection = document.getElementById("dropdown");
         chart.remove("svg");
        //need to write a page to re-render chart div
  });

  intakeSelector.selectAll( "option" )
        .data(intakeList)
        .enter().append( "option" )
        .attr( "value", function( d ){ return d; } )
        .text( function( d ){ return d; } );


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
      .attr("preserveAspectRatio", "xMidYMid meet");
      // .attr("width", spaceForLabels + chartWidth + spaceForLegend)
      // .attr("height", chartHeight);

  // Create bars
  var bar = chart.selectAll("g")
      .data(dataSet)
      .enter().append("g")
      .attr("transform", function(d, i) {
        console.log("here is:", i, d);
        return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups *
        (0.5 + Math.floor(i/vitamin.recommendedIntakes.pregnancy.series.length))) + ")";
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
          return recommendedIntakes.labels[Math.floor(i/seriesLength)];
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
      .data(recommendedIntakes.series)
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

};

renderStructure();
renderDescription();
renderChart();

});





