const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const resultRoute = require('./router/result_router');
const PORT = 2000;
const calEFIDF = require('./func/cal_efidf');
const getlistDE = require('./func/getlistDE');
const updateEFIDFToDB = require('./func/updateEFIDFToDB');
const config = require('./config/config');

const corsOptions = {
  origin: ["http://localhost:5173", "http://3.81.8.209:5173"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Origin',
    'X-Requested-With',
    'Accept',
    'x-client-key',
    'x-client-token',
    'x-client-secret',
    'Authorization'
  ],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" })); // Use express.json() instead of bodyParser
app.use(morgan("common"));

// Define routes
app.use('/v1', resultRoute);

// Connect to MongoDB
const mongoURI = config.db;
(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();

// Start server
app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});

app.post('/taskcomplete', async (req, res) => {
  try {
    console.log('Task completed notification received.');

    const listDE = await getlistDE();
    const efidf = calEFIDF(listDE);
    await updateEFIDFToDB(efidf);

    return res.status(200).send('Notification received and updated successfully');
  } catch (error) {
    console.error('Error updating EFIDF:', error);
    return res.status(500).send('An error occurred while processing the request');
  }
});