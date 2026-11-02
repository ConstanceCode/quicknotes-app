# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can jot down a note, give it a category (Personal, Work or Study), search through your notes and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after you refresh the page.

## Features

- Add notes with a category (Personal, Work or Study)
- Each note card shows the text, a category label, the date and time, and a Delete button
- Colour-coded cards for each category
- Validation: empty notes and notes over 200 characters show an error message
- Delete any single note
- Live note count ("You have no notes yet.", "You have 1 note.", "You have N notes.")
- Search that filters notes as you type (not case-sensitive), with a "No notes match your search." message
- Notes saved to `localStorage`, so they survive a page refresh
- "Clear all" button that asks for confirmation first
- Responsive layout: the form stacks vertically on screens 600px wide or narrower

## How to run locally

1. Download or clone the project:
   ```bash
   git clone https://github.com/YOUR-USERNAME/quicknotes-app.git
   cd quicknotes-app
   ```
2. Open `index.html` in your browser (double-click it). There is nothing to install.
3. Optional: serve it with a local server instead:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: header, form, search, notes list, footer |
| `style.css` | Layout, note cards, category colours and the small-screen media query |
| `script.js` | Adding, deleting, searching, validation, count and `localStorage` |
| `README.md` | This file |

## What I learned

- Building page content with `createElement` and `textContent` instead of `innerHTML` keeps user text safe, because it is shown as plain text and never run as HTML.
- `localStorage` only stores strings, so I use `JSON.stringify` to save the notes array and `JSON.parse` to load it again (inside `try/catch` in case the saved data is damaged).
- Keeping one `notes` array as the source of truth and rebuilding the list with a `render()` function makes add, delete and search much simpler, because every change just updates the array and calls `render()`.
- Flexbox lays out the form in a row, and an `@media (max-width: 600px)` rule switches it to a column on small screens.
- Making small commits after each task makes the project history easy to follow and easy to fix if something breaks.
