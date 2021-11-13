export default {
    props: ['email'],
    template: `
        <tr class="email-preview" @click="readMore(email)" :style="styleObject">
            <td class="sender">{{senderName}}</td>
            <td class="subject">{{email.subject}}</td>
            <td class="body" :style="{'font-family': 'roboto-light, sans-serif'}">{{email.body}}</td>
            <td class="date">{{formattedDate}}</td>
        </tr>
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
            this.$router.push('/email/' + this.email.id)
            //TODO: open a bigger view (under the email li)
        }
    }

}