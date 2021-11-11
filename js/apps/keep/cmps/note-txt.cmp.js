
export default {
    props: ['note'],
    components: {
    },
    template:`
        <div class="note-preview">
            <p>{{note.info.txt}}</p>
        </div>
    `,
}