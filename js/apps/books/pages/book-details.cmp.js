import bookDescription from "../cmps/book-description.cmp.js"
import bookReview from "../cmps/book-review.cmp.js";
import reviewList from "../cmps/review-list.cmp.js";
import { bookService } from "../services/book-service.js";

export default{
    components: {
        bookDescription,
        bookReview,
        reviewList
    },
    // props: ['book'],
    template:`
        <section v-if="book" class="book-details">
            <h2>book details:</h2>
            <p>Book title: {{book.title}}</p>
            <p>Book subtitle: {{book.subtitle}}</p>
            <p>{{authors}}: {{showAuthors}}</p>
            <p>Published at: {{book.publishedDate}}{{bookAge}}</p>
            <book-description :description="book.description"/>
            <p>Pages number: {{book.pageCount}} pages{{pageQty}}</p>
            <p>categories: {{showCategories}}</p>
            <img class="thumbnail" :src="thumbnailImg" />
            <p>language: {{book.language}}</p>
            <p :class="priceClass">Price: {{priceToShow}}</p>
            <img class="sale" v-if="book.listPrice.isOnSale" src="img/sale.png"/>
            <book-review @saved="saveReview"/>
            <h3>Reviews:</h3>
            <review-list @deleteRev="deleteRev" :reviews="book.reviews"/>
            <router-link to="/book"><button>Back to books</button></router-link>
            <router-link :to="'/book/'+prevBookId">< previous book</router-link>
            <router-link :to="'/book/'+nextBookId">Next book ></router-link>
        </section>
            `,
    data() {
        return {
            book : null,
            nextBookId: null,
            prevBookId: null,
            direction: null
        }
    },
    created() {
        this.loadBook()
    },
    methods: {
        loadBook(){
            const { bookId } = this.$route.params;
            bookService.getById(bookId)
                .then(book => this.book = book);
        },
        close(){
            this.$emit('close')
        },
        saveReview(review){
            bookService.saveRev(review,this.book.id)
                .then(updateBook=>{
                    this.book = updateBook
                })
        },
        deleteRev(id){
            bookService.removeReview(this.book.id, id)
                .then( () => {this.loadBook()})
        }
    },
    computed: {
        authors(){
            return (this.book.authors.length > 1)? 'Authors' : 'Author'            
        },
        showAuthors(){
            return this.book.authors.join(', ')
        },
        showCategories(){
            return this.book.categories.join(', ')
        },
        bookAge(){
            if(new Date().getFullYear() - this.book.publishedDate >  10) return ', Veteran Book';
            else if(new Date().getFullYear() - this.book.publishedDate < 5) return ', New!';
            return '';
        },
        pageQty(){
            if(this.book.pageCount < 100) return ', Light Reading';
            else if(this.book.pageCount > 500) return ', Long reading';
            else if(this.book.pageCount > 200) return ', Decent Reading';
            return '';
        },
        thumbnailImg(){
            return this.book.thumbnail;
        },
        priceToShow(){
            const price = this.book.listPrice.amount;
            const newPrice = new Intl.NumberFormat('en-IN', 
                { style: 'currency', currency: this.book.listPrice.currencyCode }).format(price);
            return newPrice
        },
        priceClass(){
            if(this.book.listPrice.amount < 50) return 'green';
            else if(this.book.listPrice.amount > 150) return 'red';
            return 'black';
        }

    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const { bookId } = this.$route.params;
                bookService.getById(bookId)
                    .then(book => this.book = book);
                bookService.getNextBookId(bookId)
                    .then(bookId => {
                        this.nextBookId = bookId
                        console.log('this.nextBookId', this.nextBookId);
                    });
                bookService.getPrevBookId(bookId)
                    .then(prevBookId => this.prevBookId = prevBookId);
            },
            immediate: true
        }
    }
}