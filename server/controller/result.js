const GetParsedEntitiesFromQuery = require('../services/getparsedentities');
const GetQuery = require('../services/getquery');
const Metadata = require('../model/Metadata');
const DE = require('../model/DE');
const Entity = require('../model/Entity');
const Document = require('../model/Document');
const ClearQuery = require("../services/clearquery");
const ClearListEntities = require("../services/clearlistentities");

const resultController = {
    result: async (req, res) => {
        try {
            // Finding docs by entities
            const listEntities = await GetParsedEntitiesFromQuery();
            console.log(listEntities);
            let retrievedDocsEntity = [];
            if (listEntities && listEntities.length > 0) {
                for (const entity of listEntities) {
                    // Find the entity in the Entity collection
                    const entityRecord = await Entity.findOne({ 
                        EntityName: { $regex: `^${entity}$`, $options: 'i' }
                    });

                    if (entityRecord) {
                        const entityId = entityRecord.EntityID;

                        // Use the EntityID to find document IDs in the DE collection
                        const deRecords = await DE.find({ EntityID: entityId }).sort({ ef_idf: -1 });
                        // Retrieve the documents from the Documents collection
                        for (const deRecord of deRecords) {
                            const document = await Document.findOne({ DocID: deRecord.DocID });
                            if (document) {
                                retrievedDocsEntity.push(document);
                            }
                        }
                    }
                }
            } else {
                console.log("No data retrieved from NLPE.");
            }

            // Finding docs by metadata
            const wsQuery = await GetQuery();
            const queryString = JSON.stringify(wsQuery);
            const queryObject = JSON.parse(queryString);
            const query = queryObject.GetQueryResult;
            const retrievedDocsMetadata = await Metadata.find({
                metadata: { $regex: query, $options: 'i' } // Case-insensitive search
            });
            
           
            const combinedData = [
                ...flattenMetadataDocs(retrievedDocsMetadata),
                ...retrievedDocsEntity
              ];
              console.log("metada", flattenMetadataDocs(retrievedDocsMetadata));
            const uniqueData = Array.from(
                new Map(combinedData.map(doc => [String(doc.DocID || doc.Id), doc])).values()
            );

            console.log(uniqueData);
            return res.status(200).json(uniqueData);

        } catch (err) {
            console.error('error: ', err);
            return res.status(500).json({ message: "Internal server error" });
        }
        // finally{
        //     ClearListEntities();
        //     ClearQuery();
        // }
    }
}
const flattenMetadataDocs = (metadataDocs) => {
    return metadataDocs.flatMap(metadataDoc => metadataDoc.docs);
};

module.exports = resultController;