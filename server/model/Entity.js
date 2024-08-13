const mongoose = require("mongoose");

const entitySchema = new mongoose.Schema({
    EntityID: {
        type: Number,
        require: true,
    },
    MentionName:{
        type: String,
        require: true,
    },
    EntityName:{
        type:String,
        require: false,
    },
    WikiName:{
        type:String,
        require:false,
    },
    length:{
        type: Number,
        require:false,
    }
});
const Entity = mongoose.model("Entity", entitySchema, "Entity");
module.exports = Entity;