const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js');

notes.get('/', (req, res) => {
    fs.readFile(path.join('./db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            res.json(JSON.parse(data))
        }
    })
    
})

notes.post('/', (req, res) => {
    console.info(`${req.method} request received about note submission`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        }

        readAndAppend(newNote, './db/db.json');
        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);

    } else {
        res.json('Error in posting note')
    }
});

// notes.delete('/note_id', (req, res) => {
//     fs.readFile(path.join('../develop/db/db.json'), 'utf8', (err, data) => {
//         if (err) {
//             console.error(err)
//         } else {
//             res.json(JSON.parse(data))
//         }
//     })

    // const noteId = res.json(JSON.parse(res.body));
    // console.log(noteId)

    // const index = notes.findIndex(note => note.id === noteId);

    // if (index !== -1) {
    //     notes.splice(index, 1)
    //     res.status(200).json({message: 'Note deleted successfully'})
    // } else {
    //     res.status(404).json({message: 'User not found'});
    // }
// })

module.exports = notes;