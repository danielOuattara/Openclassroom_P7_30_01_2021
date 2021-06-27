<template>
    <section class="user-data"> 
        <span type="button" @click="updateToggler" id="edit-user-data">
            <font-awesome-icon icon="edit" />
            Edit infos
            <font-awesome-icon v-if="!formToggler" id="chevron-down" icon="chevron-down" />
            <font-awesome-icon v-if='formToggler' id="chevron-up" icon="chevron-up" />
        </span>       
        
        <div class="user-infos">
            <span class="username-value"><b>Username :</b> {{userDataGetters.username}}  </span>
            <span v-if="userDataGetters.firstName && userDataGetters.lastName" class="name-value">  {{userDataGetters.firstName + ' ' + userDataGetters.lastName}} </span>
            <span  v-else class="name-value">New User </span>
            <span class="email-value"> <b>email :</b> {{userDataGetters.email}} </span>
            <span class="about-me-value"> <b>About me :</b> {{userDataGetters.aboutMe}} </span>
        </div>
        <UserUpdateInfosForm class="user-update-form" v-bind:formToggler="formToggler"
                        v-if="userDataGetters.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"/>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import User from '../../../models/user';
import UserUpdateInfosForm from './UserUpdateInfosForm.vue';
export default {
    components: {
        UserUpdateInfosForm,
},
    computed: {
        ...mapGetters(['userDataGetters']),
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },

        currentUser() {
            return this.$store.state.auth.user;
        },
    }, 

     data() {
        return {
            user: new User("", "", "", "", "", "", ""),
            loading: false,
            submitted: false,
            successful: false,
            selectedFile: '',
            message: '',
            formToggler: false,
        };
    },

    methods: {
        // ...mapActions(["updateUserAction"]),

        updateToggler() {
            this.formToggler = !this.formToggler;
        },

        onFileSelect(event) {
            this.selectedFile = event.target.files[0];
        },
    }
}
</script>

<style lang="scss">
.user-data {
    position: relative;
}
#edit-user-data{
    position: absolute;
    font-size: 0.90rem;
    right: 0.5rem;
    top: 2.5rem;
    border-bottom: 1px solid grey;
    padding: 0.3rem 0.50rem;
    &:hover{
        background: rgb(100, 100, 100);
        color:white;
        border-radius: 0.25rem ;
    }
}
.user-update-form{
    width: 80%;
    margin: auto;
}



</style>