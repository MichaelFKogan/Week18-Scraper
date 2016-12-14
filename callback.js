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

function callback(){
  console.log("scrape complete")
}

    request("https://www.reddit.com/", function(error, response, html){
          console.log("Loading...");

          var $ = cheerio.load(html);
          $(".title.may-blank").each(function(i, element){
                
                var result = [];
                var title = $(this).text();
                var link = $(this).attr("href");
            
                result.push({
                    title: title,
                    link: link
                            });
                
                console.log(result);

                  // db.Article.insert(result);
                  // $("#results").append(result);
          });

        });
    res.send("Scraping");
});


// EXAMPLE
//===============================================================
// function finditem(){
//   var item;
//   while(item_not_found){
//     // SEARCH
//   }
//   return item;
// }

// var item = finditem();
// // Do something with item
// doSomethingElse();





//EXPRESS LISTENER 
//===============================================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function (){
   console.log('App listening on PORT ' + PORT);
});