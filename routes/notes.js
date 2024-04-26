const notes = require('express').Router();
const uuid = require('../helper/uuid');
const {readFromFile, readAndAppend, writeToFile} = require('../helper/fsUtil')

// GETS all notes
notes.get('/', (req, res) =>{
  console.info(`${req.method} received previous notes!`); // Log the request method and custom message
   // Read from the notes file and parse the JSON data then send it as a response
   readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});
//Adds new note to db 
notes.post('/', (req, res) =>{
  console.info(`${req.method} received request to add new note`);

  const {title, text} = req.body
  // Check if the required fields are present
  if(req.body && req.body.title && req.body.text){
      const newNote = {
          title,
          text,
          id: uuid(), // Assign a unique ID to the new note
      };
      // Append the new note to the file and respond with a success message
      readAndAppend(newNote, './db/notes.json');
      res.json('another note added :)');
  }else{
      res.error('ERROR!!!');
  }
});
// remove a specific note by ID
notes.delete('/:id', (req, res) =>{
  const noteID = req.params.id; // Extract the ID from the request parameters

// Read from the notes file, parse it, filter out the note with the given ID, and write the results back
  readFromFile('./db/notes.json')
  .then((data) => JSON.parse(data))
  .then((json) => {
      const remove = json.filter( note => note.id !== noteID); 

      writeToFile('./db/notes.json', remove )

      res.json(`DELETED`)
  })
})


module.exports = notes;