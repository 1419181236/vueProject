<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage:`url('${banner}')`}"></div>
      </div>
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <recommend :data="recommend" class="recommend"></recommend>
      <featured :data="featured" :titleText="$t('home.featured')"
                :btnText="$t('home.seeAll')" bclass="featured" ></featured>
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category class="categories" :data="categories"></category>
    </scroll>
  </div>

</template>

<script>
import SearchBar from '@/components/home/SearchBar.vue'
import Scroll from '@/components/common/Scroll.vue'
import FlapCard from '@/components/home/FlapCard.vue'
import { storeHomeMixin } from '@/utils/mixin'
import { home } from '@/api/store'
// eslint-disable-next-line no-unused-vars
import { banner, featured, recommend } from '@/mock/bookHome'
import GuessYouLike from '@/components/home/GuessYouLike.vue'
import Recommend from '@/components/home/Recommend.vue'
import Featured from '@/components/home/Featured.vue'
import CategoryBook from '@/components/home/CategoryBook.vue'
import Category from '@/components/home/Category.vue'
export default {
  mixins: [storeHomeMixin],
  components: {
    Category,
    CategoryBook,
    Featured,
    Recommend,
    GuessYouLike,
    Scroll,
    SearchBar,
    FlapCard
  },
  data() {
    return {
      scrollTop: 94,
      random: null,
      banner: '',
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
      if (offsetY > 0) {
        this.scrollTop = 52
      } else {
        this.scrollTop = 84
      }
      this.$refs.scroll.refresh()
    }
  },
  mounted () {
    home().then(response => {
      if (response && response.status === 200) {
        const data = response.data
        console.log(data)
        const randomIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[randomIndex]
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
      }
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.store-home {
  width: 100%;
  height: 100%;
  .banner-wrapper {
    width: 100%;
    padding: px2rem(10);
    box-sizing: border-box;
    .banner-img {
      width: 100%;
      height: px2rem(150);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .recommend {
    margin-top: px2rem(20);
  }
  .featured {
    margin-top: px2rem(20);
  }
  .category-list-wrapper {
    margin-top: px2rem(20);
  }
  .categories {
    margin-top: px2rem(20);
  }
}

</style>
