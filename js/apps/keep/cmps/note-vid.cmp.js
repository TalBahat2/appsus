
export default {
    props: ['note'],
    components: {
    },
    template:`
        <div class="note-preview">
            <video controls="controls" :src="note.info.url" type="video/mp4" >
            </video>
        </div>
    `,
}