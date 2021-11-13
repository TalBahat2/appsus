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
                        <li :class="{'strike-out' : todo.isDone}">{{todo.txt}}</li>
                        <div>
                            <input v-model="todo.isDone" @click="markLine" type="checkbox">
                            <i @click="remove(idx)" class="fa fa-trash" title="Remove list item"></i>
                        </div>
                    </div>
                    <hr>
                </div>
            </ul>
        </section>
    `,
    data() {
        return {
            isMarked: false,
            newNote: this.note
        }
    },
    methods: {
        markLine() {
            eventBus.$emit('saveEdit', this.newNote)
        },
        remove(idx) {
            this.newNote.info.todos.splice(idx, 1)
            eventBus.$emit('saveEdit', this.newNote)
        }
    }
}