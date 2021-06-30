<template>
<section class="special-options">
    <!-- Update Password drop-down button -->
    <button @click="updateToggler" class="user-update-form-collapser btn btn-outline-dark btn-block" 
            type="button" 
            data-toggle="collapse" data-target="#password-update" 
            aria-expanded="false" aria-controls="password-update">
        Update Password
            <font-awesome-icon v-if="!updateCollapsed" id="chevron-down" icon="chevron-down" />
            <font-awesome-icon v-if='updateCollapsed' id="chevron-up" icon="chevron-up" />
    </button>
    <div class="collapse" id="password-update">
        <div class="card card-body">
            <UserUpdatePassword class="user-update-password"/>
        </div>
    </div>

    <!-- Delete Account drop-down button -->
    <button @click="deleteToggler" class="account-delete-collapser btn btn-outline-danger btn-block" 
            type="button" 
            data-toggle="collapse" data-target="#account-delete" 
            aria-expanded="false" aria-controls="account-delete">
        Delete account
            <font-awesome-icon v-if="!deleteCollapsed" id="chevron-down" icon="chevron-down" />
            <font-awesome-icon v-if='deleteCollapsed' id="chevron-up" icon="chevron-up" />
    </button>
    <div class="collapse" id="account-delete">
        <div class="card card-body">
            <UserDeleteAccount class="user-delete-account" />
        </div>
    </div>

</section>
    
</template>

<script>
import UserUpdatePassword from './UserUpdatePassword.vue';
import UserDeleteAccount from './UserDeleteAccount.vue';
export default {
        components: { 
        UserUpdatePassword,
        UserDeleteAccount,
    },

    data() {
        return {
            updateCollapsed: false,
            deleteCollapsed: false,
        }
    },
    methods: {
        updateToggler() {
            this.updateCollapsed = !this.updateCollapsed
        },
        deleteToggler() {
            this.deleteCollapsed = !this.deleteCollapsed
        }
    } 
}
</script>

<style lang="scss" scoped>

button {
    width: 80%!important;
    margin: auto;
    margin-top: 1rem;
}

.user-update-password, .user-delete-account {
    max-width: 80vw;
    margin: auto;
}

.account-delete-collapser{
color: rgb(184, 0, 0);

    &:hover {
        color: white;
        background: rgb(184, 0, 0);
    }
}

#chevron-down, #chevron-up{
  margin-left: 1rem;
}
 </style>