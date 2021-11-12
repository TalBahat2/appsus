
export default {
    props: ['note'],
    components: {
    },
    template: `
        <section class="note-todo">
            <p>{{note.info.label}}:</p>
            <hr>
            <ul class="clean-list">
                <li v-for="(todo, idx) in note.info.todos">{{todo.txt}}
                    <input v-model="todo.isDone" @click="markLine" type="checkbox">
                    <button>del</button>
                    <hr>
                </li>
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
        }
    }
}