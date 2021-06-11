<template>
        <span class="bloc-container-toggler btn btn-success" 
            type="button" 
            data-toggle="collapse" 
            :data-target="'#photo'+item.uuid" 
            aria-expanded="false" :aria-controls="'photo'+item.uuid"> 
                Comments :
        <span  class="number-of-comments">{{item.comments.length}} </span>
    </span>
</template>

<script>
export default {
    props:['item'],
}
</script>