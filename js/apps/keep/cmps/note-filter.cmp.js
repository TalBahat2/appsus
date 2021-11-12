
export default {
    template:`
        <section class="note-filter">
            <input @input="filter" v-model="filterBy.txt" type="text" placeholder="Search..." />

        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                type: '',
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
            //deep copy
            // this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
}