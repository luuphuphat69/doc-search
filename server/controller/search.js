const sendQuery = require("../services/sendQuery");

const SearchController = {
    search: async (req, res) => {
        try {
            const query = req.query.queries;
            if (!query) {
                res.status(400).json({ message: "Query parameter is required" });
            }
            sendQuery(query);
            res.status(200).json({message: "Sent query", query});
        } catch (err) {
            console.error('error: ', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
module.exports = SearchController;