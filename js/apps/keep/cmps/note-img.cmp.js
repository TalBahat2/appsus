
export default {
    props: ['note'],
    components: {
    },
    template:`
        <section class="note-preview">
            <img :src="note.info.url" />
        </section>
    `,
}