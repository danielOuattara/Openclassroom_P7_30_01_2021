<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-danger btn-block" data-toggle="modal" data-target="#deleteModal">
            Delete your Account
        </button>

        <!-- Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Delete Your Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Confirm ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" @click="deleteUserAccount" data-dismiss="modal">Delete</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
// import authService from './../../services/auth.service';
export default {

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        ...mapGetters(['userData']),

    },

    methods: {
        ...mapActions(['deleteUserAccountAction']),  

        // async deleteUserAccount() {
        //     try {
        //         const userUuid = this.currentUser.uuid;
        //         console.log(userUuid);
        //         await authService.signout(userUuid);
        //         authService.logout();
        //         this.$router.push("/login");
        //     } catch(error) {
        //     this.message = (error.response && error.response.data) || error.message || error.toString();
        //     }
        // },

        async deleteUserAccount() {
            try {
                const userUuid = this.currentUser.uuid;
                await this.$store.dispatch("deleteUserAccountAction", userUuid)
                // localStorage.removeItem("user");
                // authService.logout();
                this.$router.push("/login");
            } catch(error) {
            this.message = (error.response && error.response.data) || error.message || error.toString();
            }
        }
    },  

    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
    }
  },
}
</script>

<style lang="scss" scoped>

.modal-body {
    font-size: 2.5vh;
    color: rgb(136, 8, 8);
    
}

</style>