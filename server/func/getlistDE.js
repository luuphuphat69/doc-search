const DE = require('../model/DE');
const getlistDE = async () => {
    try {
        const documentEntities = await DE.find({});
        return documentEntities;
    } catch (error) {
        console.error("Error fetching document entities:", error);
    }
};
module.exports = getlistDE;