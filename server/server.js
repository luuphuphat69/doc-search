const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sql = require("mssql");
const searchRoute = require('./router/search_router');
const PORT = 2000;

dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("common"))
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
   origin: ["http://localhost:5173"],
   credentials: true, //included credentials as true
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
};
app.use(cors(corsOptions));

const dbconfig = {

   user: 'phat',
   password: '123123',
   server: 'localhost',
   database: 'EREL_server',
   port:1433,
   options: {
       trustedconnection: true,
       enableArithAbort: true,
       instancename: 'MSI',
       encrypt: true,
       trustServerCertificate: true,
   }
};

app.use('/v1', searchRoute);

app.listen(PORT, () => {
   console.log("Server is running at port " + PORT);
});



async function connectToDatabase() {
   try {
       await sql.connect(dbconfig);
       console.log('Connected to the database successfully');
   } catch (err) {
       console.error('Database connection failed: ', err);
   }
}

async function queryDatabase() {
   try {
       const pool = await sql.connect(dbconfig);
       const result = await pool.request()
           .query('SELECT * FROM Document');
       console.log(result);
   } catch (err) {
       console.error('SQL error: ', err);
   } finally {
       sql.close();
   }
}

connectToDatabase();
queryDatabase();