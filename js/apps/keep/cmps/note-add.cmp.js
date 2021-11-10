
export default {
    components: {
    },
    template: `
        <section class="note-add">
            <h3>adding note</h3>
            <form @submit.prevent="add">
                <input type="text" v-model="input">
                <span @click="noteType='note-txt'">Text/</span>
                <span @click="noteType='note-img'">Image/</span>
                <span @click="noteType='note-vid'">Video</span>
                <button>Add</button>
            </form>
        </section>
    `,
    data() {
        return {
            input: '',
            noteType: 'note-txt',
        }
    },
    methods: {
        add(){
            this.$emit('addNote',{input:this.input,noteType:this.noteType})
        }
    },
    watch: {
    },
}