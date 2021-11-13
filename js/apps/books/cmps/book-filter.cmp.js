export default {
    template: `
        <div class="book-filter">
            <label>Search:</label>
            <input v-model="filterBy.title" type="text" placeholder="Search...">
            <!-- <br> -->
            <label>From price:</label>
            <input v-model="filterBy.priceLow" type="number" placeholder="From price">
            <!-- <br> -->
            <label>To price:</label>
            <input v-model="filterBy.priceHigh" type="number" placeholder="To price">
            <!-- <br> -->
            <button @click="filter">Search</button>
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                priceLow: '',
                priceHigh: Infinity,
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