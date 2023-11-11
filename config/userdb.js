const mongoose = require("mongoose");
const MONGODB_URL =
  process.env.MONGO_URI || "mongodb://localhost:27017/user_backend";

// mongoDb database connection
const databaseconnect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then((conn) => console.log(`connected to DB: ${conn.connection.host}`))
    .catch((err) => console.log(err.message));
};

module.exports = databaseconnect;
