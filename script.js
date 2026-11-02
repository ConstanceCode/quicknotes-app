// QuickNotes - Task 3: add and display notes

// ----- Select elements -----
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// ----- Constants and state -----
const CATEGORY_LABELS = { personal: "Personal", work: "Work", study: "Study" };

let notes = [];

// ----- Helpers -----
function formatDate(date) {
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

// Build one note card with createElement and textContent (never innerHTML)
function createNoteCard(note) {
  const card = document.createElement("li");
  card.className = `note-card category-${note.category}`;

  const text = document.createElement("p");
  text.className = "note-text";
  text.textContent = note.text;

  const meta = document.createElement("div");
  meta.className = "note-meta";

  const categoryLabel = document.createElement("span");
  categoryLabel.className = "note-category";
  categoryLabel.textContent = CATEGORY_LABELS[note.category];

  const date = document.createElement("span");
  date.className = "note-date";
  date.textContent = note.createdAt;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";

  meta.append(categoryLabel, date, deleteButton);
  card.append(text, meta);
  return card;
}

// Rebuild the whole list from the notes array
function render() {
  notesList.textContent = "";
  for (const note of notes) {
    notesList.appendChild(createNoteCard(note));
  }
}

// ----- Add a note -----
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  if (text === "") {
    return;
  }

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: formatDate(new Date()),
  });

  render();
  noteInput.value = "";
  noteInput.focus();
});

render();
