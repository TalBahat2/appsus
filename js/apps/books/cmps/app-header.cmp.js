export default {
    template: `
        <header class="app-header">
            <router-link to="/" class="logo"><h3>Miss Books</h3></router-link>
            <nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/book">Books</router-link> |
                <router-link to="/about">About</router-link>
            </nav>
        </header>

    `,
}