const sendQuery = require("../usage/sendQuery");
const jsonData = require("../usage/keyword.json");

const SearchController = {
    search: async (req, res) => {
        try {
            const query = req.query.queries;
            if (!query) {
                return res.status(400).json({ message: "Query parameter is required" });
            }
            const keys = Object.keys(jsonData);
            const matchingKey = keys.find(key => query === key);
            if (matchingKey) {
                return res.status(200).json({
                    type: 'json',
                    data: jsonData[matchingKey]
                });
            } else {
                const webData = sendQuery(query);
                return res.status(200).json({
                    type: 'web',
                    data: webData
                });
            }
        } catch (err) {
            console.error('error: ', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = SearchController;