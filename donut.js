// var vitamins = {
//   "vitamin A": [
//     { "name": "Carrots", "amount": 852, "unit":"mcg" },
//     { "name": "Spinach", "amount": 500, "unit":"mcg" },
//     { "name": "Sweet Potato", "amount": 961, "unit":"mcg" },
//     { "name": "Kale", "amount": 550, "unit":"mcg" },
//     { "name": "Tuna", "amount": 757, "unit":"mcg" }
//     ],
//   "vitamin B1": [
//     { "name": "Pork", "amount": 1.1, "unit":"mg" },
//     { "name": "Bread","amount": 0.5, "unit":"mg" },
//     { "name": "Seeds","amount": 1.5, "unit":"mg" },
//     { "name": "Trout","amount": 0.4, "unit":"mg" },
//     { "name": "Beans","amount": 0.2, "unit":"mg" }
//     ],
//   "vitamin B2": [
//     {"name": "Almonds", "amount": 1.1, "unit":"mg" },
//     {"name": "Egg", "amount": 0.5, "unit":"mg"},
//     {"name": "Beef", "amount": 0.9, "unit":"mg" },
//     {"name": "Mushrooms", "amount": 0.5, "unit":"mg" },
//     {"name": "Cheese", "amount": 1.4, "unit":"mg" }
//     ],
//   "vitamin B3": [
//     { "name": "Chicken", "amount": 15, "unit":"mg" },
//     { "name": "Peas",  "amount": 2, "unit":"mg" },
//     { "name": "Peanuts", "amount": 14, "unit":"mg" },
//     { "name": "Beef", "amount": 9, "unit":"mg" },
//     { "name": "Avocado", "amount": 2, "unit":"mg" },
//     ],
//   "vitamin B5": [
//     {"name": "Cheese", "amount": 3.3, "unit":"mg" },
//     {"name": "Pork", "amount": 1.6, "unit":"mg" },
//     {"name": "Mushroom", "amount": 3.6, "unit":"mg" },
//     {"name": "Trout", "amount": 2.2, "unit":"mg" },
//     {"name": "Egg", "amount": 1.5, "unit":"mg" }
//     ],
//   "vitamin B6": [
//     {"name": "Banana", "amount": 0.4, "unit":"mcg" },
//     {"name": "Turkey", "amount": 0.8, "unit":"mcg" },
//     {"name": "Garlic", "amount": 1.2, "unit":"mcg" },
//     {"name": "Salmon", "amount": 0.6, "unit":"mcg" },
//     {"name": "Chicken", "amount": 0.5, "unit":"mcg" }
//     ],
//   "vitamin B7": [
//     { "name": "Egg", "amount": 25, "unit":"mcg" },
//     { "name": "Califlower", "amount": 17, "unit":"mcg" },
//     { "name": "Mushrooms", "amount": 16, "unit":"mcg" },
//     { "name": "Peas", "amount": 18, "unit":"mcg" },
//     { "name": "Peanuts", "amount": 39, "unit":"mcg" }
//     ],
//   "vitamin B9": [
//     { "name": "Oranges", "amount": 39, "unit":"mcg" },
//     { "name": "Spinach", "amount": 194, "unit":"mcg" },
//     { "name": "Lentils", "amount": 181, "unit":"mcg" },
//     { "name": "Broccoli", "amount": 108, "unit":"mcg" },
//     { "name": "Beans", "amount": 209, "unit":"mcg" }
//     ],
//   "vitamin B12": [
//     { "name": "Liver", "amount": 70, "unit":"mcg" },
//     { "name": "Cheese", "amount": 3, "unit":"mcg" },
//     { "name": "Cereals", "amount": 20, "unit":"mcg" },
//     { "name": "Shellfish", "amount": 98, "unit":"mcg"},
//     { "name": "Egg", "amount": 2, "unit":"mcg" }
//     ],
//   "vitamin C": [
//     { "name": "Kale", "amount": 120, "unit":"mcg" },
//     { "name": "Capsicum", "amount": 128, "unit":"mcg" },
//     { "name": "Broccoli", "amount": 89, "unit":"mcg"},
//     { "name": "Kiwi", "amount": 93, "unit":"mcg" },
//     { "name": "Oranges", "amount": 59, "unit":"mcg"}
//     ],
//   "vitamin D": [
//     { "name": "Salmon", "amount": 19, "unit":"mcg" },
//     { "name": "Egg", "amount": 2, "unit":"mcg"  },
//     { "name": "Mushrooms", "amount": 28, "unit":"mcg"  },
//     { "name": "Cereals", "amount": 8, "unit":"mcg"  },
//     { "name": "Tofu", "amount": 4, "unit":"mcg"  }
//     ],
//   "vitamin E": [
//     { "name": "Almonds", "amount": 26, "unit":"mg"  },
//     { "name": "Spinach", "amount": 2, "unit":"mg"  },
//     { "name": "Kiwi", "amount": 1.5, "unit":"mg"  },
//     { "name": "Pumpkin", "amount": 1, "unit":"mg"  },
//     { "name": "Avocado", "amount": 2, "unit":"mg"  }
//     ],
//   "vitamin K": [
//     { "name": "Sprouts", "amount": 177, "unit":"mg"  },
//     { "name": "Asparagus", "amount": 41, "unit":"mg"  },
//     { "name": "Spinach", "amount": 483, "unit":"mg"  },
//     { "name": "Kale", "amount": 704, "unit":"mg"  },
//     { "name": "Broccoli", "amount": 102, "unit":"mg"  }
//     ]
// };

var renderDonut = function(selectedVitamin) {

 d3.json("data.json", function(error, data){

var vitamin = data[selectedVitamin] || data["vitamin A"];
var foodList = vitamin.food;

var pie = d3.layout.pie()
  .value(function(d){return d.amount})
  .sort(null)
  .padAngle(.03);

 var w=270;
//  var h=300;
 var h=270;

var outerRadius = w/2 ;
var innerRadius = 80;

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
  .data(pie(foodList))
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
        .data(pie(foodList))
        .enter()
        .append("text")
        .transition()
        .duration(200)
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".4em")
        .attr("text-anchor", "middle")
        .text(function(d){
            return d.data.amount+" "+d.data.unit;
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


  //   var color = d3.scale.ordinal().range(['#41B787', '#6352B9', '#B65480', '#D5735A', '#D7D9DA']);

 });

};
renderDonut();

