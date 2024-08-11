const GetListEntities = require('../services/gelistentities');
const GetQuery = require('../services/getquery');
const mongoose = require('mongoose');

const resultController = {
    result: async (req, res) => {
        try {
            const query = await GetQuery();
            const listEntities = await GetListEntities();

            console.log(listEntities);
            console.log(query);

            return res.status(200);
        } catch (err) {
            console.error('error: ', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = resultController;