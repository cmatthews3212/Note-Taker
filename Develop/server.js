const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);
app.use(express.static('public'))

// GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})
// GET Wildcard route
// app.get('*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, '/public/pages/404.html'));
//     console.log('this is a 404 error');
//   });

  
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );