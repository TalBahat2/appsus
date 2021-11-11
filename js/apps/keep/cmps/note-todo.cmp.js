
export default {
    props: ['note'],
    components: {
    },
    template:`
        <section class="note-todo">
            <h3>label: {{note.info.label}}</h3>
            <hr>
            <ul v-for="todo in note.info.todos">
                <li>{{todo.txt}}</li>
                <hr>
            </ul>
        </section>
    `,
}