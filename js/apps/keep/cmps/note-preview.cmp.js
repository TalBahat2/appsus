import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"

export default{
    props: ['note'],
    components: {
        noteTxt,
        noteImg,
    },
    template:`
        <div class="note-preview">
            <component :is="comp" :note="note" />
            <!-- <p>{{note.info.txt}}</p>
            <p>{{note.type}}</p> -->
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
    computed: {
        
    },
}