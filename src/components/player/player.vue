<template>
	<div class="player" v-show="$store.state.showAll">
		
		<div class="title-bar">
			<div @click="showlist" class="back"><span class="icon-mjiantou-copy" ></span></div>

			<div class="music-name">
				<div style="position:absolute;width:100%">
					<div class="name ellipsis" style="color: #fff;">{{$store.state.name}}</div>
					<div class="singer ellipsis" style="color: #fff;">
						<span v-for="(singer,index) in $store.state.ar">{{singer.name}}<span v-if="$store.state.ar.length>1&&index<$store.state.ar.length-1">/</span></span>
					</div>
				</div>
			</div>
			<div class="share"></div>
		</div>
		<div class="pic"><img :src="$store.state.al.picUrl" :class="{paused:!$store.state.bofang}"></div>
		<div class="play">
			<audio controls="controls" ref='play' autoplay="autoplay" :src="$store.state.musicurl"></audio>
			<div class="progressWrap">
				<span ref="currentTime">{{current.m}}:{{current.s}}</span>
				<div class="progressBar" ref="bar">
					<div class="controlCircle" ref="ct">
						<div ></div>
					</div>
					<div class="progressContent" ref="pr"></div>
				</div>
				<span>{{duration.m}}:{{duration.s}}</span>
			</div>
			<div class="play-btn">
				<div class="play-way"><span :class="playwayiocn" @click="playWay"></span></div>
				<div class="prev"><span class="icon-prev" @click="prevsong"></span></div>
				<div class="contorl-btn" @click="controlPlay"><span :class="playing" ></span></div>
				<div class="next"><span class="icon-xiayishouxianxing" @click="nextsong"></span></div>
				<div class="play-list"><span class="icon-bofangliebiao" @click="showplaylist"></span></div>
			</div>
		</div>
		<div class="singlist" v-show="showplayliststat" >
			<div class="singlistcontent">
				<div class="playall" @click="playall">播放全部</div>
				<div  ref="scroll" style="flex:1;overflow:hidden">
					<ul class="list" >
						<li class="name" v-for="(music,index) in $store.state.singlist" >
							<span class="ellipsis" :class="{active:index==$store.state.index}" @click="playmusic(index)">{{music.name}}</span>
							<span class="del" @click='del(index)'>x</span>
						</li>
					</ul>
				</div>
				<div class="close" @click="showplaylist">关闭</div>
			</div>
			
		</div>
		<div class="bg"><img :src="$store.state.al.picUrl" ></div>

	</div>
