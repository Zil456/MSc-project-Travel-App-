const db = require("./../services/db");
const { Destinations } = require("./destinations");

class Hotel {
  hotel_id;

  hotel_name;

  location_id;

  value_ranking_in_location;

  price;

  city;

  constructor(hotel_id) {
    this.hotel_id = hotel_id;
  }

  // Method to set the hotel name
  setHotelName(hotel_name) {
    this.hotel_name = hotel_name;
  }

  // Method to set the location_id
  setLocationId(location_id) {
    this.location_id = location_id;
  }

  setPrice(price) {
    this.price = price;
  }
  setValueInLocation(value_ranking_in_location) {
    this.value_ranking_in_location = value_ranking_in_location;
  }

  setCity(city) {
    this.city = city;
  }

  async getHotelDetails() {
    if (typeof this.hotel_name !== "string") {
      var sql = "SELECT* from Hotels where hotel_id = ?";

      const results = await db.query(sql, [this.hotel_id]);
      console.log("results of sql are: " + results);
      this.hotel_name = results[0].hotel_name;
      this.location_id = results[0].location_id;
      this.value_ranking_in_location = results[0].value_ranking_in_location;
      this.price = results[0].price;
      console.log("hotel name is: " + this.hotel_name);
    }
  }
}

// Gets list of all hotels
async function getAllHotels() {
  var sql = "SELECT* from Hotels";
  const results = await db.query(sql);
  var hotels = [];
  for (var row of results) {
    var hotel = new Hotel(row.hotel_name);
    hotel.setLocationId(row.location_id);
    hotel.setHotelName(row.hotel_name);
    hotel.setPrice(row.price);
    hotel.setCity(row.city);
    hotels.push(hotel);
  }
  // Return the array of all hotels
  console.log("hotels are: " + hotels);
  return hotels;
}

// Gets list of all hotels
async function getAllHotelsTest(userLocationId) {
  var sql = (sql = "SELECT* from Hotels where location_id = ?");
  const results = await db.query(sql, [userLocationId]);
  var hotels1 = [];
  for (var row of results) {
    var hotel1 = new Hotel(row.hotel_name);

    hotel1.setLocationId(row.location_id);
    hotel1.setHotelName(row.hotel_name);
    hotel1.setPrice(row.price);
    hotel1.setValueInLocation(row.value_ranking_in_location);
    hotel1.setCity(row.city);
    hotels1.push(hotel1);
  }
  // Return the array of all hotels
  console.log("hotels are: " + hotels1);
  return hotels1;
}

module.exports = {
  Hotel,
  getAllHotels,
  getAllHotelsTest,
};
