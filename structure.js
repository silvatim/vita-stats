
var renderStructure = function(selectedVitamin){

   d3.json("data.json", function(error, data){
   console.log(data);

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

  });
};

renderStructure();

