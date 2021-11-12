
export default {
    props: ['note'],
    components: {
    },
    template:`
        <div class="note-preview">
            <video controls="controls">
                <source :src="note.info.url + '.mp4'" type="video/mp4" >
                <source :src="note.info.url + '.webm'" type="video/webm" >
                <source :src="note.info.url + '.ogg'" type="video/ogg" >
                <p>Not supported</p>
            </video>
        </div>
    `,
}