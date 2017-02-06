//Get json data
d3.json("data.json", function(error, data) {

    //Set initial values
    var vitamin = data["vitamin A"];
    var chart = d3.select(".chart svg");
    var structure = d3.select(".structure svg");
    var donut = d3.select(".donutGraph svg");
    var intakeList = []; //for dropdown
    var vitaminList = []; //for dropdown

    //populating vitaminList for dropdown
    for (var key in data) {
        vitaminList.push(key);
    }
    //populating intakeList for dropdown
    for (var key in vitamin.recommendedIntakes) {
        intakeList.push(key);
    }

    var updateChart = function() {
        var intakeSelection = document.getElementById("intakedropdown").value;
        var vitaminSelection = document.getElementById("vitamindropdown").value;
        var chart = d3.select(".chart svg");
        //remove from page
        chart.remove();
        //add back to page
        renderChart(vitaminSelection, intakeSelection);
    };

    var intakeSelector = d3.select("#intakedrop")
        .append("select")
        .attr("id", "intakedropdown")
        .on("change", updateChart);

    intakeSelector.selectAll("option")
        .data(intakeList)
        .enter().append("option")
        .attr("value", function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        });

    var updateLayout = function() {
        console.log("update layout being called");
        var intakeSelection = document.getElementById("intakedropdown").value;
        var vitaminSelection = document.getElementById("vitamindropdown").value;
        var chart = d3.select(".chart svg");
        var structure = d3.select(".structure svg");
        var donut = d3.select(".donutGraph svg");
        //remove from page
        chart.remove();
        structure.remove();
        donut.remove();
        $('.description h1').remove();
        $('.description p').remove();
        //add back to page
        renderStructure(vitaminSelection);
        renderChart(vitaminSelection, intakeSelection);
        renderDonut(vitaminSelection);
        renderDescription(vitaminSelection);
    };

    //drop down selector for vitamins
    var vitaminSelector = d3.select("#vitamindrop")
        .append("select")
        .attr("id", "vitamindropdown")
        .on("change", updateLayout);

    vitaminSelector.selectAll("option")
        .data(vitaminList)
        .enter().append("option")
        .attr("value", function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        });

});
