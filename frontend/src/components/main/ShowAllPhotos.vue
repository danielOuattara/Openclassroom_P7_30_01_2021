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
              <div class="modal fade" id="photoModal" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                        <img :src="photo.imageUrl" 
                            :alt='"picture of " + photo.title'
                            class="photos "> 
                  </div>
                </div>
              </div>

        </div>

              <!-- Button trigger modal -->
              <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
              </button> -->



                          <!-- 
                          <img :src="photo.imageUrl" 
                              :alt='"picture of " + photo.title'
                              class="photos ">  
                            -->
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

    mounted() {
      // setInterval(()=> { console.log("refresh photos : "); this.fetchAllPhotosAction()}, 5000) 
    }

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
  transition: transform 150ms;
  /* border: 5px solid #ddd; Gray border */
  /* border-radius: 4px;  Rounded border */
  /* padding: 5px; Some padding */
  /* width: 150px; Set a small width */
  /* margin: 10px; */
  &:hover {
    transform: scale(0.98);    
    box-shadow: 0 0 2px 1px rgba(18, 33, 253, 0.885);
    cursor: pointer;
    border: 3px solid rgb(255, 255, 255); /* Gray border */
    border-radius: 4px;  /* Rounded border */
    opacity: 0.7
  }

}
.photo-block {
  margin : 30px; 
  border: 1px solid lightblue;
  padding: 20px;
  overflow-x: hidden;
}

</style>