import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <section class="app-header">
            <div class="header-elements flex space-between align-center main-layout">
                <div class="logo">logog</div>
                <nav>
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                    <router-link to="/email">Email</router-link>
                    <router-link to="/keep">Keep</router-link>
                    <!-- <button @click="showMsg">show msg</button> -->
                </nav>
            </div>
        </section>
    `,
    methods: {
        // showMsg() {
        //     eventBus.$emit('showMsg', true)
        // }
    }
}