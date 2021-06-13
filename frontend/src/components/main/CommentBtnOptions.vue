<template>
    <div class="dropdown dropup">
        <button type="button" 
                class="btn btn-infos dropdown-toggle comment-more-options" 
                id="dropdownMenuOffset" 
                data-toggle="dropdown" 
                data-offset="-60,0"
                aria-haspopup="true" aria-expanded="false" > 
            Options
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuOffset">

            <UpdatePhotoComment v-if="comment.owner.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"  
                                class=" btn-comment-options btn-update-comment"  />

            <DeletePhotoComment class=" btn-comment-options btn-delete-comment"
                                v-show="comment.owner.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"
                                v-bind:commentUuid="comment.uuid"
                                v-bind:photoUuid="photoUuid" />

            <ReportPhotoComment class=" btn-comment-options btn-report-comment"/>
            
        </div>
    </div>
</template>

<script>

import UpdatePhotoComment from './UpdatePhotoComment.vue';
import DeletePhotoComment from './DeletePhotoComment.vue';
import ReportPhotoComment from './ReportPhotoComment.vue';


export default {

    props: ['comment','photoUuid'],

    components: {
        UpdatePhotoComment,
        DeletePhotoComment,
        ReportPhotoComment,
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },

        received() {
            return this.props;
        },

    },
    
}
</script>

<style lang="scss" >

.comment-more-options {
      font-size: 14px!important;
      &:hover {
          background: rgb(100, 100, 100)!important;
          color: white!important;
      }
}

.dropdown-menu {
    // padding-left: 0.25rem;
    padding: 0rem;

}
.btn-comment-options {
    font-size: 0.8rem;
    margin-right: 0.1rem;
    // margin-left: 0.25rem;
    border-style: none;
    background: rgb(255, 255, 255);
    font-weight: 600;
    border-radius: 3px;
    padding: 0.25rem 0.25rem!important;
    border: 1px solid rgb(100, 100, 100)!important;
    color: #000;
    &:hover {
        background: rgb(100, 100, 100);
        color: white
    }
}

</style>