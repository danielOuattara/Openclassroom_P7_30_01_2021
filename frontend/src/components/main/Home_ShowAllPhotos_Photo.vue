<template>
    <div class="bloc bloc-photo-post">
        <img :src="photo.imageUrl" :alt="'picture of ' + photo.title" class="photos"
             data-toggle="modal" :data-target="'#'+photo.uuid" />
        <!-- Modal -->
        <div class="modal fade" :id="photo.uuid" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                          <img :src="photo.imageUrl" :alt='"picture of " + photo.title' class="image-modal"/>               
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  props: ['photo']
};
</script>

<style lang="scss" scoped>

.bloc-photo-post {
  grid-row: 2 / span 4;
  grid-column: 1 / span 4;
}
</style>
