import { noteService } from "../services/note-service.js";
import { eventBus } from "../../../services/event-bus-service.js"
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
            <note-filter @filtered="setFilter" />
            <note-add @addNote="addNote" />
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
        eventBus.$on('remove',this.removeNote)
        eventBus.$on('cancelEdit', this.cancelEdit)
        eventBus.$on('saveEdit', this.saveEdit)
        eventBus.$on('changeColor', this.changeColor)
    },
    destroyed(){
        eventBus.$off('remove',this.removeNote)
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes});
        },
        addNote(note){
            noteService.createNote(note)
                .then(()=> this.loadNotes())
        },
        removeNote(noteId){
            noteService.remove(noteId)
                .then(()=>this.loadNotes())
        },
        cancelEdit(){
            this.loadNotes()
        },
        saveEdit(note){
            noteService.saveEditedNote(note)
        },
        changeColor(note,color){
            note.color = color;
            noteService.changeColor(note)
                .then(()=>this.loadNotes())
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        notesToShow(){
            if (!this.filterBy) return this.notes;
            const searchStr = this.filterBy.txt;

            const notesToShow = this.notes.filter(note=> {
                console.log('note.info.txt',note.info.txt);
                return note.info.txt.includes(searchStr)
            })
            return notesToShow
        }
    }
}