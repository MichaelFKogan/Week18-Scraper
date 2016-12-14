// DEPENDENCIES
//===============================================================
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var request = require("request")
var cheerio = require("cheerio");
var exphbs = require('express-handlebars');
var app = express();

// HANDLEBARS
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set the app up with morgan, body-parser, and a static folder
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
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

app.get("/", function(req, res) {
    
  request("https://www.reddit.com/", function(error, response, html){
      
      var $ = cheerio.load(html);
          
          // THIS IS A LOOP
          $(".title.may-blank").each(function(i, element){
                
              var result = [];
                  var title = $(this).text();
                  var link = $(this).attr("href");
                
                result.push({title: title, link: link});
                    console.log(result);
                    // db.Article.insert(result);
  
          });
        });
  
  res.render('index');       

});



// This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  db.Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});




// SCRAPES REDDIT, AND SAVES IN DB
// This will get the articles we scraped from the mongoDB
app.get("/scrape", function(req, res) {
  // Grab every doc in the Articles array
  db.Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });


});



// ROUTING
//===============================================================

// DATA IS RECIEVED FROM THE AJAX $.POST /SUBMIT BUTTON IN app.js AND SAVED IN MONGO
app.post('/submit', function(req, res){
  console.log("=======req.body======");
  console.log(req.body);

db.Note.insert(req.body, function(error, saved){
  if(error){console.log(error)}
    else{
      console.log("=======saved======");
      console.log(saved);
      res.send(saved)}

})
})



//EXPRESS LISTENER 
//===============================================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function (){
   console.log('App listening on PORT ' + PORT);
});