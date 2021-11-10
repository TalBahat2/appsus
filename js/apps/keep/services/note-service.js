import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js'

const NOTES_KEY = 'notes'
const demoNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
]

export const noteService = {
    query,
    save,
}

function query() {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            if (notes.length === 0) {
                return demoNotes
            }
        })
}

function save(note) {
    return storageService.post(NOTES_KEY, note);
}