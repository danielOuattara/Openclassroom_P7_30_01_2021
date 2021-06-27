<template>
  <div class="hello">
    <input type="file" accept="image/*" class="hidden" ref="file" @change="change">
    <button @click="browse" >Browse Image</button>
  </div>
</template>

<script>
export default {
  name: 'AvatarInput',
  props: {
    value: File,
  }, 
  methods: {
    browse() {
      this.$refs.file.click()
    },
    change(event) {
      this.$emit('input', event.target.files[0]);
    }
  }
}
</script>

<style scoped>

</style>
