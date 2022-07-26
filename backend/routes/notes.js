const express = require('express');
const { body, validationResult } = require("express-validator");

const { model } = require('mongoose');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
//route 1: get all notes using get " /api/notes/fetchallnotes login req"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
})

//route 2: add new notes " /api/notes/addnotes login req"
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 char').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNotes = await note.save()
        res.json(savedNotes)
    }
catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
}
})

//route 3: update existing notes " /api/notes/updatenote login req"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
//create new note object
        const newNote ={};
        if(title){newNote.title =title};
        if(description){newNote.description=description};
        if(tag){newNote.tag =tag};

        //FInd the ote to be updated and update it
        let note =await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Note Found")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }
       
        note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note})

})
//route 4: delete an existing note using DELETE "api/notes/deletenote" login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

        //FInd the ote to be delete and delete it
        let note =await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Note Found")}
        //allow deletion only if user owns this not
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }
       
        note =await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted"})

})
module.exports = router