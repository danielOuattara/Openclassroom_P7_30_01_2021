<template>
<!-- Comment!-->
        <p v-if="item.content" class="comment-content">
            {{ item.content}}
        </p>
        <p v-else class="comment-content"> </p>

</template>

<script>
export default {
    props: ["item"],
};
</script>