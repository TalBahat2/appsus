import { router } from './routes.js'
import appHeader from './cmps/app-header.cmps.js';
import appFooter from './cmps/app-footer.cmps.js';
import userMsg from './cmps/user-msg.cmps.js';

const options = {
    el: '#app',
    router,
    components: {
        appHeader,
        appFooter,
        userMsg
    },

    template: `
        <section class="app">
            <user-msg />
            <app-header />
            <router-view class="main-page main-layout" />
            <app-footer />
        </section>
    `
};

new Vue(options);