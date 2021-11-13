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
        <section class="note-preview"  :style="{backgroundColor: note.color}">
            <component :is="comp" :note="note" />
            <div v-if="editTxt">
                <textarea rows="4" v-model="note.info.txt"/>
                <div>
                    <i @click="saveEdit" class="fa fa-save" title="Save changes"></i>
                    <i @click="cancelEdit(note)" class="fas fa-window-close" title="Cancel changes"></i>
                </div>
            </div>
            <div v-if="editImg">
                <input v-model="newImgUrl" placeholder="Type in new URL" />
                <div>
                    <i @click="saveEdit" class="fa fa-save" title="Save changes"></i>
                    <i @click="cancelEdit(note)" class="fas fa-window-close" title="Cancel changes"></i>
                </div>
            </div>
            <div v-if="editTodos">
                <input v-model="note.info.label" />
                <div>
                    <i @click="saveEdit" class="fa fa-save" title="Save changes"></i>
                    <i @click="cancelEdit(note)" class="fas fa-window-close" title="Cancel changes"></i>
                </div>
            </div>
            <div>
                <i @click="remove(note)" class="fa fa-trash" title="Remove item"></i>
                <i @click="edit(note)" class="fa fa-edit" title="Edit item"></i>
                <i @mouseover="colorPalette=true" @mouseleave="colorPalette=false" class="fa fa-palette set-color" title="Change backround color">
                    <div v-if="colorPalette" class="drop-down-colors flex">
                        <i @click="setColor('#fffdf7')" class="fas fa-tint" style="color: #fffdf7;"></i>
                        <i @click="setColor('#e5e528')" class="fas fa-tint" style="color: #e5e528;"></i>
                        <i @click="setColor('#86c1c1')" class="fas fa-tint" style="color: #86c1c1;"></i>
                        <i @click="setColor('#76cd6e')" class="fas fa-tint" style="color: #76cd6e;"></i>
                        <i @click="setColor('#cb9741')" class="fas fa-tint" style="color: #cb9741;"></i>
                        <i @click="setColor('#d54f4f')" class="fas fa-tint" style="color: #d54f4f;"></i>
                    </div>
                </i>
                <i v-if="note.isPinned" @click="togglePin" title="Unpin note" class="fa fa-thumbtack"></i>
                <i v-if="!note.isPinned" @click="togglePin" title="pin note" class="fa fa-thumbtack fa-rotate-90"></i>
                <i @click="duplicate" title="Duplicate note" class="fas fa-clone"></i>

            </div>
        </section>
    `,
    data(){
        return{
            comp: null,
            editTxt: false,
            editImg: false,
            editTodos: false,
            newImgUrl: '',
            colorPalette: false,
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
                this.editImg = true;
                this.newImgUrl = '';
            }else if(note.type === 'noteTodos'){
                this.editTodos = true;
            }
        },
        saveEdit(){
            if(this.note.type === 'noteImg' ||this.note.type === 'noteVid'){
                this.note.info.url = this.newImgUrl
            }
            eventBus.$emit('saveEdit', this.note)
            this.editTxt = false
            this.editImg = false
            this.editTodos = false
        },
        cancelEdit(){
                this.editTxt = false
                this.editImg = false
                this.editTodos = false

            eventBus.$emit('cancelEdit')
        },
        setColor(color){
            eventBus.$emit('changeColor', this.note, color)
        },
        togglePin(){
            eventBus.$emit('togglePin', this.note)
        },
        duplicate(){
            eventBus.$emit('duplicate', this.note)
        }
    },
}