import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
    <section class="emails-folder-list flex align-center">
        <h3>Folders</h3>
        <h4 @click="filter('inbox')">Inbox</h4>
        <h4 @click="filter('starred')">Starred</h4>
        <h4 @click="filter('sent')">Sent</h4>
        <h4 @click="filter('trash')">Trash</h4>
        <h4 @click="filter('draft')">Drafts</h4>
    </section>
    `,
    data() {
        return {
            status: 'inbox'
        }
    }, created() {

    },
    methods: {
        filter(status) {
            eventBus.$emit('filter', 'status', status);
        }
    }
}