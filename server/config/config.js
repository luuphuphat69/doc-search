const dotenv = require('dotenv');
dotenv.config();

const config = {
    db: process.env['MONGO_DATABASE'],
    api: process.env['GOOGLE_API_KEY']
}
module.exports = config;