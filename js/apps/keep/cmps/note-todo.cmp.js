
export default {
    props: ['note'],
    components: {
    },
    template: `
        <section class="note-todo">
            <p>{{note.info.label}}:</p>
            <hr>
            <ul class="clean-list">
                <div v-for="todo in note.info.todos">
                    <div class="flex space-between">
                        <li>{{todo.txt}}</li>
                        <div>
                            <input v-model="todo.isDone" @click="markLine" type="checkbox">
                            <i @click="remove" class="fa fa-trash" title="Remove list item"></i>
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
        }
    },
    methods: {
        markLine() {
            console.log(this.todo);
        },
        remove(){
            console.log(this.todo);
        }
    }
}