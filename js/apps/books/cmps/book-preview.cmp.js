export default{
    props: ['book'],
    template:`
        <div class="book-preview">
            <img class="thumbnail" :src="thumbnailImg" />
            <p>Title: {{book.title}}</p>
            <p :class="priceClass">Price: {{priceToShow}}</p>
            <img class="sale" v-if="book.listPrice.isOnSale" src="img/sale.png"/>
        </div>
    `,
    computed: {
        priceToShow(){
            const price = this.book.listPrice.amount;
            const newPrice = new Intl.NumberFormat('en-IN', 
                { style: 'currency', currency: this.book.listPrice.currencyCode }).format(price);
            return newPrice
        },
        thumbnailImg(){
            return this.book.thumbnail;
        },
        priceClass(){
            if(this.book.listPrice.amount < 50) return 'green';
            else if(this.book.listPrice.amount > 150) return 'red';
            return 'black';
        }
    },
}