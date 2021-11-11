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
        type: "noteImg",
        isPinned: false,
        info: {
            url: "https://media.giphy.com/media/26u4lwog9FVOxUGiI/giphy.gif"
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
        type: "noteVid",
        isPinned: false,
        info: {
            url: "https://www.youtube.com/watch?v=0uHCMt3wm04"
        }
    },
    {
        id: "n105",
        type: "noteTodos",
        isPinned: false,
        info: {
            label: "do this and do that",
            todos: [
                {txt: 'finish this code!', isDone: false},
                {txt: 'Go to the Bar-Mizva', isDone: true}
            ]
        }
    },
]
_createDemoNotes()

export const noteService = {
    query,
    saveNewNote,
    saveEditedNote,
    createNote,
    remove,
}

function _createDemoNotes(){ 
    return storageService.query(NOTES_KEY)
        .then(notes=>{
            if(notes.length === 0) utilService.saveToStorage(NOTES_KEY,demoNotes)
        })
}

function query() {
    return storageService.query(NOTES_KEY)
        // .then(notes => {
            // if (notes.length === 0) {
            //     _createDemoNotes()
            //     return demoNotes
            // }
            // return notes;
        // })
}

function saveNewNote(note) {
    return storageService.postFirst(NOTES_KEY, note)
}

function saveEditedNote(note){
    storageService.put(NOTES_KEY,note)
}

function createNote(note) {
    let info;
    if (note.noteType === 'noteTxt') info = { txt: note.input }
    else if (note.noteType === 'noteImg' || note.noteType === 'noteVid') info = { url: note.input }
    else if (note.noteType === 'noteTodos') info = { lable: note.input }
    const newNote = {
        type: note.noteType,
        info: info,
    }
    return saveNewNote(newNote);
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}