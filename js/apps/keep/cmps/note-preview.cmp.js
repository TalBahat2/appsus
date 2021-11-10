export default{
    props: ['note'],
    template:`
        <div class="note-preview">
            <p>{{note.info.txt}}</p>
            <p>{{note.type}}</p>
        </div>
    `,
    computed: {
        
    },
}