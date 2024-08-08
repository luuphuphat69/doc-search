const DE = require('../model/DE');

const updateEFIDFToDB = async (listDE) => {
    try {
        // Iterate through each document entity and update the EF-IDF in the database
        for (const entity of listDE) {
            // Use the updateOne method to update the document matching EntityID and DocID
            await DE.updateOne(
                { EntityID: entity.EntityID, DocID: entity.DocID },
                { $set: { ef_idf: entity.EF_IDF } }
            );
        }
    } catch (error) {
        console.error('Error updating EF-IDF values in the database:', error);
    }
};
module.exports = updateEFIDFToDB;