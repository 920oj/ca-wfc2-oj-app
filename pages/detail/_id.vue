<template>
  <div class="detail_id">
    <main>
      <h2>作品詳細</h2>
      <h3>{{detail.title}}</h3>
      <p>作: {{detail.author}} / {{detail.publisher}}</p>
      <p>{{detail.description}}</p>
      <b-row>
        <b-col class="manga_list" v-for="item in detail.books" :key="item.id" lg="6">
          <itemBox 
          :book_id="item.id" 
          :image="item.image" 
          :title="item.title"
          >
          </itemBox>
        </b-col>
      </b-row>
    </main>
  </div>
</template>

<script>
import itemBox from '~/components/parts/itemBox.vue';

export default {
  layout: 'default',
  data() {
    return {

    }
  },
  components: {
    itemBox,
  },
  async asyncData({ $axios, params }) {
    const work = await $axios.get(`https://wfc2-image-api-259809.appspot.com/api/series/${params.id}`);
    return {detail: work.data};
  }
}
</script>

<style>
main {
  margin: 0 100px;
  margin-top: 30px;
}
</style>