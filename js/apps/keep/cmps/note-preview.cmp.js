import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import { eventBus } from "../../../services/event-bus-service.js"

export default{
    props: ['note'],
    components: {
        noteTxt,
        noteImg,
    },
    template:`
        <div class="note-preview">
            <component :is="comp" :note="note" />
            <div>
                <button @click="remove(note)">X</button>
                <button @click="edit(note)">edit</button>
            </div>
        </div>
    `,
    data(){
        return{
            comp: null
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
            if(note.type === 'note-txt'){

            }
            // eventBus.$emit('edit', note)
        },
    },
}