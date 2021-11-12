import notePreview from "./note-preview.cmp.js"

export default {
    components:{
        notePreview,
    },
    props: ['notes'],
    template: `
        <section class="note-list">
            <div v-for="note in notes" :key="note.id" class="note-preview-container">
                <note-preview :note="note" />
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