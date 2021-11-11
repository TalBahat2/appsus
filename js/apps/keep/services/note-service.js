import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js'

const NOTES_KEY = 'notes'
const demoNotes = [
    {
        id: "n101",
        type: "noteTxt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby 1!"
        }
    },
    {
        id: "n102",
        type: "noteTxt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby 2!"
        }
    },
    {
        id: "n103",
        type: "noteImg",
        isPinned: false,
        info: {
            url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-tulips-blooming-in-field-royalty-free-image-1584131603.jpg"
        }
    },
    {
        id: "n104",
        type: "noteTxt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby 4!"
        }
    },
]

export const noteService = {
    query,
    save,
    createNote,
    remove,
}

function _demoData(){
    demoNotes.forEach(note=>{
        save(note);
    })
}

function query() {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            if (notes.length === 0) {
                _demoData()
                return demoNotes
            }
            return notes;
        })
}

function save(note) {
    return storageService.postFirst(NOTES_KEY, note)
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

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}