const DE = require('../model/DE');
const getlistDE = async () => {
    try {
        const documentEntities = await DE.find({});
        await mongoose.disconnect();
        return documentEntities;
    } catch (error) {
        console.error("Error fetching document entities:", error);
    }
};
module.exports = getlistDE;