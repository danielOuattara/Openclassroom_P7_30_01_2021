<template>
  <!-- <div class=""> -->
    <div id="log">
      <p>Remplissez les champs ci-dessous</p>
      <form action="">
        <input type="email" name="email" id="email" placeholder=" votre email " aria-placeholder="votre email" required><br>
        <input type="password" name="password" id="password" placeholder=" votre mot de passe" aria-placeholder="votre mot de passe" required><br>
        <input type="submit" value="Envoyer">
        <input type="reset">
      </form>
   </div>
</template>



<script>

export default {
  name: 'Login',
  props: {
    // msg: String
  },

  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#log-in {

  display: inline-block;
  padding: 30px;
  width: 70%;
  margin-top: 10px;
  // width: 70%;
  background: rgba(87, 115, 208, 0.624);
}

</style>
