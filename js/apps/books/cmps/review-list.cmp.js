
export default {
    props: ['reviews'],
    template: `
        <ul class="review-list">
            <li v-for="review in reviews" :key="review.id" >
                <div @click="deleteRev(review.id)">X</div>
                Reviewer name: {{review.name}}<br>
                Review date: {{review.date}}<br>
                rate: {{review.rating}}<br>
                Review: {{review.revText}}<br>
            </li>
        </ul>
    `,
    methods: {
        deleteRev(id){
            this.$emit('deleteRev',id)
        }
    }
}