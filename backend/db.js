const mongoose = require("mongoose");
const DB =
  "mongodb+srv://savaliyajenis12:savaliyajenis12@cluster0.zyvobjf.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("connection sucsessfully");
    })
    .catch((err) => console.log(`no connection`));
};

module.exports = connectToMongo;
