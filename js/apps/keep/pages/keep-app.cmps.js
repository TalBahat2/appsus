import { noteService } from "../services/note-service.js";
import noteAdd from "../cmps/note-add.cmp.js";
import noteList from "../cmps/note-list.cmp.js";

export default {
    components: {
        noteAdd,
        noteList,
    },
    template: `
        <section class="keep-app">
            <h3>keep-app</h3>
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
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => {
                    console.log('notes from query', notes);
                    this.notes = notes});
        },
        addNote(note){
            noteService.createNote(note)
                .then(()=> this.loadNotes())
        }
    }
}