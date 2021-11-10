import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js'

const NOTES_KEY = 'notes'
const demoNotes = [
    {
        id: "n101",
        type: "noteTxt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "noteTxt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
]

export const noteService = {
    query,
    save,
    createNote,
}

function query() {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            console.log(notes);
            if (notes.length === 0) {
                return demoNotes
            }
            return notes;
        })
}

function save(note) {
    return storageService.post(NOTES_KEY, note)
}

function createNote(note) {
    // const id = utilService.makeId();
    let info;
    if (note.noteType === 'note-txt') info = { txt: note.input }
    else if (note.noteType === 'note-img' || note.noteType === 'note-vid') info = { url: note.input }
    else if (note.noteType === 'note-todos') info = { lable: note.input }
    const newNote = {
        type: note.noteType,
        info: info,
    }
    return save(newNote);
}
