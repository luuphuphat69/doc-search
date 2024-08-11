const mongoose = require('mongoose');
const BSON = require('bson');
const DE = require('../model/DE');

const updateEFIDFToDB = async (listDE) => {
    try {
        for (const entity of listDE) {
            try {
                const entityID = new BSON.Long(entity.EntityID);
                const docID = new BSON.Int32(entity.DocID);

                const updateResult = await DE.updateOne(
                    { EntityID: entityID, DocID: docID },
                    { $set: { ef_idf: entity.EF_IDF } },
                    { upsert: false } // Set to true if you want to insert if not found
                );
                if (updateResult.matchedCount === 0) {
                    console.log(`Not found: EntityID ${entity.EntityID}, DocID ${entity.DocID}`);
                }
            } catch (error) {
                console.error(`Error updating EntityID: ${entity.EntityID}, DocID: ${entity.DocID}:`, error);
            }
        }
    } catch (error) {
        console.error('Error in updateEFIDFToDB function:', error);
    }
};

module.exports = updateEFIDFToDB;