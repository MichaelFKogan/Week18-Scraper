// DEPENDENCIES
//===============================================================
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var request = require('request');
var cheerio = require("cheerio");
var app = express();

// Set the app up with morgan, body-parser, and a static folder
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static("public"));




// SETTING UP A MONGO CONNECTION
//===============================================================
var mongojs = require("mongojs");

var databaseUrl = "week18hw";
var collections = ["data"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});



// SCRAPING
//===============================================================

request('https://www.trello.com', function (error, response, body) {
  if(error){console.log(error)}
  else if (!error && response.statusCode == 200) {
    console.log(body); // Show the HTML for the Google homepage. 
  }
})






//EXPRESS LISTENER 
//===============================================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function (){
   console.log('App listening on PORT ' + PORT);
});