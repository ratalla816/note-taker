
// //    _____
// //   |A .  |
// //   | / \ |
// //   |( . )|
// //   |  T  |
// //   ---"--- 
// //
// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3001;
const mainDir = path.join(__dirname, "/public")

// intercept our POST request before it gets to the callback function
// parse incoming string or array data
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());


// instructions for testing POST requests: https://courses.bootcampspot.com/courses/715/pages/11-dot-2-4-test-routes-in-insomnia-core?module_item_id=227116

// GET Routes
// =============================================================

app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
});


app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    res.json(savedNotes[Number(req.params.id)]);
});

// Wildcard must be the final GET
app.get("*", function(req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
});
// End GET ROUTES
// ================================================================

// app.post
app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);
    
 // functions to write and append data
 // function fs.writeFile
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})
// Append data
app.delete("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })
    
    // the numeric id values for each note are passed into a string 
  // _thisNote not currNote //
    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

// Listener
// =============================================================
app.listen(port, function() {
    console.log(`Now listening to port ${port}.`);
})


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