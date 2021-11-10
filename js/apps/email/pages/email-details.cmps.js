export default {
    template: `
        <section v-if="email" class="email-details">
            <h3>hi</h3>
            <h3>{{email.subject}}</h3>
            <p class="body">{{email.body}}</p>
            <p class="sender">{{email.from}}</p>
            <p class="sender">{{email.from}}</p>
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    created() {
        const { emailId } = this.$route.params;
        console.log('here');
        emailService.getById(emailId)
            .then(email => this.email = email);
    }
}