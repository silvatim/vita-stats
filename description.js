
var renderDescription = function(selectedVitamin) {

 d3.json("data.json", function(error, data){

  var vitamin = data[selectedVitamin] || data["vitamin A"];
  var title = vitamin.title;
  var description = vitamin.description;

  //Adding title and description of vitamin to the information box
  $(".description").append('<h1>'+title+'</h1>').append('<p>'+description+'</p>');

 });

};

renderDescription();

