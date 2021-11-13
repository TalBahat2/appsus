
export default {
    template:`
        <section class="note-filter">
            <input @input="filter" v-model="filterBy.txt" type="text" placeholder="Search..." />
            <select v-model="filterBy.type" @change="filter" >
                <option value="">All</option>
                <option value="noteTxt">Text</option>
                <option value="noteImg">Image</option>
                <option value="noteVid">Video</option>
                <option value="noteTodos">List</option>
            </select>
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