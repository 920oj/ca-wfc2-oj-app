<template>
  <div class="itemBox">
    <div class="img_box">
      <img :src="image" alt="作品画像" width="100%">
    </div>
    <div class="description_box">
      <h3>{{title}}</h3>
      <b-button @click="$router.push(`/viewer/${book_id}`)">読む</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    book_id: String,
    image: String,
    title: String
  }
}
</script>

<style>
.itemBox {
  border: solid 1px #dbdad0;
  padding: 10px;
  display: flex;
}

.img_box {
  flex: 1;
  padding: 10px;
}

.description_box {
  flex: 2;
  padding: 10px;
}
</style>