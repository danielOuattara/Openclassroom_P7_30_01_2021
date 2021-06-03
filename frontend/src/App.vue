<template>
    <div id="app-globale">
        <Header />
        <Main/>
        <Footer v-if="loggedIn"></Footer>
    </div>
</template>

<script>
import Header from './components/header/Header.vue'
import Main from './components/main/Main.vue'
import Footer from './components/footer/Footer.vue'
export default {
    components: {
        Header,
        Main,
        Footer,
    },

    computed: { 
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },

    methods: { }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#app-globale {
    min-height: 100vh;
    background: linear-gradient(to right top, rgba(26, 59, 111, 0.7), rgba(15, 34, 64, 0.2));
}
</style>
