<template>
    <section class="wall-background-image">
        <div class="background-image" v-if="userDataGetters.backgroundImage" v-bind:style="{backgroundImage:`url(${userDataGetters.backgroundImage})`}"></div>
        <div class="background-image" v-else v-bind:style="{'background-image': 'url(' + require('@/assets/images/icon.png') + ')'}"></div>
    </section>    
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {

    computed: {
        ...mapGetters(['userDataGetters', ]),
    }, 

    methods: {
        ...mapActions(['userUpdateBaclgoundImageAction', 'getOneUserAction']),

        onFileSelect(event) {
            this.selectedFile = event.target.files[0];
            this.fileSelected = !this.fileSelected;
        },

        onReset() {
          this.selectedFile = "";
          this.fileSelected= false;
          this.photo.title = "";
          this.$validator.reset();
        },

        async addPhoto() {
            try {
                this.loading = true;
                const isValid = await this.$validator.validateAll();
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                const formData = new FormData();
                formData.append("title", this.photo.title);
                formData.append("image", this.selectedFile, this.selectedFile.name);
                await this.$store.dispatch("UserUpdateBackgroundImageAction", formData);
                this.loading = false;
                this.getAllPhotosAction();
                this.getOneUserAction(this.currentUser.uuid);
                this.onReset();
            } catch(error) {
                this.loading = false;
                this.message = (error.response && error.response.data) || error.message || error.toString();
            }
        },
    }
}
</script>

<style lang="scss">
.wall-background-image{
    min-width: 100vw;
    height: 30vh;
}
.background-image{
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>