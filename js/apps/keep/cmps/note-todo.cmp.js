import { eventBus } from "../../../services/event-bus-service.js"

export default {
    props: ['note'],
    components: {
    },
    template: `
        <section class="note-todo">
            <p>{{note.info.label}}:</p>
            <hr>
            <ul class="clean-list">
                <div v-for="(todo, idx) in newNote.info.todos">
                    <div class="flex space-between">
                        <li :class="{'strike-out' : todo.isDone}" v-if="!todo.isEdit">{{todo.txt}}</li><br>
                        <div v-if="todo.isEdit">
                            <input v-model="todo.txt">
                            <i @click="saveEdit(todo)" class="fa fa-save hover-blue" title="Save changes"></i>
                            <i @click="cancelEdit(todo)" class="fas fa-window-close hover-blue" title="Cancel changes"></i>
                        </div>
                        <div>
                            <input v-model="todo.isDone" @click="markLine" type="checkbox">
                            <i @click="edit(todo)" class="fa fa-edit hover-blue" title="Edit item"></i>
                            <i @click="remove(idx)" class="fa fa-trash hover-blue" title="Remove list item"></i>
                        </div>
                    </div>
                    <hr>
                </div>
                <div @click="addLine" class="add-new-line">Add another line</div>
                <hr>
            </ul>
        </section>
    `,
    data() {
        return {
            isMarked: false,
            newNote: this.note,
            oldTxt: '',
        }
    },
    methods: {
        markLine() {
            eventBus.$emit('saveEdit', this.newNote)
        },
        edit(todo) {
            console.log(todo);
            todo.isEdit = true;
            this.oldTxt = todo.txt
        },
        saveEdit(todo) {
            todo.isEdit = false;
            eventBus.$emit('saveEdit', this.newNote)
        },
        cancelEdit(todo) {
            todo.isEdit = false;
            todo.txt = this.oldTxt;
            eventBus.$emit('cancelEdit')
        },
        remove(idx) {
            this.newNote.info.todos.splice(idx, 1)
            eventBus.$emit('saveEdit', this.newNote)
            eventBus.$emit('showMsg', 'Line removed')
        },
        addLine() {
            const newLine = { txt: 'And don\'t forget that', isDone: false, isEdit: false }
            this.newNote.info.todos.push(newLine);
            eventBus.$emit('saveEdit', this.newNote)
            eventBus.$emit('showMsg', 'New line was added')
        }
    }
}