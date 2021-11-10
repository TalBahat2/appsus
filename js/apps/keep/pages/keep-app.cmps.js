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
            <note-add />
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
                .then(notes => this.notes = notes);
        },
    }
}