const mongoose = require("mongoose");

const deSchema = new mongoose.Schema({
    EntityID: {
        type: Number,
        require: true,
    },
    DocID: {
        type: Number,
        require: true,
    },
    entity_count:{
        type:Number,
        require: true,
    },
    ef_idf:{
        type: mongoose.Types.Decimal128,
        require:true,
    }
});
const DE = mongoose.model("DE", deSchema, "DE");
module.exports = DE;