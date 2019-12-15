<template>
  <nuxt />
</template>

<style>
.viewer_style {
  background-color: #282828;
  font-family: 'Noto Sans JP', sans-serif;
  width: 100%;
  height: 100%;
}
</style>

<script>
  export default {
    head: {
      bodyAttrs: {
        class: 'viewer_style'
      }
    }
  }
</script>