<template>  <!-- TODO:  pourquoi je n'arrive pas à réutiliser cette composant en plusieurs endroits ??? -->
<div>
    <div v-for="item, index in this.props" :key="index">
        <img v-if="item.owner.avatar" 
             class="bloc bloc-avatar" 
             :src="item.owner.avatar" 
             style="max-width: 10vw;"  
             :alt="'picture profile of ' + item.owner.firstName + item.owner.lastName "/>

        <img v-else class=" bloc bloc-avatar" src="./../../assets/images/generic-profile_360_360.jpg"
             style="max-width: 10vw;"  
             :alt="'picture profile of ' + item.owner.firstName + item.owner.lastName "
        />
  </div>
</div>


</template>

<script>
export default {
  name: "OwnerAvatar",
    props: ["photo", "comment"],

  data() {
    return {
      dataReceived: this.props
    };
  },

  methods: {
    outPutReceived() {
      console.log(this.dataReceived)
    }
  }
};
</script>