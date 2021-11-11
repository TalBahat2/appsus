import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
    <section class="emails-filter flex space-between">
        <input type="text" class="search" v-model="filterBy.txt" @input="filter" placeholder="Search">
        <div class="flex space-between">
            <h3>Show:</h3>
            <button @click="changeFilter('isRead', 'read')">read</button>
            <button @click="changeFilter('isRead', 'unRead')">unread</button>
            <button @click="changeFilter('isRead', 'all')">all</button>
        </div>
    </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                isRead: 'all',
                isStarred: 'all',
                labels: []
            }
        }
    },
    methods: {
        filter() {
            eventBus.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        },
        changeFilter(key, value) {
            this.filterBy[key] = value;
            eventBus.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }

    }
}