export default {
    template: `
        <div class="email-compose">
                <input type="text" class="to" placeholder="to">
                <input type="text" class="subject" placeholder="subject">
                <textarea cols="30" rows="10" class="body"></textarea>
        </div>
    `,
    data() {
        return {
            // email: null            
        }
    },
    created() {
        // const { emailStatus } = this.$route.params;
        // emailService.getById(emailId)
        //     .then(email => this.email = email);
    },

}