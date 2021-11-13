import homePage from './pages/app-home.cmps.js'
import aboutPage from './pages/app-about.cmps.js'
import emailApp from './apps/email/pages/email-app.cmps.js'
import keepApp from './apps/keep/pages/keep-app.cmps.js'
import emailDetails from './apps/email/pages/email-details.cmps.js'
import emailCompose from './apps/email/pages/email-compose.cmps.js'
import bookApp from './apps/books/pages/book-app.cmp.js'
import bookDetails from './apps/books/pages/book-details.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/email',
        component: emailApp,
    },
    {
        path: '/email/compose',
        component: emailCompose
    },
    {
        path: '/email/compose/:emailId',
        component: emailCompose
    },
    {
        path: '/email/:emailId',
        component: emailDetails
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
];

export const router = new VueRouter({ routes });