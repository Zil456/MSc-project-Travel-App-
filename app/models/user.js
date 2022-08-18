const db = require("./../services/db");

//Define the user class
class User {
  //user ID
  user_id;
  //user first name
  first_name;
  //user last name
  last_name;
  //user address
  address;
  //user email
  email;
  //telephone
  telephone;
  //user location_id is retrieved using the destination attribute(see getUserLocationID())
  location_id;

  constructor(user_id) {
    this.user_id = user_id;
  }

  //pull user name and other details from database
  async getUserDetails() {
    if (typeof this.first_name !== "string") {
      var sql = "SELECT* from Users where user_id = ?";
      const results = await db.query(sql, [this.user_id]);
      this.first_name = results[0].first_name;
      this.last_name = results[0].last_name;
      this.address = results[0].address;
      this.email = results[0].email;
      this.telephone = results[0].telephone;
      console.log("first name is: " + this.first_name);
    }
  }

  async getUserLocationID() {
    if (typeof this.location_id !== "string") {
      var sql =
        "Select * from Destinations d \
    JOIN Users u ON d.destination = u.destination \
    WHERE u.user_id = ?";
      console.log("sql is: ", +sql);
      var results = await db.query(sql, [this.user_id]);
      console.log("getUserLocationID results are: " + results);
      this.location_id = results[0].location_id;
      console.log("location is: " + this.location_id);
    }
  }
}

module.exports = {
  User,
};
