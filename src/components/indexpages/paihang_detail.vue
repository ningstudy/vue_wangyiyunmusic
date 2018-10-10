<template>
	<div class="gedan-detail">
		<div class="top-menu" ref="topbar"><span class="back icon-mjiantou-copy" @click="show()"></span><span class="name ellipsis">{{name}}</span></div>
		<div class="scroll" ref="scroll">
			<div class="scroll-wrap">
				<div class="top" >
					<img :src="result.playlist.coverImgUrl" ref="imageHeight">
					<div class="title">
						<div class="ellipsis">{{result.playlist.description}}</div>
						<div class="playcount">最后更新于:{{result.playlist.trackNumberUpdateTime|formatTime}}</div>
					</div>
				</div>
				
				<div class="musiclist"  ref="topnum">
					<div class="playAll list">
						<div class="l-num"><span class=" icon-yinlebofang"></span></div>
						<div class="playAll-txt item " @click="playall">播放全部<span>(共{{result.playlist.trackCount}}首)</span></div>
					</div>
					<!-- loading -->
					<div class="parent" v-if="load">
						<div class="sk-circle">
							<div class="sk-circle1 sk-child"></div>
							<div class="sk-circle2 sk-child"></div>
							<div class="sk-circle3 sk-child"></div>
							<div class="sk-circle4 sk-child"></div>
							<div class="sk-circle5 sk-child"></div>
							<div class="sk-circle6 sk-child"></div>
							<div class="sk-circle7 sk-child"></div>
							<div class="sk-circle8 sk-child"></div>
							<div class="sk-circle9 sk-child"></div>
							<div class="sk-circle10 sk-child"></div>
							<div class="sk-circle11 sk-child"></div>
							<div class="sk-circle12 sk-child"></div>
						</div>
					</div>
				<!-- loading -->
					<ul v-else>
						<li class="list" v-for="(music,index) in result.playlist.tracks">
							<div class="l-num"><span >{{index+1}}</span></div>
							<div class="item" @click='palyshow(index)'>
								<div class="music-title ellipsis">{{music.name}}<span v-if="music.alia.length>0" class="alia">({{music.alia[0]}})</span></div>
								<div class="singer ellipsis">
									<span v-for="(singer,index) in music.ar">{{singer.name}}<span v-if="music.ar.length>1&&index<music.ar.length-1">/</span></span>
									<span>-{{music.al.name}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div> 
			</div>
		</div>
	
	</div>
</template>
<style type="text/css">
	@import '../../../static/css/songlistdetail.css'
</style>
<script type="text/javascript">
	import bscroll from 'better-scroll'
	import player from '../player/player.vue'
	export default{
		data(){
			return{
				url:'http://localhost:3000',
				load:true,
				lists:{},
				scrollY:0,
				imageHeight:0,
				name:'排行',
				
				al:{},
				ar:[],
				stat:false

			}
		},
	
		props:{
			result:{
				type:Object
			}
		},
		methods:{
			show(){
			
             this.$store.state.paihangdetail=false
			},
			loading(stat){
				return this.load=stat
			},
			getimageHeight(){
				return this.imageHeight=this.$refs.imageHeight.clientHeight
			},
			palyshow(index){
 
           this.$store.dispatch('musicurl',index)
           this.$store.state.paused=true
          this.$store.state.show=true
           this.$store.state.showAll=true
            this.$store.state.showMall=false

			},
			getstat(s){
                this.stat=s
			},
			playall(){
				  this.$store.state.paused=true
          this.$store.state.showAll=true
           this.$store.state.show=true
        	if (this.$store.state.playWay==0) {
        		this.$store.dispatch('musicurl',0)
        	}else  {
        		this.$store.dispatch('nextsong')
        	}
        },

		},
		created(){
			this.load=true
			var _this=this
				_this.load=false
				
				this.$nextTick(()=>{
					_this.scroll=new bscroll(this.$refs.scroll,{
						scrollY:true,
						click:true,
						probeType: 3,
						stopPropagation:true
					})
					_this.scroll.on('scroll',function (ev) {
						_this.scrollY=ev.y

					})
					_this.getimageHeight()
				})
			
		},
		watch:{
			scrollY(newY){

				let colorNum=Math.abs(newY)/this.imageHeight

				if (Math.abs(newY)>this.$refs.topnum.offsetTop-this.$refs.topbar.clientHeight) {
					this.name=this.result.playlist.name
				}
				else{
					this.name="排行"
				}
				if (newY<0) {
					this.$refs.topbar.style.background='rgba(212, 68, 57,'+colorNum+')'

				}else{

					this.$refs.topbar.style.background=''
				}
			}
		},
	  filters:{
	  	formatTime (time) {
         let unixtime = time
         let unixTimestamp = new Date(unixtime )
         let Y = unixTimestamp.getFullYear()
         let M = ((unixTimestamp.getMonth() + 1) > 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
        let D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
         let toDay = Y + '-' + M + '-' + D
         return toDay
      }
	  }

	}

</script>