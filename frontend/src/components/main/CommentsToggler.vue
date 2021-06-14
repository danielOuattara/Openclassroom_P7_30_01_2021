<template>
        <span class="bloc-container-toggler btn btn-success" 
            type="button" 
            data-toggle="collapse" 
            :data-target="'#photo'+item" 
            aria-expanded="false" :aria-controls="'photo'+item"> 
                Comments :
        <span  class="number-of-comments">{{comments.length}} </span>
    </span>
</template>

<script>
export default {
    props: {
        item: {
            type: String,
            default: ''
        },
  
        comments: {
            type: Array,
            default: () => { return [] }
        },
    },
}
</script>