
var renderDonut = function() {

  d3.json("data.json", function(error, data){

var vitamins = {
  "vitamin A": [
    { name: 'Carrots', amount: 334 },
    { name: 'Spinach', amount: 890 },
    { name: 'Sweet Potato', amount: 360 },
    { name: 'Kale', amount: 120 },
    { name: 'Tuna', amount: 500 }
    ],
  "vitamin B1": [
    { name: 'Pork', amount: 334 },
    { name: 'Bread', amount: 890 },
    { name: 'Seeds', amount: 360 },
    { name: 'Trout', amount: 120 },
    { name: 'Beans', amount: 500 }
    ],
  "vitamin B2": [
    { name: 'Almonds', amount: 334 },
    { name: 'Egg', amount: 890 },
    { name: 'Beef', amount: 360 },
    { name: 'Mushrooms', amount: 120 },
    { name: 'Cheese', amount: 500 }
    ],
  "vitamin B3": [
    { name: 'Chicken', amount: 334 },
    { name: 'Peanuts', amount: 890 },
    { name: 'Beef', amount: 360 },
    { name: 'Avocado', amount: 120 },
    { name: 'Peas', amount: 500 }
    ],
  "vitamin B5": [
    { name: 'Corn', amount: 334 },
    { name: 'Broccoli', amount: 890 },
    { name: 'Cauliflower', amount: 360 },
    { name: 'Salmon', amount: 120 },
    { name: 'Yoghurt', amount: 500 }
    ],
  "vitamin B6": [
    { name: 'Banana', amount: 334 },
    { name: 'Turkey', amount: 890 },
    { name: 'Garlic', amount: 360 },
    { name: 'Salmon', amount: 120 },
    { name: 'Chicken', amount: 500 }
    ],
  "vitamin B7": [
    { name: 'Peas', amount: 334 },
    { name: 'Califlower', amount: 890 },
    { name: 'Mushrooms', amount: 360 },
    { name: 'Bananas', amount: 120 },
    { name: 'Lentils', amount: 500 }
    ],
  "vitamin B9": [
    { name: 'Oranges', amount: 334 },
    { name: 'Spinach', amount: 890 },
    { name: 'Lentils', amount: 360 },
    { name: 'Broccoli', amount: 120 },
    { name: 'Beans', amount: 500 }
    ],
  "vitamin B12": [
    { name: 'Liver', amount: 600 },
    { name: 'All Bran', amount: 290 },
    { name: 'Shellfish', amount: 350 },
    { name: 'Cheese', amount: 220 },
    { name: 'Egg', amount: 530 }
    ],
  "vitamin C": [
    { name: 'Oranges', amount: 334 },
    { name: 'Kale', amount: 890 },
    { name: 'Kiwi', amount: 360 },
    { name: 'Broccoli', amount: 120 },
    { name: 'Capsicum', amount: 500 }
    ],
  "vitamin D": [
    { name: 'Salmon', amount: 334 },
    { name: 'Tuna', amount: 890 },
    { name: 'Mushrooms', amount: 360 },
    { name: 'Egg', amount: 120 },
    { name: 'Milk', amount: 500 }
    ],
  "vitamin E": [
    { name: 'Almonds', amount: 334 },
    { name: 'Spinach', amount: 890 },
    { name: 'Wheat germ', amount: 360 },
    { name: 'Pumpkin', amount: 120 },
    { name: 'Avocado', amount: 500 }
    ],
  "vitamin K": [
    { name: 'Sprouts', amount: 334 },
    { name: 'Spinach', amount: 890 },
    { name: 'Asparagus', amount: 360 },
    { name: 'Kale', amount: 120 },
    { name: 'Soy', amount: 500 }
    ]
};
var pie = d3.layout.pie()
  .value(function(d){return d.amount})
  .sort(null)
  .padAngle(.03);

 var w=270;
//  var h=300;
 var h=270;

var outerRadius=w/2;
var innerRadius=80;

var color = d3.scale.category10();

var arc = d3.svg.arc()
  .outerRadius(outerRadius)
  .innerRadius(innerRadius);

var svg = d3.select(".donutGraph")
  .append("svg")
  .attr({ width:w, height:h, class:'shadow'})
  .append('g')
  .attr({transform:'translate('+w/1.6+','+h/2+')'});

var path = svg.selectAll('path')
  .data(pie(vitamins["vitamin B12"]))
  .enter()
  .append('path')
  .attr({ d:arc, fill:function(d,i){ return color(d.data.name); } });

path.transition()
  .duration(1000)
  .attrTween('d', function(d) {
      var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
      return function(t) {
          return arc(interpolate(t));
      };
  });


var restOfTheData=function(){
    var text = svg.selectAll('text')
        .data(pie(vitamins["vitamin B12"]))
        .enter()
        .append("text")
        .transition()
        .duration(200)
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".4em")
        .attr("text-anchor", "middle")
        .text(function(d){
            return d.data.amount+"gms";
        })
        .style({ fill:'#fff', 'font-size':'10px'});

    var legendRectSize=20;
    var legendSpacing=7;
    var legendHeight=legendRectSize+legendSpacing;


    var legend=svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr({
            class:'legend',
            transform:function(d,i){
                //Just a calculation for x & y position
                return 'translate(-35,' + ((i*legendHeight)-65) + ')';
            }
        });
    legend.append('rect')
        .attr({ width:legendRectSize, height:legendRectSize, rx:20, ry:20 })
        .style({ fill:color, stroke:color });

    legend.append('text')
        .attr({ x:30, y:15 })
        .text(function(d){ return d; })
        .style({ fill:'#929DAF', 'font-size':'14px' }); };

setTimeout(restOfTheData,1000);



































    // var vitaminA = [
  //       { name: 'Salmon', amount: 200 },
  //       { name: 'Eggs', amount: 890 },
  //       { name: 'Apple', amount: 360 },
  //       { name: 'Nuts', amount: 120 },
  //       { name: 'Bread', amount: 500 }
  //   ];
  //
  //   var total = 0;
  //
  //   vitaminA.forEach( function(food) {  total += food.amount;  });
  //
  //   var pie = d3.layout.pie()
  //            .value(function(food){ return food.amount })
  //            .sort(null);
  //
  //   var width = 500;
  //   var height = 650;
  //   var outerRadiusArc = width/2;
  //   var innerRadiusArc = 100;
  //   var shadowWidth = 20;
  //
  //   var outerRadiusArcShadow = innerRadiusArc + 1;
  //   var innerRadiusArcShadow = innerRadiusArc - shadowWidth;
  //
  //   var color = d3.scale.ordinal().range(['#41B787', '#6352B9', '#B65480', '#D5735A', '#D7D9DA']);
  //
  //   var svg = d3.select(".donutGraph")
  //           .append("svg")
  //           // .attr({  width:width,  height:height,  class:'shadow' })
  //          .attr("viewBox", "-250 -250 "+ width + " "+ height)
  //           .attr("preserveAspectRatio", "xMidYMid meet");
  //
  //
  //   var createChart = function( svg, outerRadius, innerRadius, fillFunction, className ){
  //
  //       //draws arc
  //       var arc = d3.svg.arc()
  //               .innerRadius(outerRadius)
  //               .outerRadius(innerRadius);
  //
  //
  //       var path = svg.selectAll('.'+className)
  //               .data( pie( vitaminA ) )
  //               .enter()
  //               .append('path')
  //               .attr({ class:className, d:arc, fill:fillFunction });
  //
  //
  //       path.transition()
  //               .duration(1000)
  //               .attrTween('d', function(d) {
  //                   var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
  //                   return function(t) { return arc(interpolate(t)); };
  //               });
  //   };
  //
  //
  //   createChart(svg,outerRadiusArc,innerRadiusArc,function(d,i){
  //       return color(d.data.name);
  //   },'path1');
  //
  //   createChart(svg,outerRadiusArcShadow,innerRadiusArcShadow,function(d,i){
  //       var c = d3.hsl(color(d.data.name));
  //       return d3.hsl((c.h+5), (c.s -.07), (c.l -.15));
  //   },'path2');
  //
  //
  //   var addTextToCenter = function (text, y, size) {
  //       svg.append('text')
  //               .text(text)
  //               .attr({ 'text-anchor':'middle', y:y })
  //               .style({ fill:'#929DAF', 'font-size':size });
  //   };
  //
  //   var restOfTheData = function(){
  //       addTextToCenter(function(){ return "400"; } ,0, '40px');
  //       addTextToCenter(function(){ return "ug/mg";  } ,25, '30px');
  //   };
  //
  //   setTimeout(restOfTheData,1000);
  //   });
  //
 });

};
renderDonut();

