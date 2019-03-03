const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/ListApp", {
    useNewUrlParser: true
  })
  .then(() => console.log("=====mongodb connected====="))
  .catch(e => console.log("===unabe to connect====", e));

module.exports = {
  mongoose
};
