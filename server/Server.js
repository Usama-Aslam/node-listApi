const express = require("express");
const bodyParse = require("body-parser");
const _ = require("lodash");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { List } = require("./models/List");
const { User } = require("./models/User");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParse.json());

app.post("/lists", (req, res) => {
  var body = _.pick(req.body, ["text", "category"]);

  const newList = new List(body);
  newList
    .save()
    .then(list => {
      // console.log("Insert Successful", list);
      res.status(200).send(list);
    })
    .catch(e => res.status(404).send(e));
});

app.get("/lists", (req, res) => {
  List.find()
    .then(lists => res.status(200).send({ lists }))
    .catch(e => res.status(404).send(e));
});

app.get("/lists/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id))
    return res.status(400).send({ error: "invalid list" });

  List.findById(id)
    .then(list => {
      if (!list) return res.status(404).send({ error: "list not found" });

      res.status(200).send({ list });
    })
    .catch(e => res.status(404).send(e));
});

app.delete("/lists/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id))
    return res.status(400).send({ error: "invalid list" });

  List.findByIdAndRemove(id)
    .then(list => {
      if (!list) return res.status(404).send({ error: "list not found" });

      res.status(200).send({ list });
    })
    .catch(e => res.status(404).send(e));
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));

module.exports = {
  app
};
