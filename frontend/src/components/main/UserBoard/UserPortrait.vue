<template>
    <section class="user-portrait">
        <img v-if="userDataGetters.avatar" 
              class="user-avatar"
              :src="userDataGetters.avatar" 
              :alt="userDataGetters.firstName + ' ' + userDataGetters.lastName + ' picture'"
              data-toggle="modal"
              :data-target="'#avatar'+ userDataGetters.uuid"/>
        <img v-else 
              class="user-avatar"
              src="./../../../assets/images/generic-profile_360_360.jpg" 
              :alt="userDataGetters.firstName + ' ' + userDataGetters.lastName + ' picture'"
              data-toggle="modal"
              :data-target="'#avatar'+ userDataGetters.uuid"/>

        <!-- Modal -->
        <div class="modal fade" :id="'avatar'+userDataGetters.uuid" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close btn " data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body photo-modal">
                          <img :src="userDataGetters.avatar" 
                               :alt='"picture of " + userDataGetters.uuid' 
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
      ...mapGetters(['userDataGetters']),
    },   
}
</script>

<style lang="scss">
.user-avatar{
  padding-bottom: 1rem;
  max-width: 20vw; 
  position: absolute;
  top: 10rem;
  left: 40%;
  @media screen and (min-width: 650px) {
        max-width: 100px;
        margin: auto;
        top: 9rem
    }
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