export default{
    props: ['description'],
    template:`
        <section class="book-description">
            Description: {{descript}} <span v-if="description.length > 100">...</span>
            <span v-if="description.length > 100" @click="changeDescLength">{{moreLess}}</span>
        </section>
    `,
    data() {
        return {
            isOpen: false
        };
    },
    methods: {
        changeDescLength(){
            this.isOpen = !this.isOpen;
        }

    },
    computed: {
        descript(){
            if(!this.isOpen) return this.description.slice(0, 99);
            return this.description
        },
        moreLess(){
            if(!this.isOpen) return 'more';
            return 'less';
        }
    }
}