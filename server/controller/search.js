const sendQuery = require("../usage/sendQuery");
const jsonData = require("../usage/keyword.json");
const clearlist = require("../usage/clearlistdoc");
const listdoc = require("../usage/getlistdoc");

const SearchController = {
    search: async (req, res) => {
        try {
            if(listdoc){
                clearlist();
            }
            const query = req.query.queries;
            if (!query) {
                return res.status(400).json({ message: "Query parameter is required" });
            }

            const keys = Object.keys(jsonData);
            const matchingKeys = keys.filter(key => query.includes(key));

            let jsonDataResult = null;
            if (matchingKeys.length > 0) {
                jsonDataResult = matchingKeys.map(key => jsonData[key]);
            }

            await sendQuery(query);

            let response = {
                data: {}
            };

            if (jsonDataResult) {
                response.data = jsonDataResult;
            }
            return res.status(200).json(response);
        } catch (err) {
            console.error('error: ', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
module.exports = SearchController;