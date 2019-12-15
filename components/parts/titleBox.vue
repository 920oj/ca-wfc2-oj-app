<template>
  <div class="titleBox">
    <div class="img_box">
      <img v-lazy="seriesImage" alt="作品画像" width="100%">
    </div>
    <div class="description_box">
      <h3>{{title}}</h3>
      <p>{{volume}}</p>
      <p>作: {{author}} / {{publisher}}</p>
      <p>{{description}}</p>
      <b-button @click="$router.push(`/detail/${seriesId}`)">詳細</b-button>
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
    title: String,
    volume: Number,
    author: String,
    publisher: String,
    description: String,
    seriesImage: String,
    seriesId: String
  }

}
</script>

<style>

.titleBox {
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