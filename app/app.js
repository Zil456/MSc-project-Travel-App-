// Import express.js
const express = require("express");
const multer = require("multer");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require("./services/db");

// Make sure we get the POST parameters
app.use(express.urlencoded({ extended: true }));

//Import models
const { User } = require("./models/user");
const { Hotel } = require("./models/hotels");
const { Attraction } = require("./models/attractions");
const { Flight } = require("./models/flights");
const { Destination } = require("./models/destinations");
const getdestination = require("./models/destinations");
const gethotels = require("./models/hotels");
const getflights = require("./models/flights");
const getattractions = require("./models/attractions");

//use the pug templating engine
app.set("view engine", "pug");
app.set("views", "./app/views");

// Create a route for root - /
app.get("/", function (req, res) {
  res.send("Hello world!");
});

// Handler for the user / home page
app.get("/single-user-test/:user_id", async function (req, res) {
  var userId = req.params.user_id;
  var user = new User(userId);
  await user.getUserDetails();
  await user.getUserLocationID();

  var destinationz = await getdestination.getAllDestinations();
  console.log("destinationz is: " + destinationz);

  res.render("user-test", {
    user: user,
    destinationz: destinationz,
  });
});

// Route for finding recommendations
app.post("/recommendations-test/", async function (req, res) {
  // Get the values from request
  var params = req.body;
  console.log("params are: " + params);
  var recommendedHotels = await gethotels.getAllHotelsTest(
    params.userLocationId
  );
  console.log("recommendedHotels yra: " + recommendedHotels);

  var recommendedFlights = await getflights.getAllFlightsTest(
    params.userLocationId
  );
  console.log("recommendedFlights are: " + recommendedFlights);

  var recommendedAttractions = await getattractions.getAllAttractionsTest(
    params.userLocationId
  );
  console.log("recommendedAttractions are: " + recommendedAttractions);

  res.render("recommendations-test", {
    recommendedHotels: recommendedHotels,
    recommendedFlights: recommendedFlights,
    recommendedAttractions: recommendedAttractions,
  });
});

// End of recommendations handler

app.get("/hotels/:hotel_id", async function (req, res) {
  var hotelID = req.params.hotel_id;
  var hotel = new Hotel(hotelID);
  await hotel.getHotelDetails();
  console.log("hotel details are: " + hotelID);

  var hotelz = await gethotels.getAllHotels();
  console.log("hotelz are: " + hotelz);

  //console.log("hotel is: " + hotel);
  res.render("hotels", { hotel: hotel, hotelz: hotelz });
});

app.get("/attractions/:attraction_id", async function (req, res) {
  var attractionID = req.params.attraction_id;
  var attraction = new Attraction(attractionID);
  await attraction.getAttractionDetails();
  console.log("attraction details are: " + attractionID);
  //console.log("hotel is: " + hotel);

  var attractionz = await getattractions.getAllAttractions();
  console.log("attractionz are: " + attractionz);

  res.render("attractions", {
    attraction: attraction,
    attractionz: attractionz,
  });
});

app.get("/flight/:flight_id", async function (req, res) {
  var flightID = req.params.flight_id;
  var flight = new Flight(flightID);
  await flight.getFlightDetails();
  console.log("flight details are: " + flightID);

  var flightz = await getflights.getAllFlights();
  console.log("flightz are: " + flightz);

  //console.log("hotel is: " + hotel);
  res.render("flight", { flight: flight, flightz: flightz });
});

app.get("/destinations/:destination", async function (req, res) {
  var DestinationCountry = req.params.destination;
  var destination = new Destination(DestinationCountry);
  await destination.getLocationId();
  var destinationz = await getdestination.getAllDestinations();
  console.log("destinationz is: " + destinationz);
  console.log("Destination is: " + DestinationCountry);
  //console.log("hotel is: " + hotel);
  res.render("destination", {
    destination: destination,
    destinationz: destinationz,
  });
});

// Create a route for testing the db
app.get("/database_test", function (req, res) {
  // Assumes a table called Users exists in the database
  sql = "select * from Users";
  db.query(sql).then((results) => {
    console.log(results);
    res.send(results);
  });
});

// Start listening to server on port 3000
app.listen(3000, function () {
  console.log(`Server running at http://127.0.0.1:3000/`);
});
