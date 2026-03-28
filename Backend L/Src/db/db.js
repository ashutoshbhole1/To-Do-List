const mongoose = require("mongoose");
// code which connects the db with the server
async function connectDB(){
    await mongoose.connect("mongodb+srv://ashu:ashu@shery-backend.zpyeq2x.mongodb.net/kanha");
    // uri is of cluster and cluster k andar database hote hai .net/ k aage jo hai vo database ka name hai
    // agar vo present hoga to vo usko connect kar dega or nhi to vo vaha create kar dega
    console.log("Connected to DB");
}

// we will not call the db here here as we will connect it from server file

// all the action will be at server file
// logic will be here

// CLUSTER > DATABASE > MODELS (particular things which we store)
module.exports = connectDB