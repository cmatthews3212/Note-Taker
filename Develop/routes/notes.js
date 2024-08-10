const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js');

notes.get('/', (req, res) => {
    fs.readFile(path.join('../develop/db/db.json'), 'utf8', (err, data) => {
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

        readAndAppend(newNote, '../develop/db/db.json');
        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);

    } else {
        res.json('Error in posting note')
    }
})

module.exports = notes;