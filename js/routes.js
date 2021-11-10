import homePage from './pages/app-home.cmps.js'
import aboutPage from './pages/app-about.cmps.js'
import emailApp from './apps/email/pages/email-app.cmps.js'
import keepApp from './apps/keep/pages/keep-app.cmps.js'
import emailDetails from './apps/email/pages/email-details.cmps.js'

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
        component: emailApp
    },
    {
        path: '/email:emailId',
        component: emailDetails
    },
    {
        path: '/keep',
        component: keepApp
    },
];

export const router = new VueRouter({ routes });