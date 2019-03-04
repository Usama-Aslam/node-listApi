const express = require("express");
const bodyParse = require("body-parser");
const _ = require("lodash");

const { mongoose } = require("./db/mongoose");
const { List } = require("./models/List");
const { User } = require("./models/User");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParse.json());

app.post("/lists", (req, res) => {
  var body = _.pick(req.body, ["text", "category"]);

  const newList = new List(body);
  newList
    .save()
    .then(list => {
      console.log("Insert Successful", list);
      res.status(200).send(list);
    })
    .catch(e => res.status(404).send(e));
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));

module.exports = {
  app
};
