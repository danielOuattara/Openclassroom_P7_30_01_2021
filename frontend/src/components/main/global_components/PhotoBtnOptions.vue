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
                <BtnDeletePhoto v-if="photoOwner.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"  
                                class="btn-options-photo btn-delete-photo"
                                v-bind:photoUuid="photoUuid"
                                v-bind:ownerUuid="ownerUuid"/>
                <BtnReportPhoto v-if="ownerUuid != currentUser.uuid"
                                class="btn-options-photo btn-report-photo"/>
        </div>
    </div>
</template>

<script>
import BtnDeletePhoto from './BtnDeletePhoto';
import BtnReportPhoto from './BtnReportPhoto';
export default {
    // props: ['photoOwnerUuid', 'photoUuid'],
    props: {
        photoUuid: {
            type: String,
            default: ''
        },
        ownerUuid: {
            type: String,
            default: ''
        },
        photoOwner: {
            type: Object,
            default: () => { 
            return {} 
            }
        },
    },

    components: {
        BtnDeletePhoto,
        BtnReportPhoto,
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {   }
}
</script>

<style lang="scss"  >

.photo-options {
      font-size: 14px!important;
      &:hover {
          background: rgb(100, 100, 100)!important;
        //   color: white!important;
      }
}

.dropdown-menu {
    min-width: 10rem!important
}

.btn-options-photo {
    font-size: 0.8rem;
    margin-right: 0.4rem;
    margin-left: 0.4rem;
    border: 1px solid grey;
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