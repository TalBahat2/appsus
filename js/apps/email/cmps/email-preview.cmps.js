export default {
    props: ['email'],
    template: `
        <li class="email-preview flex space-between" @click="readMore(email)">
            <div class="from">{{senderName}}</div>
            <div class="title">{{email.subject}}</div>
            <div class="body">{{email.body}}</div>
            <div class="sent-at">{{formattedDate}}</div>
            <router-link :to="emailLink">open</router-link>
        </li>
    `,
    data() {
        return {
        }
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
        }
    },
    methods: {
        readMore(email) {
            console.log('email',email);
            //TODO: open a bigger view (under the email li)
        }
    }

}