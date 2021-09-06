// STARTER CODE //
// let noteTitle;
// let noteText;
// let saveNoteBtn;
// let newNoteBtn;
// let noteList;
// these are all the div classes in notes.html where our data will be written

var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// tracks notes that are in-progress, unsaved. 
var activeNote = {};

// UNNECESSARY
// Show an element
// const show = (elem) => {
//   elem.style.display = 'inline';
// };

// Hide an element
// const hide = (elem) => {
//   elem.style.display = 'none';
// };

// *THESE FETCH REQUESTS SHOULD BE VAR FUNCTIONS INSTEAD OF CONST.
// THEY ARE OCCURING ASYNCHRONOUSLY SO THESE SHOULD ALL BE $.AJAX-GET REQUESTS..*

// const getNotes = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// Fetch notes from the db
var getNotes = function () {
  return $.ajax({
    url: '/api/notes',
    method: 'GET'
  });
};

// const saveNote = (note) =>
//   fetch('/api/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(note),
//   });

// saves the note to the db
var saveNote = function (note) {
  return $.ajax({
    url: '/api/notes',
    data: note,
    method: 'POST'
  });
};

// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// deletes notes from the db 
var deleteNote = function (id) {
  return $.ajax({
    url: 'api/notes/' + id,
    method: 'DELETE'
  });
};

// Displays in-progress note if applicable, or the form-control text
var renderActiveNote = function () {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr('readonly', true);
    $noteText.attr('readonly', true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr('readonly', false);
    $noteText.attr('readonly', false);
    $noteTitle.val('');
    $noteText.val('');
  }
};

