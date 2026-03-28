const mongoose = require("mongoose");
// data kesa dikhne vala hai vo hame yaha batana padta hai


const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
})


const noteModel = mongoose.model("note",noteSchema)

module.exports = noteModel


