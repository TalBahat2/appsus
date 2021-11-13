export default{
    props: ['txt', 'size'],
    template:`
        <section class="text-length">
            {{modifiedTxt}} <span v-if="txt.length > size">...</span>
        </section>
    `,
    computed: {
        modifiedTxt(){
            if(this.txt.length > this.size) return this.txt.slice(0, this.size);
            return this.txt
        },
    }
}