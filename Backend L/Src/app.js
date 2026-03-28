const express = require("express");
const noteModel = require("./models/note.model")
// server create kiya hai
// Sari API S ham yahi banate hai app.js me

const app = express(); //instance
app.use(express.json());  //middleware (data lane k liye jaruri)

// Api's which we want to create
// POST ---- crete note
// GET ---  get all note
// PATCH  /notes/:id  -- updating a note
// DELETE /notes/:id --- deelting a note

app.post("/notes", async (req, res) => {
    const data = req.body; // title and desc

    await noteModel.create({
        title: data.title,
        description: data.description,
    });

    res.status(201).json({
        messgae: "Note created successfully",
    })

})

app.get("/notes", async (req, res) => {

    const notes = await noteModel.find(); //[] ye array form me sare output return karta hai
    // const notes = await noteModel.findOne({  // ye sirf ek hi find karega
    //     title: "Kanha_xtitle" // jo note ka title ye hoga
    // })

    /*

    find => [] or [{},{}]
    findOne => {}  or null
    
     */

    // if (!notes) { // if the note not found tyhis code run
    //   return res.status(404).json({
    //       message: "Note not found!!!"
    //   });
    //   }

    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    })

})

// Delete API

app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;

    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        message: "Note deleted successfully"
    })
})












app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({_id: id,},{ description:description  })  // 1st :  kiske basis par find &&  2nd : kis chij ko update karna hai

    res.status(200).json({
        message: "Note updated successfully"
    })
})


module.exports = app