import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteVid from "./note-vid.cmp.js"
import noteTodos from "./note-todo.cmp.js"
import { eventBus } from "../../../services/event-bus-service.js"

export default{
    props: ['note'],
    components: {
        noteTxt,
        noteImg,
        noteVid,
        noteTodos
    },
    template:`
        <div class="note-preview">
            <component :is="comp" :note="note" />
            <div v-if="editTxt">
                <textarea rows="4" v-model="note.info.txt"/>
                <div>
                    <button @click="saveEdit">Save</button>
                    <button @click="cancelEdit(note)">Cancel</button>
                </div>
            </div>
            <div v-if="editImg">
                <input v-model="newImgUrl" placeholder="Type in new URL" />
                <div>
                    <button @click="saveEdit">Save</button>
                    <button @click="cancelEdit(note)">Cancel</button>
                </div>
            </div>
            <div>
                <button @click="remove(note)">X</button>
                <button @click="edit(note)">Edit</button>
            </div>
        </div>
    `,
    data(){
        return{
            comp: null,
            editTxt: false,
            editImg: false,
            newImgUrl: '',
        }
    },
    created() {
        this.comp = this.note.type;
    },
    methods: {
        remove(note){
            eventBus.$emit('remove', note.id)
        },
        edit(note){
            if(note.type === 'noteTxt'){
                this.editTxt = true
            }else if(note.type === 'noteImg' ||note.type === 'noteVid'){
                this.editImg = true
            }
        },
        saveEdit(){
            console.log(this.note);
            if(this.note.type === 'noteImg' ||this.note.type === 'noteVid'){
                console.log('inside if');
                this.note.info.url = this.newImgUrl
            }
            eventBus.$emit('saveEdit', this.note)
            this.editTxt = false
            this.editImg = false
        },
        cancelEdit(note){
                this.editTxt = false
                this.editImg = false

            eventBus.$emit('cancelEdit')
        }
    },
}