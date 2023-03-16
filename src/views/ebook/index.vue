<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>

</template>

<script>
import EbookReader from '@/components/ebook/EbookReader.vue'
import EbookMenu from '@/components/ebook/EbookMenu.vue'
import EbookTitle from '@/components/ebook/EbookTitle.vue'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
import { ebookMixin } from '@/utils/mixin'

export default {
  mixins: [ebookMixin],
  components: {
    EbookMenu,
    EbookReader,
    EbookTitle
  },
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
  },
  mounted () {
    this.startLoopReadTime()
  },
  beforeDestroy () {
    clearInterval(this.task)
  }
}
</script>

<style lang="scss" ref="stylesheet/scss" scoped>
    @import "../../assets/styles/global";
</style>
