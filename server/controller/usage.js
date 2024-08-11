const clearlistdoc = require('../services/clearlistentities');
const usageController = {
    clearlist: async (req, res) => {
        try {
            await clearlistdoc();
            return res.status(200);
        } catch (err) {
            console.error('error: ', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = usageController;