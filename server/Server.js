const express = require("express");

const { mongoose } = require("./db/mongoose");
const { List } = require("./models/List");
const { User } = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
