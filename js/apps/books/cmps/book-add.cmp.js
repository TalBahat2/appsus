import { bookService } from "../services/book-service.js";

export default {
    components: {
    },
    template: `
        <section class="book-add">
            <form @submit.prevent="search">
                Add a book:
                <input v-model="searchTxt" type="search" placeholder="Search for a book to add">
                <button>Search</button>
            </form>
            <div class="search-results" v-if="results">
                <ul>
                    <li v-for="(book,idx) in results" v-if="!nums.includes(idx)">
                        {{book.title}}&nbsp;&nbsp;
                        <span @click="addBook(book,idx)">&#8853;</span>
                    </li>
                    <button @click="searchTxt=''">close</button>
                </ul>
            </div>
        </section>
    `,
    data() {
        return {
            searchTxt: '',
            results: null,
            nums: []
        }
    },
    methods: {
        search() {
            if (!this.searchTxt) return;
            bookService.searchAxios(this.searchTxt)
                .then(res => {
                    this.mapResults(res)
                })
        },
        mapResults(res) {
            console.log('res', res);
            this.results = res.map(book => {
                const subT = (book.searchInfo)? book.searchInfo.textSnippet:'Not available'
                const customBook = {
                    title: book.volumeInfo.title||'Not available',
                    subtitle: subT,
                    authors: book.volumeInfo.authors||'Not available',
                    publishedDate: book.volumeInfo.publishedDate||'Not available',
                    description: book.volumeInfo.description||'Not available',
                    pageCount: book.volumeInfo.pageCount||'Not available',
                    categories: book.volumeInfo.categories||'Not available',
                    thumbnail: book.volumeInfo.imageLinks.thumbnail||'Not available',
                    language: book.volumeInfo.language||'Not available',
                    listPrice: {
                        amount: 78,
                        currencyCode: 'ILS',
                        isOnSale: (Math.random() > 0.5)
                    }
                }
                return customBook
            })
        },
        addBook(book,idx){
            this.nums.push(idx)
            bookService.save(book)
                .then (()=>this.$emit('renderBooks'))
        }
    },
    watch: {
        // can watch : data , route, computed, props
        searchTxt() {
            if(!this.searchTxt) this.results = null;
        },
        msg: {
            handler(newVal, oldVal) {
                console.log('msg has changed!');
            },
            deep: true
        },
        'msg.txt'(newVal){
            console.log('msg txt has changed!');
        }
    },
}