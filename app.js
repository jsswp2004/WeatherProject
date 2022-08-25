const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
//this is for html, can also use text or json, extended true allows nested calls
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  //Code below brings the index.html input to the js code to specify the city
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  //console.log("Post Request Received.");
  //code below pull value from city name input (cityName - name of text input field)
  //console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = "6cc85400debdd5c070f6cffaac4160fb";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  //res.send("Server is up and running,");
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      //json.parse converts json file to js object
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      //pulling data from JSON -- use dot notation
      //if json file is long use json awesome viewer for path, just use api url string
      const temp = weatherData.main.temp_max; //main.temp
      // console.log(temp);
      //main.temp_max
      const weatherDescription = weatherData.weather[0].description;
      //console.log(weatherDescription);
      //code below pulls icon from website
      const icon = weatherData.weather[0].icon;
      const weatherImageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //res.write - enables multiple send
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query +" is " + temp + " degress Celcius</h1>");
      //note: img tag is self closing - no need for an end tag
      res.write("<img src=" + weatherImageURL + ">");
      res.send();
    })
  })
  //only one res.send is allowed
  //res.send("Server is running");
})
app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
