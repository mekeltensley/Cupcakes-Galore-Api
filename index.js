require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;

// Mongoose Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection Successful"))
  .catch((err) => {
    console.log(err);
  })

// Authentication Controllers

const authRoute = require("./controllers/auth");

// Middleware

app.use(express.json());

app.use("/api/auth", authRoute);



app.listen(PORT, () => {
  console.log(`Server listening on PORT`, PORT);
});