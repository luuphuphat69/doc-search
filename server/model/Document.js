const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    DocID: {
        type: Number,
        require: true,
    },
    Title:{
        type: String,
        require: true,
    },
    Path:{
        type:String,
        require: false,
    }
});
const Document = mongoose.model("Document", documentSchema, "Document");
module.exports = Document;