<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand>MANGA!!</b-navbar-brand>
    </b-navbar>
    <nuxt />
  </div>
</template>

<style>
.default_style {
  background: #F6F6F4;
}
</style>

<script>
  export default {
    head: {
      bodyAttrs: {
        class: 'default_style'
      }
    }
  }
</script>