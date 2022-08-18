const db = require("./../services/db");

class Destination {
  location_id;

  destination;

  constructor(destination) {
    this.destination = destination;
  }

  // Method to set the location_id
  setLocationId(destination) {
    this.destinatin = destination;
  }

  setLocationId(location_id) {
    this.location_id = location_id;
  }

  async getLocationId() {
    if (typeof this.location_id !== "string") {
      var sql = "SELECT* from Destinations where destination = ?";
      const results = await db.query(sql, [this.destination]);
      console.log("results of sql are: " + results);
      this.location_id = results[0].location_id;
      console.log("location_id is: " + this.location_id);
    }
  }
}

// Gets list of all destinations
async function getAllDestinations() {
  var sql = "SELECT destination, location_id from Destinations";
  const results = await db.query(sql);
  var destinations = [];
  for (var row of results) {
    var destination = new Destination(row.destination);
    destination.setLocationId(row.location_id);
    destinations.push(destination);
  }
  // Return the array of all destinations
  console.log("destinations123 are: " + destinations);
  return destinations;
}

module.exports = {
  Destination,
  getAllDestinations,
};
