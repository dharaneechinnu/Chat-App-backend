const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        members:Array,
    },
    {
     timestamps:true,
    }
);

const chatmodel = mongoose.model("Chat",chatSchema);

module.exports = chatmodel;