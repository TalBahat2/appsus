export default {
    template: `
    <section class="emails-filter">
        <input type="text" class="search" v-model="filterBy.txt" placeholder="Search">
        <div class="flex">
            <h3>show only:</h3>
            <button @click="changeFilter(isRead, read)">read</button>
            <button>unread</button>
            <button>all</button>
        </div>
    </section>
    `,
    data() {
        return {
            filterBy: {
                status: 'inbox',
                txt: '',
                isRead: 'all',
                isStarred: 'all',
                labels: []
            }
        }
    },
    methods: {
        changeFilter(key, value) {
            this.filterBy[key] = value;
        }

    }
}