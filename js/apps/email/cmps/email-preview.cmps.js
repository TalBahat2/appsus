export default {
    props: ['email'],
    template: `
        <li class="email-preview flex space-between" @click="readMore(email)" :style="styleObject">
            <div class="grow-1">{{senderName}}</div>
            <div class="grow-1">{{email.subject}}</div>
            <div class="grow-1">{{email.body}}</div>
            <div class="grow-1">{{formattedDate}}</div>
            <router-link :to="emailLink">open</router-link>
            <div></div>
        </li>
    `,
    data() {
        return {
            showMore: false
        }
    },
    methods: {
    },
    computed: {
        formattedDate() {
            // TODO: if email was sent today, show time instead of date
            var sentAt = new Date(this.email.sentAt);
            var date = sentAt.getDate();
            var month = sentAt.toString().slice(4, 7);
            return month + ' ' + date;
        },
        senderName() {
            return this.email.from.split('@')[0];
        },
        emailLink() {
            return '/email/' + this.email.id;
        },
        styleObject() {
            return {
                'font-family': (this.email.isRead) ? 'roboto-light, sans-serif' :'roboto-medium, sans-serif',
                'background-color': (this.email.isRead) ? '#f5f7f7' : '#fff',
            }
        }
    },
    methods: {
        readMore(email) {
            console.log('email',email);
            this.showMore = true;
            //TODO: open a bigger view (under the email li)
        }
    }

}