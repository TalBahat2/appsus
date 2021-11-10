
export default {
    props: ['note'],
    components: {
    },
    template:`
        <div class="note-preview">
            <img :src="note.info.url" />
            <p>{{note.type}}</p>
        </div>
    `,
}