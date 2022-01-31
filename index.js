require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;

// Authentication Controllers

const authRoute = require("./controllers/auth");

//Mongoose Connection

mongoose.connect(process.env.MONGO_URL)
  .then (() => console.log("Connection Successful"))
  .catch((err) => {
    console.log(err);
  });


app.use(express.json());

app.use("/api/auth", authRoute);



app.listen(PORT, () => {
  console.log(`Server listening on PORT`, PORT);
});