<template>
    <div class="bloc bloc-photo-post">
        <img :src="item.imageUrl" :alt="'picture of ' + item.title" 
             class="photos" data-toggle="modal" 
             :data-target="'#photo'+item.uuid" />
        <!-- Modal -->
        <div class="modal fade" :id="'photo'+item.uuid" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close btn " data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body photo-modal">
                          <img :src="item.imageUrl" 
                               :alt='"picture of " + item.title' 
                               class="image-modal"/>               
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  props: ['item']
};
</script>

<style lang="scss" scoped>

.bloc-photo-post {
  grid-row: 2 / span 4;
  grid-column: 1 / span 4;
  .photos {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    height: auto;
    transition: transform 250ms;
    &:hover {
      transform: scale(0.99);
      box-shadow: 0 0 1.5px 2.5px rgba(123, 123, 123, 0.6);
      border-radius: 4px; /* Rounded border */
      cursor: pointer;
    }
  }
  .image-modal {
    max-width:100%; 
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%; 
   }
}

</style>
