const efidf = (documentEntities) => {
    // Total entities in each document
    const totalEntitiesPerDoc = documentEntities.reduce((acc, de) => {
        if (!acc[de.DocID]) {
            acc[de.DocID] = 0;
        }
        acc[de.DocID] += de.entity_count;
        return acc;
    }, {});

    // Calculate Entity Frequency (TF)
    const entityFrequency = documentEntities.map(de => ({
        EntityID: de.EntityID,
        DocID: de.DocID,
        EF: de.entity_count / totalEntitiesPerDoc[de.DocID]
    }));

    // Calculate Total Documents
    const totalDocs = new Set(documentEntities.map(de => de.DocID)).size;

    // Calculate Inverse Document Frequency (IDF)
    const inverseDocumentFrequency = documentEntities.reduce((acc, de) => {
        if (!acc[de.EntityID]) {
            acc[de.EntityID] = new Set();
        }
        acc[de.EntityID].add(de.DocID);
        return acc;
    }, {});

    // Calculate IDF values
    const idfValues = {};
    for (const [entityID, docIDs] of Object.entries(inverseDocumentFrequency)) {
        const docCount = docIDs.size;
        idfValues[entityID] = Math.log10(totalDocs / docCount);
    }

    // Calculate TF-IDF and update documentEntities
    documentEntities.forEach(de => {
        const ef = entityFrequency.find(ef => ef.EntityID === de.EntityID && ef.DocID === de.DocID).EF;
        const idf = idfValues[de.EntityID];
        de.EF_IDF = ef * idf;
        console.log(`EntityID: ${de.EntityID}, DocID: ${de.DocID}, EF: ${ef}, IDF: ${idf}, EF-IDF: ${de.EF_IDF}`);
    });

    return documentEntities;
};

module.exports = efidf;