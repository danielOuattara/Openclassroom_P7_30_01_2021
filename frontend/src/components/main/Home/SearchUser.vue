
<template>
<div>
    <h2>All blog article</h2>
    <input type="text" name="searchTitle" v-model="search" placeholder="Search by blog title..."/>
        <div class="single-blog" v-for="item, index in filteredBlogs" :key="index"> 
            <h2> {{ item.title | to-upperCase }}</h2>
            <article> {{ item.body | snippet}}</article>
        </div>
</div>

</template>

<script>
import userService from './../../../services/user.service.js';
export default {
    data() {
        return {
        users: [],
        searchUSer: '',
        };
    },

    computed: {

        filteredUser() {
        return this.users.filter( user => {
            return user.firstName.match(this.userSearch) || user.lastName.match(this.userSearch)
        })
        },
        
        currentUser() {
            return this.$store.state.auth.user;
        }
    },

    created() {
        userService.getAllUsers()
        .then( data => {
        this.users = data;
        console.log(data)
        })
        .catch(err=> { console.log(err.message)})
    },

    
}
</script>
