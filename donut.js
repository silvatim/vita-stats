
var renderDonut = function() {

  d3.json("data.json", function(error, data){

var vitamins = {
  "vitamin A": [ //mcg
    { name: 'Carrots', amount: 852 },
    { name: 'Spinach', amount: 500 },
    { name: 'Sweet Potato', amount: 961 },
    { name: 'Kale', amount: 550 },
    { name: 'Tuna', amount: 757 }
    ],
  "vitamin B1": [ //mg
    { name: 'Pork', amount: 1.1 },
    { name: 'Bread', amount: 0.5 },
    { name: 'Seeds', amount: 1.5 },
    { name: 'Trout', amount: 0.4 },
    { name: 'Beans', amount: 0.2 }
    ],
  "vitamin B2": [ //mg
    { name: 'Almonds', amount: 1.1 },
    { name: 'Egg', amount: 0.5},
    { name: 'Beef', amount: 0.9 },
    { name: 'Mushrooms', amount: 0.5 },
    { name: 'Cheese', amount: 1.4 }
    ],
  "vitamin B3": [ //mg
    { name: 'Chicken', amount: 15 },
    { name: 'Peas', amount: 2 }
    { name: 'Peanuts', amount: 14 },
    { name: 'Beef', amount: 9 },
    { name: 'Avocado', amount: 2 },
    ],
  "vitamin B5": [ //mg
    { name: 'Cheese', amount: 3.3 },
    { name: 'Pork', amount: 1.6 },
    { name: 'Mushroom', amount: 3.6 },
    { name: 'Trout', amount: 2.2 },
    { name: 'Egg', amount: 1.5 }
    ],
  "vitamin B6": [//mcg
    { name: 'Banana', amount: 0.4 },
    { name: 'Turkey', amount: 0.8 },
    { name: 'Garlic', amount: 1.2 },
    { name: 'Salmon', amount: 0.6 },
    { name: 'Chicken', amount: 0.5 }
    ],
  "vitamin B7": [ //mcg
    { name: 'Egg', amount: 25 },
    { name: 'Califlower', amount: 17 },
    { name: 'Mushrooms', amount: 16 },
    { name: 'Peas', amount: 18 },
    { name: 'Peanuts', amount: 39 }
    ],
  "vitamin B9": [ //mcg
    { name: 'Oranges', amount: 39 },
    { name: 'Spinach', amount: 194 },
    { name: 'Lentils', amount: 181 },
    { name: 'Broccoli', amount: 108 },
    { name: 'Beans', amount: 209 }
    ],
  "vitamin B12": [ //mcg
    { name: 'Liver', amount: 70 },
    { name: 'Cheese', amount: 3 },
    { name: 'Cereals', amount: 20 },
    { name: 'Shellfish', amount: 98},
    { name: 'Egg', amount: 2 }
    ],
  "vitamin C": [ //mg
    { name: 'Oranges', amount: 59},
    { name: 'Kale', amount: 120 },
    { name: 'Kiwi', amount: 93 },
    { name: 'Broccoli', amount: 89},
    { name: 'Capsicum', amount: 128 }
    ],
  "vitamin D": [ //mcg
    { name: 'Salmon', amount: 19 },
    { name: 'Egg', amount: 2 },
    { name: 'Mushrooms', amount: 28 },
    { name: 'Cereals', amount: 8 },
    { name: 'Tofu', amount: 4 }
    ],
  "vitamin E": [ //mg
    { name: 'Almonds', amount: 26 },
    { name: 'Spinach', amount: 2 },
    { name: 'Kiwi', amount: 1.5 },
    { name: 'Pumpkin', amount: 1 },
    { name: 'Avocado', amount: 2 }
    ],
  "vitamin K": [ //mcg
    { name: 'Sprouts', amount: 177 },
    { name: 'Asparagus', amount: 41 },
    { name: 'Spinach', amount: 483 },
    { name: 'Kale', amount: 704 },
    { name: 'Broccoli', amount: 102 }
    ]
};
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
  .data(pie(vitamins["vitamin C"]))
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
        .data(pie(vitamins["vitamin C"]))
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


  //   var color = d3.scale.ordinal().range(['#41B787', '#6352B9', '#B65480', '#D5735A', '#D7D9DA']);

 });

};
renderDonut();

