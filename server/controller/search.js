const sendQuery = require("../services/sendQuery");
const ClearListEntities = require("../services/clearlistentities");
const ClearQuery = require("../services/clearquery");

const SearchController = {
    search: async (req, res) => {
        ClearListEntities();
        ClearQuery();
        try {
            const query = req.query.queries;
            if (!query) {
                return res.status(400).json({ message: "Query parameter is required" });
            }
            await sendQuery(query);
            return res.status(200).json({message: "Sent query", query});
        } catch (err) {
            console.error('error: ', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
module.exports = SearchController;