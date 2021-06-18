<template>
    <div id="app-globale">
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

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#app-globale {
    min-height: 100%;
    min-width: 100%;
    background: rgb(240, 240, 240);
    display: grid;
    grid-template-rows: auto 1fr auto;
}
.main {
    /* min-height: 75vh; */
    margin-bottom: 20rem;
}

</style>
