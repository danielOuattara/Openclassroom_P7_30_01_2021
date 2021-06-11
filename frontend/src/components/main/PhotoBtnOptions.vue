<template>
    <div class="dropdown dropleft">
        <button type="button" 
                class="btn btn-infos dropdown-toggle photo-options" 
                id="dropdownMenuOffset" 
                data-toggle="dropdown" 
                aria-haspopup="true" aria-expanded="false">
            Options
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuOffset">
            <button v-if="item.owner.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"  
                    class=" btn-options-photo btn-delete-photo">
                Delete
            </button>
            <button class=" btn-options-photo btn-report-photo">
                Report
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    
}
</script>

<style lang="scss" >

.photo-options {
      font-size: 14px!important;
      &:hover {
          background: rgb(100, 100, 100)!important;
          color: white!important;
      }
}


.btn-options-photo {
    font-size: 0.8rem;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    border-style: none;
    background: rgb(255, 255, 255);
    font-weight: 600;
    border-radius: 3px;
    padding: 0.25rem 0.7rem!important;
    &:hover {
        background: rgb(100, 100, 100);
        color: white
    }
}

</style>