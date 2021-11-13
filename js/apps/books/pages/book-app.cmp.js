import { bookService } from "../services/book-service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookAdd from "../cmps/book-add.cmp.js";

export default {
    components: {
        bookList,
        bookFilter,
        bookAdd
    },
    template: `
        <section class="book-app">
            <book-filter @filtered="setFilter"/>
            <book-add @renderBooks="loadBooks"/>
            <book-list :books="booksToShow" @selected="selectBook" />
        </section>
    `,
    data() {
        return {
            books : null,
            selectedBook : null,
            filterBy : null,
        };
    },
    created() {
        this.loadBooks();
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books);
        },
        selectBook(book){
            this.selectedBook = book;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) {
                return this.books;}
            const searchStr = this.filterBy.title.toLowerCase();
            const lowPriceStr = this.filterBy.priceLow;
            const highPriceStr = this.filterBy.priceHigh;
            const booksToShow = this.books.filter(book => {
                return (book.title.toLowerCase().includes(searchStr)) && 
                    book.listPrice.amount > lowPriceStr && 
                    (book.listPrice.amount < highPriceStr || !highPriceStr);
            });
            return booksToShow;
        }
    },
    
};