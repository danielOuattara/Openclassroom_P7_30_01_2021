<template>
<header id="header">
    <nav id="navbar-main" class=" _upper-nav navbar navbar-expand-md navbar-dark bg-dark main-nav">
        <a class="navbar-brand" tabindex="0" @click.prevent>
            <router-link to="/home">
                <img src="./../../assets/images/image_Groupomania/icon-left-font-monochrome-white.svg" 
                    style="width:200px" 
                    alt=" image logo Groupomania"
                    id="image-logo"
                    tabindex="0"/>
            </router-link>
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="collapsibleNavbar">

            <div class="navbar-nav mr-auto" v-if="currentUser">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/home" class="nav-link" >
                            <font-awesome-icon icon="home" /> Home
                        </router-link>
                    </li>
                    <li v-if="showAdminBoard" class="nav-item">
                        <router-link to="/admin" class="nav-link" >
                            <font-awesome-icon icon="user-shield" /> Admin
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="currentUser" to="/user" class="nav-link" > 
                            <font-awesome-icon icon="user" /> User Board
                        </router-link>
                    </li>
                </ul>
            </div>

            <div v-if="!currentUser" class="navbar-nav ml-auto">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/signin" class="nav-link" >
                            <font-awesome-icon class="font-a-icon" icon="user-plus" /> Signin
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link"  >
                            <font-awesome-icon id="icon" icon="sign-in-alt" /> Login
                        </router-link>
                    </li>
                </ul>
            </div>

            <div v-if="currentUser" class="navbar-nav ml-auto">
                <ul id="navbar-nav" class="navbar-nav">
                    <!-- <li class="nav-item">
                        <router-link to="/profile" class="nav-link" >
                            <font-awesome-icon icon="address-card" /> Profile
                        </router-link>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link"  href="#" @click.prevent="logOut">
                            <font-awesome-icon icon="sign-out-alt" />LogOut
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
</template>

<script>
export default {

    computed: {

        currentUser() {
            return this.$store.state.auth.user;
        },

        showAdminBoard() {
            if (this.currentUser.accessToken && this.currentUser.roles) {
                return this.currentUser.roles.includes('ROLE_ADMIN');
            }
            return false;
        },
    },

    methods: {
        async logOut() {
            try{
                const userUuid = this.currentUser.uuid
                await this.$store.dispatch('auth/logout', userUuid);
                localStorage.removeItem("user");
                this.$router.push('/login');
            } catch (error) {
                    (error.response && error.response.data) || error.message || error.toString();
                }
        }
    }

};
</script>

<style lang="scss" scoped>

#navbar-main {
    background: linear-gradient(to left top, rgba(16, 33, 80, 0.2), rgba(16, 33, 80, 0.9))!important;
}

#navbar-nav:hover {
    padding: -2px;
}

.nav-link {
    color: white!important;
    // display: block;
    // margin-left: 1rem;
    &:hover {
        color: black!important;
        background: rgba(255, 255, 255);
        border-radius: 3px;
    }
}

</style>
