import bookPreview from "./book-preview.cmp.js"

export default {
    components:{
        bookPreview
    },
    props: ['books'],
    template: `
        <ul class="book-list">
            <li v-for="book in books" :key="book.id" @click="select(book.id)" class="book-preview-container">
                <book-preview :book="book" />
            </li>
        </ul>
    `,
    methods: {
        select(bookId){
            this.$router.push('/book/' + bookId)
            // this.$emit('selected', book);
        },
    }
}