import notePreview from "./note-preview.cmp.js"

export default {
    components:{
        notePreview,
    },
    props: ['notes'],
    template: `
        <section class="note-list">
            <div>
                Pinned notes:
            </div>
            <div class="note-list-container">
                <note-preview :note="note" v-for="note in notes" v-if="note.isPinned" :key="note.id" class="note-preview-container" />
            </div>
            <hr>
            <div class="note-list-container">
                <note-preview :note="note" v-for="note in notes" v-if="!note.isPinned" :key="note.id" class="note-preview-container" />
            </div>
        </section>
    `,
    data(){
        return{

        }
    },
    methods: {
        
    }
}