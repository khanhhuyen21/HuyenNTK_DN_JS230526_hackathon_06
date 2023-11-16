// ==== CONNECT EXPRESS TO MYSQL ====
// get the client
require("dotenv").config();
const { connect } = require("http2");
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || " ",
  port: process.env.DB_PORT || " ",
  user: process.env.DB_USER || " ",
  password: process.env.DB_PASSWORD || " ",
  database: process.env.DB_DATABASE || " ",
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;