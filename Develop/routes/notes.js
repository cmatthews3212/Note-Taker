const notes = require('express').Router();
const fs = require('fs');
const path = require('path');

notes.get('/', (req, res) => {
    fs.readFile(path.join('../develop/db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            res.json(JSON.parse(data))
        }
    })
    
})

// notes.get('/notes', (req, res) => {
//     fs.readFile('./db/db.json', req.body, (err) => {
//       console.error(err);
//     })
//     console.log(req.body);
// });

module.exports = notes;