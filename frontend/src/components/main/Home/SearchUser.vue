
<template>
<div id="search-user">
    <h2>Search user</h2>
    <input type="text" name="searchUser" v-model="search" 
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
                return user.firstName.match(this.search)
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
        console.log(res.data)
        })
        .catch(err=> { console.log(err.message)})
    },

    
}
</script>
