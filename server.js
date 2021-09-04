
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
const fs = require("fs");
const app = express();
const PORT = 3001;

const app = express();
const PORT = 3001;

// intercept our POST request before it gets to the callback function
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

// instructions for testing POST requests: https://courses.bootcampspot.com/courses/715/pages/11-dot-2-4-test-routes-in-insomnia-core?module_item_id=227116

// Routes
// =============================================================

app.get("/notes", function(req, res) {
  res.sendFile(path.join(mainDir, "notes.html"));
});



// Create an `/add` route that returns `add.html`
//
// YOUR CODE HERE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
  return res.json(__dirname, './public/notes.html');
});





app.get("*", function(req, res) {
  res.sendFile(path.join(mainDir, "index.html"));
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  // BONUS: Use a RegEx Pattern to remove spaces from newCharacter
  // Your code here

  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

// functions to write and append data
// function fs.writeFile
// fs.appendFile
fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
res.json(savedNotes);



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