<template>
    <div id="app">
        <Header class="header"/>
        <Main class="main"/>
        <Footer class="footer" v-if="loggedIn" />
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
};
</script>

<style lang="scss" >
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#app {
    min-height: 100vh;
    width: 100%;
    background: rgb(240, 240, 240);
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
}

</style>
