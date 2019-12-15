<template>
  <div class="viewerId">
    <div class="title_area" :style="{ opacity: menuOpacity, transition: 'all 0.5s' }" @mouseenter="titleDisplayToEnable()" @mouseleave="titleDisplayToDisable()">
      <h2 class="manga_title">{{data.title}}</h2>
    </div>
    <div class="viewer_main">
      <!-- 縦読み設定時ビューア -->
      <div class="image_area_vertical" v-if="$store.state.viewer_direction == 'vertical'">
        <div v-for="(item, index) in data.imageData" :key="index">
          <img v-lazy="item.imageUrl" alt="" class="manga_images_vertical manga_images_box" :id="'image_' + index" width="100%">
        </div>
      </div>
      <!-- 横読み設定時ビューア -->
      <div class="image_area_horizontal" v-if="$store.state.viewer_direction == 'horizontal'">
        <!-- 表紙表示 -->
        <img :src="data.imageData[0].imageUrl" alt="" class="manga_images_horizontal" v-if="isTopPage" @click="nextPage()">

        <!-- その後表示 -->
        <!-- <div class="hidden_plus" v-if="false">
          <img :src="data.imageData[nowReading + 3].imageUrl" alt="" class="manga_images_horizontal_hidden_plus" v-if="!isLastPage()">
          <img :src="data.imageData[nowReading + 2].imageUrl" alt="" class="manga_images_horizontal_hidden_plus" v-if="!isLastPage()">
        </div> -->
        <div class="main_view">
          <img :src="data.imageData[nowReading + 1].imageUrl" alt="" class="manga_images_horizontal" @click="nextPage()" v-if="!isTopPage && !isLastPage && !isFinished">
          <img :src="data.imageData[nowReading].imageUrl" alt="" class="manga_images_horizontal" @click="backPage()" v-if="!isTopPage && !isFinished">
          <div class="dummy_page" v-if="isFinished"><p>読了しました</p></div>
        </div>
        <!-- <div class="hidden_minus" v-if="false">
          <img :src="data.imageData[nowReading - 1].imageUrl" alt="" class="manga_images_horizontal_hidden_minus" v-if="!isFirstPage()">
          <img :src="data.imageData[nowReading - 2].imageUrl" alt="" class="manga_images_horizontal_hidden_minus" v-if="!isFirstPage()">
        </div> -->
      </div>
      <div class="menu_area">
        <div class="switch">
          <b-button @click="switchReadingStyle()">縦・横切り替え</b-button>
        </div>
        <div class="jump">
          <p class="page_progress"><b-button @click="nextPage()">＜</b-button><input :value="nowReading" id="progress" style="display: inline; width: 100px;" /> / {{data.pageNum - 1}} <b-button @click="jumpToPage()">GO</b-button><b-button @click="backPage()">＞</b-button></p>
        </div>
        <div class="sns">
          <b-button>共有</b-button>
        </div>
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
      isLastPage: false,
      isFinished: false,
      menuOpacity: 0,
      readDirection: this.$store.state.viewer_direction,
    }
  },
  methods: {
    titleDisplayToDisable () {
      console.log("外れました");
      this.menuOpacity = 0;
    },
    titleDisplayToEnable () {
      console.log("入りました");
      this.menuOpacity = 1;
    },
    jumpToPage() {
      let tmp = document.getElementById("progress").value;
      if(!isNaN(tmp) && tmp >= 0 && tmp <= this.data.pageNum){
        if(tmp == 0){
          this.isTopPage = true;
        }
        if(this.isTopPage && tmp != 0){
          this.isTopPage = false;
        }
        console.log(tmp);
        if(tmp % 2 == 0) {
          tmp -= 1;
        }
        this.nowReading = Number(tmp);
      }
    },
    nextPage () {
      if(this.isLastPage == true){
        this.isFinished = true;
      }
      if(this.isTopPage == true){
        this.nowReading = 1;
        this.isTopPage = false;
      } else {
        this.nowReading += 2;
      }
    },
    backPage () {
      if((this.nowReading - 2) < 0){
        this.nowReading = 0;
        this.isTopPage = true;
      } else {
        this.nowReading -= 2;
      }
    },
    isFirstPage () {
      if(!this.isTopPgae && (this.nowReading -2) < 0) {
        return true
      } else {
        console.log("隠しページ（前）表示します");
        return false
      }
    },
    isLastPage() {
      if(!(this.isTopPgae && (this.nowReading + 2) < this.data.pageNum)) {
        return true
      } else {
        console.log("隠しページ（後）表示します");
        return false
      }
    },
    getLocate() {
      const boxes = document.querySelectorAll(".manga_images_box");
      const options = {
        root: null,
        rootMargin: "-50% 0px",
        threshold: 0
      };
      console.log(document.querySelectorAll(".manga_images_box"));
      const observer = new IntersectionObserver(doWhenIntersect, options);
      boxes.forEach(box => {
        observer.observe(box);
      });
      const self = this;
      function doWhenIntersect(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log(entry.target.id.replace("image_", ""));
            self.nowReading = Number(entry.target.id.replace("image_", ""));
            history.replaceState(null, null, "#image_" + self.nowReading);
          }
        });
      }
    },
    async switchReadingStyle() {
      if(this.$store.state.viewer_direction == 'horizontal') { // 横→縦
        history.replaceState(null, null, "#image_" + this.nowReading);
        await this.$store.commit("setDirection", 'vertical');
        this.getLocate();
        this.readDirection = 'vertical';
      } 
      else if(this.$store.state.viewer_direction == 'vertical') { // 縦→横
        if(this.nowReading == 0) {
          this.isTopPage = true;
          this.isLastPage = false;
          this.isFinished = false;
        } else {
          this.isTopPage = false;
          this.isFinished = false;
          this.isLastPage = false;
          if(this.nowReading % 2 == 0){
            this.nowReading -= 1;
          }
        }
        history.replaceState(null, null, "#image_" + this.nowReading);
        await this.$store.commit("setDirection", 'horizontal');
        this.readDirection = 'horizontal';
      }
    }
    
  },
  updated: function() {
    if(this.$store.state.viewer_direction == 'vertical') {
      let tmp = document.getElementById("image_" + this.nowReading);
      tmp.scrollIntoView();
    }
  },
  watch: {
    nowReading: function() {
      if(this.nowReading == this.data.pageNum) {
        this.isLastPage = true;
        this.isFinished = true;
      } else {
        this.isLastPage = false;
        this.isFinished = false;
      }

      if(this.nowReading + 2 > this.data.pageNum) {
        this.isLastPage = true;
      } else {
        this.isLastPage = false;
      }
    },
    readDirection: function() {
      if(this.readDirection == 'vertical') {
      }
    }
  },
  created: function() {
    if(localStorage.viewer_direction) {
      this.$store.commit('setDirection', localStorage.viewer_direction);
    }
  },
  mounted() {
    this.$nextTick(function() {
      if(this.$store.state.viewer_direction == 'vertical') {
        let tmp = document.getElementById(window.location.hash.replace("#", ""));
        tmp.scrollIntoView();
        this.getLocate();
      }
    })
  },
  async asyncData({ $axios, params }) {
    const mangaData = await $axios.get(`https://wfc2-image-api-259809.appspot.com/api/books/${params.id}`);
    console.log(mangaData);
    return { data: mangaData.data };
  }
}


</script>

<style>

.viewer_main {

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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: block;
  margin: auto;
}

.manga_title {
  font-weight: 700;
}

.image_area_horizontal {
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.manga_images_horizontal {
  height: 100%;
  display: block;
}

.manga_images_horizontal_hidden_plus {
  height: 100%;
  display: block;
  position: fixed;
}

.manga_images_horizontal_hidden_plus {
  height: 100%;
  display: block;
  position: fixed;
}

.hidden_plus {
  display: flex;
  justify-content: center;
}

.hidden_minus {
  display: flex;
  justify-content: center;
}

.main_view {
  display: flex;
  justify-content: center;
}

.menu_area {
  color: #FFF;
  background: #282828;
  text-align: center;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
}

.page_progress {
  font-size: 1.5rem;
}

.finish_area {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dummy_page {
  width: 724px; 
  height: 1024px; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  color: #fff;
}
</style>