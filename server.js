
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

// functions to write and append data
// function fs.writeFile
// fs.appendFile

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Data
// =============================================================
// const characters = [
//   {
//     routeName: 'yoda',
//     name: 'Yoda',
//     role: 'Jedi Master',
//     age: 900,
//     forcePoints: 2000
//   },
//   {
//     routeName: 'darthmaul',
//     name: 'Darth Maul',
//     role: 'Sith Lord',
//     age: 200,
//     forcePoints: 1200
//   },
//   {
//     routeName: 'obiwankenobi',
//     name: 'Obi Wan Kenobi',
//     role: 'Jedi Master',
//     age: 55,
//     forcePoints: 1350
//   }
// ];

// Routes
// =============================================================

// Create an `/add` route that returns `add.html`
//
// YOUR CODE HERE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
  return res.json(__dirname, './public/notes.html');
});



app.get('/api/notes/:notes', (req, res) => {
  const chosen = req.params.note;

  console.log(chosen);

  for (let i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  // BONUS: Use a RegEx Pattern to remove spaces from newCharacter
  // Your code here

  console.log(newNote);

  notes.push(newNote);

  res.json(newNote);
});

// Listener
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
