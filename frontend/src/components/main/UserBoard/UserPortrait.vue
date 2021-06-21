<template>
    <section class="user-portrait">
        <img v-if="userData.avatar" 
              class="user-avatar"
              :src="userData.avatar" 
              :alt="userData.firstName + ' ' + userData.lastName + ' picture'"
              data-toggle="modal"
              :data-target="'#avatar'+ userData.uuid"/>
        <img v-else 
              class="user-avatar"
              src="./../../../assets/images/generic-profile_360_360.jpg" 
              :alt="userData.firstName + ' ' + userData.lastName + ' picture'"
              data-toggle="modal"
              :data-target="'#avatar'+ userData.uuid"/>
              <font-awesome-icon id="icon-camera-retro" icon="camera-retro" />

        <!-- Modal -->
        <div class="modal fade" :id="'avatar'+userData.uuid" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close btn " data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body photo-modal">
                          <img :src="userData.avatar" 
                               :alt='"picture of " + userData.uuid' 
                               class="image-modal"/>               
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
      ...mapGetters(['userData']),
    },   
}
</script>

<style lang="scss">
.user-avatar{
  padding-bottom: 1rem;
  max-width: 20vw; 
  position: absolute;
  top: 9rem;
  left: 40%;
//   border-radius: 50% ;
  cursor: pointer;
}

.image-modal {
    max-width:100%; 
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%; 
}
</style>