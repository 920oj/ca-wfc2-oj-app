<template>
  <div class="index">
    <main>
      <h2>作品一覧</h2>
      <b-row>
        <b-col v-for="item in series.data" :key="item.id" lg="6">
          <titleBox 
            :title="item.title" 
            :volume="item.volume"
            :author="item.author"
            :publisher="item.publisher"
            :description="item.description"
            :seriesImage="item.seriesImage"
            :seriesId="item.seriesId"
          >
          </titleBox>
        </b-col>
      </b-row>
    </main>
  </div>
</template>

<script>
import titleBox from '~/components/parts/titleBox.vue';

export default {
  layout: 'default',
  data() {
    return {
      
    } 
  },
  components: {
    titleBox,
  },
  async asyncData({ $axios }) {
    const all = await $axios.get("https://wfc2-image-api-259809.appspot.com/api/series/");
    return {series: all.data};
  }
}
</script>

<style>

main {
  margin: 0 100px;
  margin-top: 30px;
}

.manga_img {
  width: 100px;
}
</style>
