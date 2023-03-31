<template>
<div class="store-shelf">
  <shelf-title :title="shelfCategory.title"></shelf-title>
  <scroll class="store-shelf-scroll-wrapper"
          :top="0"
          :bottom="scrollBottom"
          ref="scroll"
          @onScrol="onScroll"
          v-if="ifShowList">
    <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
  </scroll>
  <div class="store-shelf-empty-view" v-else>
    {{$t('shelf.groupNone')}}
  </div>
  <shelf-footer></shelf-footer>
</div>
</template>

<script>
import ShelfTitle from '@/components/shelf/ShelfTitle.vue'
import { storeShelfMixin } from '@/utils/mixin'
import Scroll from '@/components/common/Scroll.vue'
import ShelfList from '@/components/shelf/ShelfList.vue'
import ShelfFooter from '@/components/shelf/ShelfFooter.vue'

export default {
  mixins: [storeShelfMixin],
  components: {
    Scroll,
    ShelfTitle,
    ShelfList,
    ShelfFooter
  },
  watch: {
    // 监听是否为编辑模式
    isEditMode(isEditMode) {
      // 如果是编辑模式，滚动条需要距底部48像素（需要换算成实际px，组件负责运算）
      this.scrollBottom = isEditMode ? 48 : 0
      this.$nextTick(() => {
        if (isEditMode) {
          // 刷新滚动条，使得设置生效
          this.$refs.scroll.refresh()
        }
      })
    }
  },
  computed: {
    ifShowList() {
      return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
    }
  },
  data() {
    return {
      scrollBottom: 0
    }
  },
  methods: {
    onScroll (offsetY) {
      this.setOffsetY(offsetY)
    }
  },
  mounted () {
    this.getCategoryList(this.$route.query.title)
    this.setCurrentType(2)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.store-shelf {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: #ffffff;
  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
  .store-shelf-empty-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: px2rem(14);
    color: #333;
    @include center;
  }
}

</style>
