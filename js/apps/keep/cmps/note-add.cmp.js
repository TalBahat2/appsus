
export default {
    components: {
    },
    template: `
        <section class="note-add">
            <form @submit.prevent="add" class="add-form flex justify-center align-baseline">
                <input type="text" class="filter-input" :placeholder="placeHolder" v-model="input">
                <div class="input-type">
                    <i class="fas fa-font" @click="changeNoteType('noteTxt')"></i>
                    <i class="fas fa-image" @click="changeNoteType('noteImg')"></i>
                    <i class="fab fa-youtube" @click="changeNoteType('noteVid')"></i>
                    <i class="fas fa-list" @click="changeNoteType('noteTodos')"></i>
                </div>
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
        add() {
            console.log(this.noteType);
            this.$emit('addNote', { input: this.input, noteType: this.noteType })
            this.input = ''
        },
        changeNoteType(type) {
            if (type === 'noteTxt') {
                this.placeHolder = 'What\'s on your mind?'
                this.noteType = 'noteTxt'
            } else if (type === 'noteImg' || type === 'noteVid') {
                this.placeHolder = 'Type a URL address'
                this.noteType = 'noteImg'
            }else if(type === 'noteTodos'){
                this.placeHolder = 'Type the list lable'
                this.noteType = 'noteTodos'
            }
        }
    },
    watch: {
    },
}