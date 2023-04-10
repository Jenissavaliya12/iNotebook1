require("dotenv").config();
const mongoose = require("mongoose");

const DB = process.env.DATABASE_URL;

const connectToMongo = () => {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("connection sucsessfully");
    })
    .catch((err) => console.log(`no connection`));
};

module.exports = connectToMongo;