// Save user input to the db and update the display
var handleNoteSave = function () {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then(function (data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// deleteNote function
var handleNoteDelete = function (event) {
  // Ensures that when delBtn is clicked only the selected note is deleted
  // without deleting all the saved notes (changed to variable function)
  event.stopPropagation();

  var note = $(this)
    .parent('.list-group-item')
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function () {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// prepare and display the activeNote
var handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

// activeNote object data is emptied and ready for new user input
var handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

// Only display the save btn if the user has begun typing into the fields
var handleRenderSaveBtn = function () {
  // removes whitespace from both ends of $noteTitle.val and $noteText.val strings as long as they contain at least 1 value
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render list of note titles
// same thing as before, switch the const to var
var renderNoteList = function (notes) {
  $noteList.empty();

  var noteListItems = [];
  // iterate through the array to update the notes' condition (delete, edit)
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    //     if (delBtn) {
    //     const delBtnEl = document.createElement('i');
    //     delBtnEl.classList.add(
    //     'fas',
    //     'fa-trash-alt',
    //     'float-right',
    //     'text-danger',
    //     'delete-note'

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $('<span>').text(note.title);
    var $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// GET saved notes from db and render them on the sidebar
var getAndRenderNotes = function () {
  return getNotes().then(function (data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on('click', handleNoteSave);
$noteList.on('click', '.list-group-item', handleNoteView);
$newNoteBtn.on('click', handleNewNoteView);
$noteList.on('click', '.delete-note', handleNoteDelete);
$noteTitle.on('keyup', handleRenderSaveBtn);
$noteText.on('keyup', handleRenderSaveBtn);

// Pulls saved notes from db.json and renders them on the page
getAndRenderNotes();
//\ THE END /\\

// =============================================================================================================
//  STARTER CODE BELOW v v v v         

// let noteTitle;
// let noteText;
// let saveNoteBtn;
// let newNoteBtn;
// let noteList;

// if (window.location.pathname === '/notes') {
//   noteTitle = document.querySelector('.note-title');
//   noteText = document.querySelector('.note-textarea');
//   saveNoteBtn = document.querySelector('.save-note');
//   newNoteBtn = document.querySelector('.new-note');
//   noteList = document.querySelectorAll('.list-container .list-group');
// }

// Show an element
// const show = (elem) => {
//   elem.style.display = 'inline';
// };

// Hide an element
// const hide = (elem) => {
//   elem.style.display = 'none';
// };

// activeNote is used to keep track of the note in the textarea
// let activeNote = {};

// const getNotes = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// const saveNote = (note) =>
//   fetch('/api/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(note),
//   });

// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// const renderactiveNote = () => {
//   hide(saveNoteBtn);

//   if (activeNote.id) {
//     noteTitle.setAttribute('readonly', true);
//     noteText.setAttribute('readonly', true);
//     noteTitle.value = activeNote.title;
//     noteText.value = activeNote.text;
//   } else {
//     noteTitle.removeAttribute('readonly');
//     noteText.removeAttribute('readonly');
//     noteTitle.value = '';
//     noteText.value = '';
//   }
// };
// *** //
// const handleNoteSave = () => {
//   const newNote = {
//     title: noteTitle.value,
//     text: noteText.value,
//   };
//   saveNote(newNote).then(() => {
//     getAndRenderNotes();
//     renderactiveNote();
//   });
// };
// *** //

// Delete the clicked note
// const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  // e.stopPropagation();

//   const note = e.target;
//   const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

//   if (activeNote.id === noteId) {
//     activeNote = {};
//   }

//   deleteNote(noteId).then(() => {
//     getAndRenderNotes();
//     renderactiveNote();
//   });
// };
// *** //

// Sets the activeNote and displays it
// const handleNoteView = (e) => {
//   e.preventDefault();
//   activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
//   renderactiveNote();
// };
// *** //

// Sets the activeNote to and empty object and allows the user to enter a new note
// const handleNewNoteView = (e) => {
//   activeNote = {};
//   renderactiveNote();
// };
// *** //

// const handleRenderSaveBtn = () => {
//   if (!noteTitle.value.trim() || !noteText.value.trim()) {
//     hide(saveNoteBtn);
//   } else {
//     show(saveNoteBtn);
//   }
// };
// *** //

// Render the list of note titles
// const renderNoteList = async (notes) => {
//   let jsonNotes = await notes.json();
//   if (window.location.pathname === '/notes') {
//     noteList.forEach((el) => (el.innerHTML = ''));
//   }

//   let noteListItems = [];

  // Returns HTML element with or without a delete button
//   const createLi = (text, delBtn = true) => {
//     const liEl = document.createElement('li');
//     liEl.classList.add('list-group-item');

//     const spanEl = document.createElement('span');
//     spanEl.classList.add('list-item-title');
//     spanEl.innerText = text;
//     spanEl.addEventListener('click', handleNoteView);

//     liEl.append(spanEl);

//     if (delBtn) {
//       const delBtnEl = document.createElement('i');
//       delBtnEl.classList.add(
//         'fas',
//         'fa-trash-alt',
//         'float-right',
//         'text-danger',
//         'delete-note'
//       );
//       delBtnEl.addEventListener('click', handleNoteDelete);

//       liEl.append(delBtnEl);
//     }

//     return liEl;
//   };

//   if (jsonNotes.length === 0) {
//     noteListItems.push(createLi('No saved Notes', false));
//   }

//   jsonNotes.forEach((note) => {
//     const li = createLi(note.title);
//     li.dataset.note = JSON.stringify(note);

//     noteListItems.push(li);
//   });

//   if (window.location.pathname === '/notes') {
//     noteListItems.forEach((note) => noteList[0].append(note));
//   }
// };
// *** //

// Gets notes from the db and renders them to the sidebar
// const getAndRenderNotes = () => getNotes().then(renderNoteList);

// if (window.location.pathname === '/notes') {
//   saveNoteBtn.addEventListener('click', handleNoteSave);
//   newNoteBtn.addEventListener('click', handleNewNoteView);
//   noteTitle.addEventListener('keyup', handleRenderSaveBtn);
//   noteText.addEventListener('keyup', handleRenderSaveBtn);
// }

// getAndRenderNotes();