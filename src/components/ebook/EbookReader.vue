<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'
import {
  getFontFamily,
  getFontSize,
  saveFontFamily,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
} from '@/utils/localStorage'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  methods: {
    ...mapActions(['setMenuVisible']),
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
      console.log(!this.menuVisible)
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
      console.log(!this.menuVisible)
    },
    initFontSize() {
      const fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily() {
      const font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initTheme() {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(this.defaultTheme)
    },
    initRendition() {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      const location = getLocation(this.fileName)
      this.display(location, () => {
        this.initTheme()
        this.initFontSize()
        this.initFontFamily()
        this.initGlobaStyle()
      })
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {})
      })
    },
    initGesture() {
      this.rendition.on('touchstart', event => {
        // 手势起始点的位置（像素）
        this.touchStartX = event.changedTouches[0].clientX
        // 手势起始点的时间
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        // 手势滑过的距离像素点
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        // 手势滑动的时间
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.preventDefault()
        event.stopPropagation()
      })
    },
    initEpub() {
      const Url = process.env.VUE_APP_RES_URL + '/noval/' + this.fileName + '.epub'
      this.book = new Epub(Url)
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) *
        (getFontSize(this.fileName) / 16))
      }).then(locations => {
        // console.log(locations)
        this.setBookAvailable(true)
        this.refreshLocation()
      })
  }
},
  mounted () {
    this.setFileName(this.$route.params
      .fileName.split('|').join('/'))
      .then(() => {
      this.initEpub()
    })
  }
}
</script>

<style scoped>

</style>
