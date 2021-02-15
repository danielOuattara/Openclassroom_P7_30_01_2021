<template>
    <div id='sign-u'>
      <p>Renseignez les champs ci-dessous</p>
      <form action="">
      <input type="email" name="email" id="email" placeholder=" votre email " aria-placeholder="votre email" required><br>
      <input type="password" name="password" id="password" placeholder=" votre mot de passe" aria-placeholder="votre mot de passe" required><br>

       <div class="cgv">
          <input type="checkbox" id="cgu" name="cgu" value="true" required>
          <label for="cgu">Vous acceptez les Conditions Générales d'utilisation du service</label><br>
       </div>
      <input type="submit" value="Envoyer">
      <input type="reset"> 
      </form>
    </div>
</template>

<script>


export default {
  name: 'Signin',
  props: {
    // msg: String
  },

  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



#sign-up {
  display: inline-block;
  padding: 30px;
  margin-top: 10px;
  // width: 70%;
  background: rgba(87, 115, 208, 0.624);
}


//   input #cgu{
//     margin-right: 10px;
//   }
//   input[type='submit'] {
//     margin: 20px 10px;
//   }

//   .cgv label {
//     display: inline;
//     font-size: 12px;
//   }
  
// }

</style>
