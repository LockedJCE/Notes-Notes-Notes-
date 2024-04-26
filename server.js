const express = require('express');
const path = require('path');
const api = require('./routes/index')

const app = express();
// Set the port for the server to run on, using the environment's port or 3001 as default
const PORT = process.env.PORT || 3001;

//middleware to parse JSON data, encoded URL 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () => {
    console.log(`You have been connected to http://localhost:${PORT}`);
  });