require("dotenv").config();
const express = require("express");
const ConnectDatabase = require("./config/db");

const server = express();

// connect Database here
ConnectDatabase();

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
   
});
