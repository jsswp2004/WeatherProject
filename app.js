const express = require('express');
const https = require("https");

const app = express();

app.get("/", function(req,res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=New York&appid=6cc85400debdd5c070f6cffaac4160fb&units=imperial";
  //res.send("Server is up and running,");
  https.get(url,function(response){
    console.log(response.statusCode);
  });
})





app.listen(3000, function(){
  console.log("Server is running on port 3000");
} )
