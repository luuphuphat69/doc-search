const mongoose = require("mongoose");

const metadataSchema = new mongoose.Schema({
    metadata: {
        type: String,
        require: true,
    },
    docs:{
        type: Array,
        require: true,
    },
});
const Metadata = mongoose.model("Metadata", metadataSchema, "Metadata");
module.exports = Metadata;