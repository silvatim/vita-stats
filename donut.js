
var renderDonut = function() {

  d3.json("data.json", function(error, data){

  var dataset = [
        { name: 'Salmon', count: 200 },
        { name: 'Eggs', count: 890 },
        { name: 'Apple', count: 360 },
        { name: 'Nuts', count: 120 },
        { name: 'Bread', count: 500 }
    ];

    var total = 0;

    dataset.forEach( function(d) {  total+= d.count;  });

    var donut = d3.layout.pie()
             .value(function(d){ return d.count })
             .sort(null);

    var width = 500;
    var height = 650;

    var outerRadiusArc = width/2;
    var innerRadiusArc = 100;
    var shadowWidth = 20;

    var outerRadiusArcShadow = innerRadiusArc+1;
    var innerRadiusArcShadow = innerRadiusArc-shadowWidth;

    var color = d3.scale.ordinal()
     .range(['#41B787', '#6352B9', '#B65480', '#D5735A', '#D7D9DA']);

    var svg = d3.select(".donutGraph")
            .append("svg")
            .attr({ width: width, height: height, class:'shadow'})
            .attr("viewBox", "-250 -250 "+ width + " "+ height)
            .attr("preserveAspectRatio", "xMidYMid meet");
            // .attr({ transform:'translate('+ width / 2 +','+ height / 2 +')' })

    var createChart = function( svg, outerRadius, innerRadius, fillFunction, className ){

        var arc = d3.svg.arc()
                .innerRadius(outerRadius)
                .outerRadius(innerRadius);

        var path = svg.selectAll('.'+className)
                .data( donut( dataset ) )
                .enter()
                .append('path')
                .attr({ class:className, d:arc, fill:fillFunction });

        path.transition()
                .duration(1000)
                .attrTween('d', function(d) {
                    var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                    return function(t) {
                        return arc(interpolate(t));
                    };
                });
    };

    createChart(svg,outerRadiusArc,innerRadiusArc,function(d,i){
        return color(d.data.name);
    },'path1');

    createChart(svg,outerRadiusArcShadow,innerRadiusArcShadow,function(d,i){
        var c = d3.hsl(color(d.data.name));
        return d3.hsl((c.h+5), (c.s -.07), (c.l -.15));
    },'path2');

    var addText = function (text,y,size) {
        svg.append('text')
                .text(text)
                .attr({'text-anchor':'middle', y:y })
                .style({ fill:'#929DAF', 'font-size':size });
    };

    var restOfTheData = function(){

        addText(function(){ return "Intake Here"; },0,'30px');
        addText( function(){ return "ug/mg";  },25,'10px');

    };

    setTimeout(restOfTheData,1000);
   });

 };

renderDonut();

