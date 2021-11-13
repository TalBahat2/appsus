export default {
    // props: ['description'],
    template: `
        <section class="book-review">
            <h3>Book review:</h3>
            <form @submit.prevent="save">
                <input v-model="review.revName" ref="input" type="text">
                <br>
                <label for="rate">Rating:</label>
                <div class="star-rating">
                    <input type="radio" @click="getRating(5)" name="stars" id="star-a" value="5"/>
                    <label for="star-a"></label>

                    <input type="radio" @click="getRating(4)" name="stars" id="star-b" value="4"/>
                    <label for="star-b"></label>
                
                    <input type="radio" @click="getRating(3)" name="stars" id="star-c" value="3"/>
                    <label for="star-c"></label>
                
                    <input type="radio" @click="getRating(2)" name="stars" id="star-d" value="2"/>
                    <label for="star-d"></label>
                
                    <input type="radio" @click="getRating(1)" name="stars" id="star-e" value="1"/>
                    <label for="star-e"></label>
                </div>
                <!-- <select name="rate" id="rate" v-model="review.rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select> -->
                <br>
                <label for="readAt">Read at:</label>
                <input v-model="review.date" type="date" id="readAt" name="readAt">
                <br>
                <label for="bookRev">Book review:</label>
                <br>
                <textarea v-model="review.revText" id="bookRev" name="bookRev" rows="4" cols="30"></textarea>
                <br>
                <button>Submit</button>
            </form>
        </section>
    `,
    data() {
        return {
            review: {
                revName: 'Books Reader',
                rating: 1,
                date: '',
                revText: '',
            }
        };
    },
    mounted() {
        this.focusInput()
      },
    methods: {
        save() {
            this.$emit('saved', this.review)
        },
        getRating(val) {
            this.review.rating = val;
        },
        focusInput() {
            this.$refs.input.focus()
        },
    },
}