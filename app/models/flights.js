const db = require("./../services/db");

class Flight {
  flight_id;

  airline;

  origin;

  destination;

  date;

  price;

  location_id;

  constructor(flight_id) {
    this.flight_id = flight_id; //remember that 'this' refers to this class object
  }

  setAirline(airline) {
    this.airline = airline;
  }

  setOrigin(origin) {
    this.origin = origin;
  }

  setDestination(destination) {
    this.destination = destination;
  }

  setPrice(price) {
    this.price = price;
  }

  setDate(date) {
    this.date = date;
  }

  setLocation_id(location_id) {
    this.location_id = location_id;
  }

  async getFlightDetails() {
    if (typeof this.airline !== "string") {
      var sql = "SELECT* from Flights where flight_id = ?";
      const results = await db.query(sql, [this.flight_id]);
      console.log("results of sql are: " + results);
      this.airline = results[0].airline;
      this.origin = results[0].origin;
      this.destination = results[0].destination;
      this.date = results[0].date;
      this.price = results[0].price;
      console.log("flight is: " + this.airline);
    }
  }
}

// Gets list of all flights
async function getAllFlights() {
  var sql = "SELECT* from Flights";
  const results = await db.query(sql);
  var flights = [];
  for (var row of results) {
    var flight = new Flight(row.flight_id);
    flight.setAirline(row.airline);
    flight.setOrigin(row.origin);
    flight.setDestination(row.destination);
    flight.setPrice(row.price);
    flight.setDate(row.date);
    flights.push(flight);
  }
  // Return the array of all flights
  console.log("flights are: " + flights);
  return flights;
}

// Gets list of all flights
async function getAllFlightsTest(userLocationId) {
  var sql = (sql = "SELECT* from Flights where location_id = ?");
  const results = await db.query(sql, [userLocationId]);
  var flights1 = [];
  for (var row of results) {
    var flight1 = new Flight(row.flight_id);
    flight1.setAirline(row.airline);
    flight1.setOrigin(row.origin);
    flight1.setPrice(row.price);
    flight1.setDate(row.date);
    flight1.setDestination(row.destination);
    flight1.setLocation_id(row.location_id);
    flights1.push(flight1);
  }
  // Return the array of all flights
  console.log("flights are: " + flights1);
  return flights1;
}

module.exports = {
  Flight,
  getAllFlights,
  getAllFlightsTest,
};
