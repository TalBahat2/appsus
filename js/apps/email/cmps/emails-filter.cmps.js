import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
    <section class="emails-filter flex">
        <input type="text" class="search" v-model="txt" @input="filter('txt', txt)" placeholder="Search">
        <div class="isRead-filters flex">
            <button :style="{'background-color': (this.isRead === 'read') ? '#cecece' : '#fff'}" @click="filter('isRead', 'read')">read</button>
            <button :style="{'background-color': (this.isRead === 'unRead') ? '#cecece' : '#fff'}" @click="filter('isRead', 'unRead')">unread</button>
            <button :style="{'background-color': (this.isRead === 'all') ? '#cecece' : '#fff'}" @click="filter('isRead', 'all')">all</button>
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
            if(key === 'isRead') this.isRead = value;
            eventBus.$emit('filter', key, value);
        }
    }
}