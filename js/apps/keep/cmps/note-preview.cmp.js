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
            <!-- <component :is="comp" /> -->
            <p>{{note.info.txt}}</p>
            <p>{{note.type}}</p>
            <note-txt />
        </div>
    `,
    data(){
        return{
            comp: 'noteTxt'
        }
    },
    computed: {
        
    },
}