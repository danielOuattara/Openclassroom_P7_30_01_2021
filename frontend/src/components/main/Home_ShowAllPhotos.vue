<template>
    <div class="photos-container">
          <h3>All Photo</h3>
        <div v-for="photo in allPhotos" 
             :key="photo.id"
             class="photo-block">
              <div>
                <div>{{photo.title}}</div>
                <div>{{photo.ownerId}}</div>
                <div>{{photo.imageUrl}}</div>
                <div>{{photo.comments}}</div>
              </div>

               <img :src="photo.imageUrl" 
                    :alt='"picture of " + photo.title'
                    class="photos"
                    data-toggle="modal" 
                    data-target="#photoModal"> 

                <!-- Modal -->
                <!-- <div class="modal fade" id="photoModal" tabindex="-1" aria-labelledby="phtoModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                          <img :src="photo.imageUrl" 
                               :alt='"picture of " + photo.title'
                               class="image-modal">               
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div> -->
        </div>
    </div> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'ShowAllPhotos',

    data() {
        return {};
    },

    computed: {
        ...mapGetters(['allPhotos']),
    },

    methods: {
        ...mapActions(['fetchAllPhotosAction']),   
    },

    created() {
        this.fetchAllPhotosAction();
    },
};

</script>

<style lang="scss" scoped>
* {
  list-style-type: none;
}

.photos {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%; 
  height: auto;
  transition: transform 200ms;
  &:hover {
    transform: scale(0.98);    
    box-shadow: 0 0 2px 3px rgba(18, 34, 253, 0.6);
    border-radius: 4px;  /* Rounded border */
  }

// .photo-modal {
//   width: 90vw;
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
// }

}
.photo-block {
  margin : 30px; 
  border: 1px solid lightblue;
  padding: 20px;
  overflow-x: hidden;
}

</style>