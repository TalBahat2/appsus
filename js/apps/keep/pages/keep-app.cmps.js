import { noteService } from "../services/note-service.js";
import { eventBus } from "../../../services/event-bus-service.js"
import noteAdd from "../cmps/note-add.cmp.js";
import noteList from "../cmps/note-list.cmp.js";

export default {
    components: {
        noteAdd,
        noteList,
    },
    template: `
        <section class="keep-app">
            <note-add @addNote="addNote" />
            <note-list :notes="notes" />
        </section>
    `,
    data() {
        return {
            notes: null,
        }
    },
    created() {
        this.loadNotes();
        eventBus.$on('remove',this.removeNote)
        eventBus.$on('cancelEdit', this.cancelEdit)
        eventBus.$on('saveEdit', this.saveEdit)
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
            console.log(note);
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
        }
    }
}