import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
    <section class="emails-filter flex space-between">
        <input type="text" class="search" v-model="txt" @input="filter('txt', txt)" placeholder="Search">
        <div class="flex space-between">
            <h3>Show:</h3>
            <button @click="filter('isRead', 'read')">read</button>
            <button @click="filter('isRead', 'unRead')">unread</button>
            <button @click="filter('isRead', 'all')">all</button>
        </div>
    </section>
    `,
    data() {
        return {
            txt: '',
            isRead: 'all',
            isStarred: 'all',
            labels: []
        }
    },
    methods: {
        filter(key, value) {
            eventBus.$emit('filter', key, value);
        }
    }
}