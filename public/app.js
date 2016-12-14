// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    // $("#results").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});


var i = 0;
$('#view').on('click', function(){

  $.getJSON("/articles", function(data) {

    if(i==0){
  $("#results").append("<b> TITLE: "+data[i].title + "</b><br><br>LINK: " + data[i].link);
            }
            i=1;
  });
});


$('#next').on('click', function(){
$("#results").text("");

  $.getJSON("/articles", function(data) {

    if(i>0){
  $("#results").append("<b>TITLE: "+data[i].title + "</b><br><br>LINK: " + data[i].link);
            }
  });
      i++;
});





// WHEN USER CLICKS SUBMIT, DATA IS SENT TO SERVER.JS.
// TEXT BOXES ARE EMPTIED
$('#submit').on('click', function(){

  $.POST({
    // type:"POST",
    datatype:"json",
    url:"/",
    data:{title: $("#title").val(),
          body: $("#note").val(),
          created: Date.now()}

  }).done(function(data){
    console.log("=======DATA======");
    console.log(data);
        // Clear the note and title inputs on the page
    $("#note").val(" ");
    $("#title").val(" ");
  })




}) //END SUBMIT CLICK FUNCTION