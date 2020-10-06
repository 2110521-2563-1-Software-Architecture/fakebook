const dotenv = require("dotenv");

const envFile = ".env";
dotenv.config({ path: envFile });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const mongoose = require("mongoose");

// connect db
mongoose.connect("mongodb://localhost/softarch", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

// Router
app.use("/api", require("./routes"));

const server = app.listen(5000, () => console.log("server started"));

module.exports = server;
