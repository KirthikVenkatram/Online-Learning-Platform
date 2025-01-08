const mongoose = require("mongoose");
require('dotenv').config();

const connectionOfDb = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/olp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      throw new Error(`Could not connect to MongoDB: ${err}`);
    });
};

module.exports = connectionOfDb;
