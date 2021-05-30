
<template>
  <div class="container">
    <div class="jumbotron">
      <h3>{{content}}</h3>
    </div>
  </div>
</template>

<script>
import UserService from './../services/user.service.js';
export default {
    name: 'User',
    data() {
        return {
            content: ''
        };
    },

    mounted() {
        UserService.getAdminBoard()
            .then( response => this.content = response.data ,
                   error => this.content =  (error.response && error.response.data) || error.message || error.toString()
            );
    }
};
</script>
