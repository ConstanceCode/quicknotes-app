// QuickNotes - main script

// ----- Select elements -----
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");

// ----- Constants -----
const STORAGE_KEY = "quicknotes-notes";
const MAX_LENGTH = 200;
const CATEGORY_LABELS = { personal: "Personal", work: "Work", study: "Study" };

// ----- Storage (localStorage) -----
function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Could not save notes:", error);
  }
}

function isValidNote(note) {
  return (
    note !== null &&
    typeof note === "object" &&
    typeof note.id === "number" &&
    typeof note.text === "string" &&
    typeof note.createdAt === "string" &&
    Object.keys(CATEGORY_LABELS).includes(note.category)
  );
}

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return [];
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter(isValidNote) : [];
  } catch (error) {
    console.error("Could not load notes:", error);
    return [];
  }
}

// ----- State -----
let notes = loadNotes();

// ----- Helpers -----
function formatDate(date) {
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// Notes whose text contains every search word (not case-sensitive)
function getVisibleNotes() {
  const words = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return notes;
  }
  return notes.filter((note) => {
    const text = note.text.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
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
  deleteButton.setAttribute("aria-label", `Delete note: ${note.text}`);
  deleteButton.addEventListener("click", () => deleteNote(note.id));

  meta.append(categoryLabel, date, deleteButton);
  card.append(text, meta);
  return card;
}

// Rebuild the whole list from the notes array
function render() {
  const visibleNotes = getVisibleNotes();
  notesList.textContent = "";

  if (visibleNotes.length === 0 && searchInput.value.trim() !== "") {
    const message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  }

  for (const note of visibleNotes) {
    notesList.appendChild(createNoteCard(note));
  }

  updateCount();
}

// ----- Add a note (with validation) -----
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    showError("Please type a note first.");
    noteInput.focus();
    return;
  }

  if (text.length > MAX_LENGTH) {
    showError("Notes must be 200 characters or fewer.");
    noteInput.focus();
    return;
  }

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: formatDate(new Date()),
  });

  saveNotes();
  clearError();
  render();
  noteInput.value = "";
  noteInput.focus();
});

// ----- Search -----
searchInput.addEventListener("input", render);

// ----- Start -----
render();
