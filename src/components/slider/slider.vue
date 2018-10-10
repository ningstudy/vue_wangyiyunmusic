<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <div class="slide-item" v-for="banner in banners">
      	<img :src="banner.picUrl">
      </div>
    </div>
    <div v-if="showDot" class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll'
 
  export default {
    
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      showDot: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 400
      },
      
    },
    data() {
      return {
        dots: [],
        banners:[],
       url:'http://localhost:3000',
        currentPageIndex: 0
      }
    },
    created(){

			this.$axios.get(this.url+'/banner'+ '?nocache=' + new Date().getTime()).then( (res)=> {
				this.banners=res.data.banners
				
				this.$nextTick(()=>{
					this.update()
				})
			}).catch(function (error) {
alert(error)
});
    },
    mounted() {
      
      window.addEventListener('resize', () => {
        if (!this.slide || !this.slide.enabled) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slide.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    activated() {
      if (!this.slide) {
        return
      }
      this.slide.enable()
      let pageIndex = this.slide.getCurrentPage().pageX
      this.slide.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    methods: {
      update() {
        if (this.slide) {
          this.slide.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh() {
        this._setSlideWidth(true)
        this.slide.refresh()
      },
      prev() {
        this.slide.prev()
      },
      next() {
        this.slide.next()
      },
      init() {
        clearTimeout(this.timer)
        this.currentPageIndex = 0
        this._setSlideWidth(true)
        if (this.showDot) {
          this._initDots()
        }
        this._initSlide()
        if (this.autoPlay) {
          this._play()
        }
      },
      _setSlideWidth(isResize) {
        this.children = this.$refs.slideGroup.children
        let width = 0
        let slideWidth = this.$refs.slide.clientWidth
        console.log(slideWidth)
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
         
          child.style.width = slideWidth + 'px'
          width += slideWidth
        }
         console.log(width)
        if (this.loop && !isResize) {
          width += 2 * slideWidth
        }
        this.$refs.slideGroup.style.width = width + 'px'
        console.log(this.banners.length)
      },
      _initSlide() {
        console.log(this.threshold)
        this.slide = new BScroll(this.$refs.slide, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          },
          bounce: false,
          stopPropagation: true,
          click: this.click
        })
        this.slide.on('scrollEnd', this._onScrollEnd)
        this.slide.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
        })
        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        let pageIndex = this.slide.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      _initDots() {
        this.dots = new Array(this.banners.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slide.next()
        }, this.interval)
      }
    },
    watch: {
      loop() {
        this.update()
      },
      autoPlay() {
        this.update()
      },
      speed() {
        this.update()
      },
      threshold() {
        this.update()
      }
    }
  }
</script>
<style type="text/css">
	.slide{
		width: 100%;
		position: relative;
		overflow: hidden;
		 min-height: 1px;
height: 3.45rem;
	}
	 .slide-group{
	 	position: relative;
      overflow: hidden;
      white-space: nowrap;
       height: 100%;
	 }
	 .slide-item{
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        height: 100%;
    }
        .slide-item a{
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
      }
        img{
          display: block;
          width: 100%;
          height: 100%;
      }
    .dots{
      position: absolute;
      right: 0;
      left: 0;
      bottom: .24rem;
      transform: translateZ(1px);
      text-align: center;
      font-size: 0;
  }
      .dot{
        display: inline-block;
        margin: 0 .08rem;
        width: .16rem;
        height: .16rem;
        border-radius: 50%;
        background: #fff;
    }
       .dots .active{
          width: .4rem;
          border-radius: .1rem;
          background: #ff0000;
      }
</style>