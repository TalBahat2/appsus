import { noteService } from "../services/note-service.js";
import { eventBus } from "../../../services/event-bus-service.js";
import noteAdd from "../cmps/note-add.cmp.js";
import noteList from "../cmps/note-list.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";

export default {
    components: {
        noteAdd,
        noteList,
        noteFilter,
    },
    template: `
        <section class="keep-app">
            <div class="filter-add flex">
                <note-filter @filtered="setFilter" />
                <note-add @addNote="addNote" />
            </div>
            <note-list :notes="notesToShow" />
        </section>
    `,
    data() {
        return {
            notes: null,
            filterBy: null
        }
    },
    created() {
        this.loadNotes();
        eventBus.$on('remove', this.removeNote)
        eventBus.$on('cancelEdit', this.cancelEdit)
        eventBus.$on('saveEdit', this.saveEdit)
        eventBus.$on('changeColor', this.changeColor)
        eventBus.$on('togglePin', this.togglePin)
        eventBus.$on('duplicate', this.duplicate)
    },
    destroyed() {
        eventBus.$off('remove', this.removeNote)
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes
                });
        },
        addNote(note) {
            noteService.createNote(note)
                .then(() => this.loadNotes())
        },
        removeNote(noteId) {
            noteService.remove(noteId)
                .then(() => this.loadNotes())
        },
        cancelEdit() {
            this.loadNotes()

        },
        saveEdit(note) {
            noteService.saveEditedNote(note)
                .then(() => this.loadNotes())
        },
        changeColor(note, color) {
            note.color = color;
            console.log(note);
            noteService.updateNote(note)
                .then(() => this.loadNotes())
        },
        setFilter(filterBy) {
            let isTxtValue = false;
            for (const prop in filterBy) {
                if (filterBy[prop]) isTxtValue = true;
            }
            if (isTxtValue) this.filterBy = filterBy;
            else this.filterBy = null
        },
        togglePin(note) {
            note.isPinned = !note.isPinned;
            noteService.updateNote(note);
        },
        duplicate(note) {
            noteService.duplicate(note)
                .then(() => this.loadNotes())
        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            let notesToShow;
            const searchStr = this.filterBy.txt;
            const type = this.filterBy.type;
            notesToShow = this.notes.filter(note => {
                return note.type === type
            })
            if (type === 'noteTxt' || type === '')
                notesToShow = this.notes.filter(note => {
                    if (note.type === 'noteTxt') return note.info.txt.toLowerCase().includes(searchStr)
                })
            return notesToShow
        }
    }
}