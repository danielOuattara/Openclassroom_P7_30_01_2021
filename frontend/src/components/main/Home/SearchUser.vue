
<template>
<div id="search-user">
    <label for="searchUser">Search user by firstName or lastName : </label>
    <input type="text" name="searchUser" v-model="search" id="searchUser" aria-labelledby="search"
           placeholder="search by firstName or lastName..."/>
    <div class="single-user" v-for="user, index in filteredUsers" :key="index"> 
        <span v-if="search.length>0"> {{ user.firstName}}</span>
        <span v-if="search.length>0"> {{ user.lastName}}</span>
    </div>
</div>

</template>

<script>
import userService from './../../../services/user.service.js';
export default {
    data() {
        return {
            users: [],
            search: '',
        };
    },

    computed: {

        filteredUsers() {
            return this.users.filter( user => {
                if(user.firstName || user.lastName) {
                    return user.firstName.match(this.search) || user.lastName.match(this.search)
                }
            })
        },
        
        currentUser() {
            return this.$store.state.auth.user;
        }
    },

    created() {
        userService.getAllUsers()
        .then( res => {
        this.users = res.data;
        })
        .catch(err=> { console.log(err.message)})
    },

    
}
</script>

<style lang="scss">
#search-user {
    margin-top: 1rem;
}
#searchUser {
    padding: 0.5rem 1rem;
    outline: none;
    // border-radius: 5px;
}
label[for=searchUser] {
    font-size: 1.35rem;
    border-bottom: 1px solid #c7c7c7;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    display: inline-block;
    width: 85vw;
        @media screen and (min-width: 650px) {
        max-width: 650px;
    }
}
.single-user {
    padding: 0.5rem 1rem;
    /* width: 63vw; */
}
</style>
