
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
const mainDir = path.join(__dirname, "./public");
const fs = require("fs");
const app = express();

const app = express();
const PORT = 3001;

// intercept our POST request before it gets to the callback function
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));


// instructions for testing POST requests: https://courses.bootcampspot.com/courses/715/pages/11-dot-2-4-test-routes-in-insomnia-core?module_item_id=227116

// GET Routes
// =============================================================

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirName, "./public/notes.html"));
});
// double check this..

app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  res.json(savedNotes[Number(req.params.id)]);
});

// Wildcard must be the final GET
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
// End GET ROUTES
// ================================================================

// app.post
app.post('/api/notes', (req, res) => {
  const newNote = req.body;

   console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

app.post('/api/notes', function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync('./db/db.json'));
  let uniqueID = (savedNotes.length).toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

// functions to write and append data
// function fs.writeFile
fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
res.json(savedNotes);

// Append data
app.delete("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  let noteID = req.params.id;
  let newID = 0;
  savedNotes = savedNotes.filter(currNote => {
      return currNote.id != noteID;
  })

// Listener
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});

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
