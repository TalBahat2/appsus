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
                { txt: 'finish this code!', isDone: false, isEdit: false },
                { txt: 'Go to the Bar-Mizva', isDone: true, isEdit: false },
                { txt: 'Leave the Bar-Mizva', isDone: false, isEdit: false }
            ]
        }
    },
    {
        id: "n106",
        type: "noteTxt",
        isPinned: true,
        info: {
            txt: "The dinosaurs looked at Chuck Norris the wrong way once. You know what happened to them."
        }
    },
    {
        id: "n107",
        type: "noteTxt",
        isPinned: true,
        info: {
            txt: "You define your own life. Don’t let other people write your script."
        }
    },
    {
        id: "n108",
        type: "noteImg",
        isPinned: false,
        info: {
            url: "https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg"
        }
    },
    {
        id: "n109",
        type: "noteTxt",
        isPinned: false,
        info: {
            txt: "Chuck Norris can kill two stones with one bird."
        }
    },
    {
        id: "n110",
        type: "noteTxt",
        isPinned: false,
        info: {
            txt: "You don’t always need a plan. Sometimes you just need to breathe, trust, let go and see what happens."
        }
    },
    {
        id: "n111",
        type: "noteImg",
        isPinned: false,
        info: {
            url: "https://media.giphy.com/media/wW95fEq09hOI8/giphy.gif"
        }
    },
    {
        id: "n112",
        type: "noteImg",
        isPinned: false,
        info: {
            url: "https://media.giphy.com/media/s3d5ugcxFDApG/giphy.gif"
        }
    },
    {
        id: "n113",
        type: "noteTodos",
        isPinned: false,
        info: {
            label: "Banana salad",
            todos: [
                { txt: 'Cucambers', isDone: false, isEdit: false },
                { txt: 'lattes', isDone: true, isEdit: false },
                { txt: 'pizza', isDone: false, isEdit: false },
                { txt: 'pizza', isDone: false, isEdit: false },
                { txt: 'pizza', isDone: false, isEdit: false },
                { txt: 'pizza', isDone: false, isEdit: false },
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
    updateNote,
    duplicate
}

function _createDemoNotes() {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            if (notes.length === 0) utilService.saveToStorage(NOTES_KEY, demoNotes)
        })
}

function query() {
    return storageService.query(NOTES_KEY)
}

function saveNewNote(note) {
    return storageService.postFirst(NOTES_KEY, note)
}

function saveEditedNote(note) {
    return storageService.put(NOTES_KEY, note)
}

function createNote(note) {
    let info = {
        txt: '',
        url: '',
        lable: '',
    };
    if (note.noteType === 'noteTxt') info = { txt: note.input }
    else if (note.noteType === 'noteImg' || note.noteType === 'noteVid') info = { url: note.input }
    else if (note.noteType === 'noteTodos') {
        info = {
            label: note.input,
            todos: [
                { txt: 'Do this 1', isDone: false, isEdit: false },
                { txt: 'Do this 2', isDone: false, isEdit: false },
                { txt: 'Do this 3', isDone: false, isEdit: false },
                { txt: 'Do this 4', isDone: false, isEdit: false },
            ]
        }
    }
    const newNote = {
        type: note.noteType,
        info: info,
        isPinned: false
    }
    console.log('newNote', newNote);
    return saveNewNote(newNote);
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function updateNote(note) {
    return storageService.put(NOTES_KEY, note)
}

function duplicate(note) {
    return storageService.duplicateOnIndex(NOTES_KEY, note)
}