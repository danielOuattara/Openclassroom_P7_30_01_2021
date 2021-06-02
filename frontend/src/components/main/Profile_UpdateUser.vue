<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-success btn-block" data-toggle="modal" data-target="#exampleModal">
            Update Your Account
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Profile Update</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div class="modal-body">
                        Confirm ?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" @click="updateUserAccount" data-dismiss="modal">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
// import authService from './../../services/auth.service';
import User from './../../models/user.js';
export default {

    data() {
        return {
            user = new User(' ', ' ', ' ', ' ', ' ', ' ', ' ')

        }
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        ...mapGetters(['userData']),

    },

    methods: {
        ...mapActions(['updateUserAccountAction']),  

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

        async updateUserAccount() {
            try {
                const userUuid = this.currentUser.uuid;
                await this.$store.dispatch("updateUserAccountAction", userUuid)
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