const db = require("./../services/db");

class Attraction {
  attraction_id;

  attraction_name;

  location_id;

  ranking_in_location;

  is_fee;

  constructor(attraction_id) {
    this.attraction_id = attraction_id; //remember that 'this' refers to this class object (Attraction)
  }

  // Method to set attraction name
  setAttractionName(attraction_name) {
    this.attraction_name = attraction_name;
  }

  // Method to set the location_id
  setLocationId(location_id) {
    this.location_id = location_id;
  }

  setRankingInLocation(ranking_in_location) {
    this.ranking_in_location = ranking_in_location;
  }

  setFee(is_fee) {
    this.is_fee = is_fee;
  }

  async getAttractionDetails() {
    if (typeof this.attraction_name !== "string") {
      var sql = "SELECT* from Attractions where attraction_id = ?";
      const results = await db.query(sql, [this.attraction_id]);
      console.log("results of sql are: " + results);
      this.attraction_name = results[0].attraction_name;
      this.location_id = results[0].location_id;
      this.ranking_in_location = results[0].ranking_in_location;
      this.is_fee = results[0].is_fee;
      console.log("attraction name is: " + this.attraction_name);
    }
  }
}

// Gets list of all destinations
async function getAllAttractions() {
  var sql = "SELECT* from Attractions";
  const results = await db.query(sql);
  var attractions = [];
  for (var row of results) {
    var attraction = new Attraction(row.attraction_id);
    attraction.setLocationId(row.location_id);
    attraction.setAttractionName(row.attraction_name);
    attraction.setRankingInLocation(row.ranking_in_location);
    attraction.setFee(row.is_fee);
    attractions.push(attraction);
  }
  // Get the array of all attractions
  console.log("Attractions are: " + attractions);
  return attractions;
}

// Gets list of all attractions
async function getAllAttractionsTest(userLocationId) {
  var sql = (sql = "SELECT* from Attractions where location_id = ?");
  const results = await db.query(sql, [userLocationId]);
  var attractions1 = [];
  for (var row of results) {
    var attraction1 = new Attraction(row.attraction_id);
    attraction1.setAttractionName(row.attraction_name);
    attraction1.setLocationId(row.location_id);
    attraction1.setRankingInLocation(row.ranking_in_location);
    attraction1.setFee(row.is_fee);
    attractions1.push(attraction1);
  }
  console.log("hotels are: " + attractions1);
  return attractions1;
}

module.exports = {
  Attraction,
  getAllAttractions,
  getAllAttractionsTest,
};
