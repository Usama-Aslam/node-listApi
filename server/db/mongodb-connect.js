const { mongoose } = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/ListApp", {
    userNewUrlParser: true
  })
  .then(() => console.log("======mongodb connected======"))
  .catch(e => console.log("unable to connect mongodb"));

module.exports = {
  mongoose
};
