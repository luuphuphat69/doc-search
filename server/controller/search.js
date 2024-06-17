const sql = require("mssql");
const dbconfig = require('../dbconfig');

const SearchController = {
    search: async(req, res) => {
        try {
            const pool = await sql.connect(dbconfig);
            const result = await pool.request()
                .query('SELECT * FROM Document');
            console.log(result);
            return res.status(201).json(result);
        } catch (err) {
            console.error('SQL error: ', err);
        } finally {
            sql.close();
        }
    }
}

module.exports = SearchController;