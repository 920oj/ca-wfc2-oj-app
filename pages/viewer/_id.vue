<template>
  <div class="viewerId">
    <div class="title_area">
      <h2 class="manga_title">{{data.title}}</h2>
    </div>
    <div class="viewer_main">
      <!-- 縦読み設定時ビューア -->
      <div class="image_area_vertical" v-if="!$store.state.viewer_direction_horizontal">
        <div v-for="item in data.imageData" :key="item.id">
          <img v-lazy="item.imageUrl" alt="" class="manga_images_vertical" width="100%">
        </div>
      </div>
      <!-- 横読み設定時ビューア -->
      <div class="image_area_horizontal" v-if="$store.state.viewer_direction_horizontal">
        <!-- <p style="color: #fff; font-size: 5rem;">{{data.imageData[0]}}</p> -->
        <img :src="data.imageData[0].imageUrl" alt="" class="manga_images_horizontal" v-if="isTopPage" @click="topToNext()">
        <img :src="data.imageData[nowReading + 1].imageUrl" alt="" class="manga_images_horizontal" @click="nextPage()" v-if="!isTopPage">
        <img :src="data.imageData[nowReading].imageUrl" alt="" class="manga_images_horizontal" @click="backPage()" v-if="!isTopPage">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'viewer',
  data() {
    return {
      nowReading: 0,
      isTopPage: true,
    }
  },
  methods: {
    topToNext () {
      this.nowReading = 1;
      this.isTopPage = false;
    },
    nextPage () {
      this.nowReading += 2;
    },
    backPage () {
      if((this.nowReading - 2) < 0){
        this.nowReading = 0;
        this.isTopPage = true;
      } else {
        this.nowReading -= 2;
      }
    }
  },
  watch: {
    nowReading: function() {
      console.log('値が変更されました');
      if(this.nowReading + 2 < this.data.pageNum){
        let nextImage1 = new Image();
        nextImage1.src = this.data.imageData[this.nowReading + 1].imageUrl;
        let nextImage2 = new Image();
        nextImage2.src = this.data.imageData[this.nowReading + 2].imageUrl;
      }
      if(this.nowReading -2 > 0) {
        let backImage1 = new Image();
        backImage1.src = this.data.imageData[this.nowReading - 1].imageUrl;
        let backImage2 = new Image();
        backImage2.src = this.data.imageData[this.nowReading - 2].imageUrl;
      }
    }
  },
  // watch: {
  //   if(this.nowReading == 0) {
  //     isTopPage = false;
  //   }
  // },
  async asyncData({ $axios, params }) {
    const mangaData = await $axios.get(`https://wfc2-image-api-259809.appspot.com/api/books/${params.id}`);
    return { data: mangaData.data };
  }
}
</script>

<style>

.viewer_main {
  margin-top: 60px;
}

.manga_images_vertical {
  width: 100%;
  max-width:800px;
  display: block;
  margin: 0 auto;
}

.image_area_vertical {
  margin: 0 auto;
}

.title_area {
  color: #FFF;
  background: #282828;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: block;
  margin: auto;
}

.manga_title {

}

.image_area_horizontal {
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
}

.manga_images_horizontal {
  height: 100%;
  display: block;
}
</style>