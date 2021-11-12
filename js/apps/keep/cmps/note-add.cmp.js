
export default {
    components: {
    },
    template: `
        <section class="note-add">
            <form @submit.prevent="add">
                <input type="text" :placeholder="placeHolder" v-model="input">
                <span @click="changeNoteType('noteTxt')">Text/</span>
                <span @click="changeNoteType('noteImg')">Image/</span>
                <span @click="changeNoteType('noteVid')">Video</span>
                <button>Add</button>
            </form>
        </section>
    `,
    data() {
        return {
            input: '',
            noteType: 'noteTxt',
            placeHolder: 'whats on your mind?'
        }
    },
    methods: {
        add(){
            this.$emit('addNote',{input:this.input,noteType:this.noteType})
            this.input = ''
        },
        changeNoteType(type){
            if(type === 'noteTxt'){
                this.placeHolder = 'whats on your mind?'
                this.noteType = 'noteImg'
            }else if(type === 'noteImg' || type === 'noteVid'){ 
                this.placeHolder = 'Type a URL address'
                this.noteType = 'noteImg'
            }
        }
    },
    watch: {
    },
}