import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
    <transition name="fade">
        <div v-if="msg" class="user-msg">
            <p>{{msg}}</p>
        </div>
    </transition>
    `,
    data() {
        return {
            msg: '',
        };
    },
    created() {
        eventBus.$on('showMsg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = '';
            }, 3000);
        }
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg);
    }

};