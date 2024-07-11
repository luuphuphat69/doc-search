const getlistdoc = require("../usage/getlistdoc");
const resultController = {
    result: async (req, res) => {
        try {
            const listdoc = await getlistdoc();
            return res.status(200).json(listdoc);
        } catch (err) {
            console.error('error: ', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = resultController;