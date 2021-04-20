<template>
    <div class="enter">
        <p>loggin here</p>
        <form>
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" value="">
            <br/>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" >
            <br>
            <input type="submit" value="Loggin">
        </form>
        <div id="nav">
          <router-link to="/signin">Signin</router-link>
        </div>
    </div>
    
</template>

<script>
export default {
    
}
</script>



<style lang="sass">

</style>