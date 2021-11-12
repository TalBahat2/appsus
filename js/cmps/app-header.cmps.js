// import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <section class="app-header">
            <div class="header-elements flex space-between align-center main-layout">
                <div class="logo">logo</div>
                <i class="fas fa-bars" @click="toggleNav"></i>
            </div>
            <nav class="nav-bar flex direction-column align-center" v-if="isNavOpen">
                <router-link to="/" @click.native="toggleNav">Home</router-link>
                <router-link to="/about" @click.native="toggleNav">About</router-link>
                <router-link to="/email" @click.native="toggleNav">Email</router-link>
                <router-link to="/keep" @click.native="toggleNav">Keep</router-link>
            </nav>
        </section>
    `,
    data(){
        return {
            isNavOpen: false,
        }
    },
    methods: {
        toggleNav(){
            this.isNavOpen= !this.isNavOpen;
        }
    }
}