</template>
<style type="text/css">
	.player{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		bottom: 0;
		background: #f2f3f4;;
		z-index: 100;
	}
	.player .title-bar{
		display: flex;
		height: .8rem;
		font-size: .3rem;
	}
	.player .title-bar .back,.player .title-bar .share{
		width: .8rem;
		line-height: .8rem;
		text-align: center;

	}
	.player .title-bar .back span{
		color: #fff;
		font-size: .5rem;
	}
	.player .title-bar .music-name{
		flex: 1;
		position: relative;
	}
	.player .title-bar .music-name div{
		margin: 0 auto;
		text-align: center;
	}
	.player .title-bar .music-name .name{
		padding: .1rem 0;
	}
	.player .title-bar .music-name .singer{
		font-size: .2rem;
	}
	.player .pic{
		text-align: center;
		position: absolute;
		top: 48%;
		left: 50%;
		transform: translate(-50%,-50%);

	}
	.player .pic img{
		display: inline-block;
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		background-size: 100% 100%;
		animation: spin 10s linear infinite;
		box-sizing: border-box;
		border: .3rem solid hsla(0,0%,100%,.1);

	}
	.play-btn{
		display: flex;

	}
	.player audio{
		height: 0;
		opacity: 0;
	}
	.play-btn div{
		flex: 1;
		text-align: center;
		line-height: 1rem;
	}
	.play-btn div span{
		font-size: .5rem;

	}
	.play-btn .contorl-btn span{
		font-size: 1rem;
	}
	.player .play{
		position: fixed;
		bottom: 0;
		left: 0;
		
		width: 100%;
		
	}
	.player .play span{
		color: #fff;
	}
	.bg{
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		width: 100%;
		filter: blur(1rem);
		z-index: -10;
	}
	.bg img{
		display: inline-block;
		width: 300%;
		height: 300%;
		position: relative;
		left: -50%;
		top: -50%;
	}
	.player .pic .paused{
		animation-play-state:paused !important;

	}
	.progressWrap{
		display: flex;
		align-items:center;
		margin-bottom: .5rem;
	}
	.progressWrap span{
		width: 1rem; 
		font-size: .2rem;
		text-align: center;

	}
	.progressWrap  .progressBar{
		flex: 1;
		background: #fff;
		border-radius: .025rem;
		height: .05rem;
		position: relative;
	}
	.progressBar >div{
		position: absolute;
		left: 0;
		top:0;
	}
	.progressBar .controlCircle div{
		width: .1rem;
		height: .1rem;
		border-radius: 50%;
		background: red;
		position:relative;
		top:50%;
		transform: translateY(-50%);
		margin: 0 auto;
	}

	.progressBar .controlCircle{
		top:-.12rem;
		background: #fff;
		border-color: gray;
		width: .3rem;
		height: .3rem;
		border-radius: 50%;

		

	}
	.progressBar .progressContent{
		width: 0;
		background: red;
		height: 100%;
	}
	.singlist{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color:rgba(0,0,0,0.5);
		z-index: 100;
	}
	.singlistcontent{
		background: #fff;
		position: absolute;
		width: 100%;
		height: 62%;
		bottom: 0;
		overflow: hidden;
		display: flex;
		flex-direction:  column;
	}
	.singlistcontent .playall{
		height: .5rem;
		line-height: .5rem;
		font-size: .3rem;
		padding: .2rem;
	}
	.singlistcontent .list{
		padding: 0 .64rem;
	}
	.singlistcontent .list li{
		height: .8rem;
		line-height: .8rem;
		font-size: .3rem;
	}
	.singlistcontent .list li span{
		display: inline-block;
	}
	.singlistcontent .list li .del{
		float: right;
		padding: 0 .2rem;
	}
	.singlistcontent .list li .active{
		color: red;
	}
	.singlistcontent  .close{
		
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		background: #fff;
		font-size: .3rem;
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
<script type="text/javascript">
	import { mapActions } from 'vuex'
	import bscroll from 'better-scroll'
	export default{
		data(){
			return {
				paused:false,
				duration:{},
				current:{},
				durations:0,
				currentTimes:0,
				startX:0,
				moveX:0,
				playway:0,
                drag:false,
				showplayliststat:false,
				


			}
		},
		created(){

		},
		methods:{

			showlist(){
				this.$store.state.showAll=false
				this.$store.state.showMall=true
			},
			controlPlay(){

				if (this.$refs.play.paused) {
					this.$store.state.bofang=true
					console.log('播放')
					this.$refs.play.play()
				}
				else{
					
					this.$store.state.bofang=false
					console.log('暂停')
					this.$refs.play.pause()
				}
			},
			getduration(){
				let _this=this
				_this.durations=_this.$refs.play.duration
				_this.duration.m=Math.floor(_this.$refs.play.duration/60)
				_this.duration.s=parseInt(_this.$refs.play.duration%60)
				if (_this.duration.m<=9) {
					_this.duration.m='0'+ _this.duration.m

				}
				if (_this.duration.s<=9) {
					_this.duration.s='0'+ _this.duration.s
				}
			},
			getcurrentTime(){
				let _this=this
				_this.currentTimes=_this.$refs.play.currentTime

				_this.currentTime()
				if (_this.currentTimes>_this.durations) {

					_this.$store.dispatch("nextsong");
				}
				
			},
			currentTime(){
				let _this=this
				_this.current.m=Math.floor(_this.currentTimes/60)
				_this.current.s=parseInt(_this.currentTimes%60)
				_this.current=Object.assign({},_this.current)
				if (_this.current.m<=9) {
					_this.current.m='0'+ _this.current.m

				}
				if (_this.current.s<=9) {
					_this.current.s='0'+ _this.current.s
				}
				this.getprogress()
			},
			addlistener(){
				let _this=this
				_this.$refs.play.addEventListener('canplay',_this.getduration)
				
			_this.$refs.play.addEventListener('timeupdate',function () {
				if (!_this.drag) {
					_this.getcurrentTime()
				}
			})//timeupdate 播放进度发生变化时触发
			
			_this.$refs.ct.addEventListener('touchmove',_this.dragProgressMove,false)
			_this.$refs.ct.addEventListener('touchend',_this.dragProgressEnd,false)

		},
		getprogress(){
			let _this=this
			_this.$refs.ct.style.left=_this.currentTimes/_this.durations*(_this.$refs.bar.offsetWidth-_this.$refs.ct.offsetWidth/2)+'px'
			_this.$refs.pr.style.width=_this.$refs.ct.style.left
		},

		dragProgressMove(ev){
			let _this=this
			_this.drag=true
			_this.moveX=ev.touches[0].clientX-_this.$refs.currentTime.offsetWidth-_this.$refs.ct.offsetWidth/2
			if (_this.moveX>=_this.$refs.bar.offsetWidth) {
				_this.moveX=_this.$refs.bar.offsetWidth
			}
			if (_this.moveX<=0) {
				_this.moveX=0
			}

			_this.$refs.ct.style.left=_this.moveX+'px'
			_this.$refs.pr.style.width=_this.moveX+'px'
			_this.currentTimes=_this.moveX/_this.$refs.bar.offsetWidth*_this.durations
			_this.currentTime()
			
		},
		dragProgressEnd(){
			let _this=this
			_this.$refs.play.currentTime=_this.currentTimes
			_this.currentTime()
            _this.drag=false
		},
		playWay(){
			this.playway++
			if (this.playway>2) {
				this.playway=0
			}
			this.$store.state.playWay=this.playway
		},
		showplaylist(){
            //this.singlist=this.$store.state.singlist
            let _this=this
            setTimeout(function () {
            	if (!_this.scroll) {
            		_this.scroll=new bscroll(_this.$refs.scroll,{
            			click:true
            		})
            	}else{
            		_this.scroll.refresh()
            	}
            },20)


            this.showplayliststat=!this.showplayliststat
        },
        del(index){

        	this.$store.commit('getsinglist',index)
        	if (index==this.$store.state.index) {
        		if (this.playway==1) {
        			this.$store.dispatch('nextsong')
        		}
        		else{
        			if (index==this.$store.state.singlist.length){
        				this.$store.dispatch('musicurl',this.$store.state.singlist.length-1)
        			}else{


        				this.$store.dispatch('musicurl',index)
        			}
        		}
        		
        	} 
        },
        playmusic(index){
        	this.$store.dispatch('musicurl',index)
        },
        playall(){
        	if (this.playway==0) {
        		this.$store.dispatch('musicurl',0)
        	}else  {
        		this.$store.dispatch('nextsong')
        	}
        },
        ...mapActions([
        	'nextsong',
        	'prevsong'
        	])
    },
    mounted(){
    	this.addlistener()


    },
    computed:{
    	playing(){
    		if (!this.$store.state.bofang) {
    			return 'icon-yinlebofang'
    		}
    		else{
    			return 'icon-yinlezanting'
    		}
    	},
    	playwayiocn(){
    		if (this.playway==0) {

    			return 'icon-liebiaoxunhuan'
    		}
    		else if(this.playway==1){
    			return 'icon-bofangye-caozuolan-suijibofang'
    		}
    		else{
    			return 'icon-danquxunhuan'
    		}
    	}

    },
    watch:{

    }
}
</script>