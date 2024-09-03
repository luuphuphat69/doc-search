const Metadata = require('../model/Metadata');
const DE = require('../model/DE');
const Entity = require('../model/Entity');
const Document = require('../model/Document');
const parsingQuery = require('../func/parsing_query');

const resultController = {
    result: async (req, res) => {
        try {
            // Finding docs by metadata

            const query = req.query.queries;
            const metadataList = await Metadata.find({});
            const retrievedDocsMetadata = metadataList.filter(p => query.includes(p.metadata.toString()));
            // const retrievedDocsMetadata = await Metadata.find({
            //     metadata: { $regex: query, $options: 'i' } // Case-insensitive search
            // });
            const flattenRetrievedMetadataDocs = flattenMetadataDocs(retrievedDocsMetadata);

            // Finding docs by entities
            const listEntities = await parsingQuery(query);
            let retrievedDocsEntity = [];
            if (listEntities && listEntities.length > 0) {
                for (const entity of listEntities) {
                    console.log(`Entity: ${entity}`);
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
                    console.log(retrievedDocsEntity);
                }
            } else {
                console.log("No data retrieved from NLPE.");
            }

            const combinedData = [
                ...flattenRetrievedMetadataDocs,
                ...retrievedDocsEntity
            ];

            const uniqueData = Array.from(
                new Map(combinedData.map(doc => [String(doc.DocID || doc.Id || doc.id), doc])).values()
            );
            return res.status(200).json(uniqueData);

        } catch (err) {
            console.error('error: ', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
const flattenMetadataDocs = (metadataDocs) => {
    return metadataDocs.flatMap(metadataDoc => metadataDoc.docs);
};

module.exports = resultController;