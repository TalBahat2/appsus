
export default {
    props: ['note'],
    components: {
    },
    template:`
        <div class="note-preview">
            <video controls="controls">
                <source :src="note.info.url + '.mp4'" type="video/mp4" >
                <p>Not supported</p>
            </video>
        </div>
    `,
}