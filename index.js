require('dotenv').config();
const express = require("express");
const app = express;
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
}); vbhjio

module.exports = server;
