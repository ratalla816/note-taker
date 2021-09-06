
// //    _____
// //   |A .  |
// //   | / \ |
// //   |( . )|
// //   |  T  |
// //   ---"--- 
// //
// Dependencies
// =============================================================
const express = require('express');
const path = require('path');
const fs = require('fs');
const dirs = path.join(__dirname, '/public')
const port = process.env.PORT || 3001;
const app = express();
// const port = 3001;


// intercept our POST request before it gets to the callback function
// parse incoming string or array data
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());



// instructions for testing POST requests: https://courses.bootcampspot.com/courses/715/pages/11-dot-2-4-test-routes-in-insomnia-core?module_item_id=227116

// GET Routes
// =============================================================

app.get('/api/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.get('/api/notes/:id', function (req, res) {
  let noteSave = JSON.parse(fs.readFileSync('./db/db.json'));
  res.json(noteSave[Number(req.params.id)]);
});

app.get('/notes', function (req, res) {
  res.sendFile(path.join(dirs, 'notes.html'));
});

// app.get "wildcard" GOES LAST 
app.get('*', function (req, res) {
  res.sendFile(path.join(dirs, 'index.html'));
});
// End GET ROUTES
// ================================================================

// app.post
app.post('/api/notes', function (req, res) {
  let noteSave = JSON.parse(fs.readFileSync('./db/db.json'));
  let newNote = req.body;
  // assigns a specific numeric ID to each saved note - idAssn value is incremented starting with zero.
  let idAssn = (noteSave.length).toString();
  newNote.id = idAssn;
  noteSave.push(newNote);

  // functions to write and append data
  // function fs.writeFile
  fs.writeFileSync('./db/db.json', JSON.stringify(noteSave));
  // cmd line "saved" confirmation msg
  console.log(`Note ID ${newNote.id} saved to database`);
  res.json(noteSave);
})
// Append data
app.delete('/api/notes/:id', function (req, res) {
  let noteSave = JSON.parse(fs.readFileSync('./db/db.json'));
  let updateId = 1;
  let noteID = req.params.id;

  // cmd line "delete" confirmation msg
  console.log(`Note ID ${noteID} deleted`);
  noteSave = noteSave.filter(thisNote => {
    // thisNote.id must return at least 1 value   
    return thisNote.id != noteID;
  })

  // the numeric id values for each note are incremented then passed into a string 
  for (thisNote of noteSave) {
    thisNote.id = updateId.toString();
    updateId++;
  }
  // thisNote.id reassigns the idAssn's incrementally starting with "1" (newNote),
  // but excludes the note selected for deletion, which gets reassigned to ID "0". 
  // Now only ID values 1 and higher are allowed in the array and zeroes get kicked out.
  
  fs.writeFileSync('./db/db.json', JSON.stringify(noteSave));
  res.json(noteSave);
})

// Listener
// =============================================================
app.listen(port, function () {
  console.log(`listening on port ${port}`);
})
  
//* ================================================================================== *//


// app.get('/api/notes/:notes', (req, res) => {
//   const chosen = req.params.note;

//   console.log(chosen);

//   for (let i = 0; i < notes.length; i++) {
//     if (chosen === notes[i].routeName) {
//       return res.json(notes[i]);
//     }
//   }

//   return res.json(false);
// });