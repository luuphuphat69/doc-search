const express = require('express');
const cors = require('cors');
const app = express ();
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const PORT = 8080;

// Load environment variables from .env file
dotenv.config();

app.use(bodyParser.json({limit: "50mb"}));

// Announce api request
app.use(morgan("common"))
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
   console.log("Server is running at port " + PORT);
});