
<template>

  <!--Create Vue Components for accessing Resources
  These components will use UserService to request data.-->

  <div class="container">
    <header class="jumbotron">
      <h3>{{content}} Home</h3>
    </header>

    <main>

     <br/>

      <div>
        <form >
          <label for="myfile">Select a file:</label>
          <input type="file" id="myfile" name="myfile">
          <input type="button" value="Submit" v-on:click="photoPost">
        </form>     
      </div>

      <div class="mur-photo">
        mur des photos
      </div>

    </main>
  </div>
</template>

<script>
import UserService from './../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>

