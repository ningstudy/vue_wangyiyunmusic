<template>
	<div>
		<div class="head">
			<div class="header"  :class="{headersearch:searchHeaderShow}">
				<div class="header-left "><span class="icon-tinggeshiqu" v-if="!searchHeaderShow" @click="$store.state.menuStat=true"></span></div>
				<div class="header-center"><input type="text" name="search" ref="input" v-model="searchName" @keyup.13="search"></div>
				<div class="header-right"><span class="icon-yulebofangzhong" @click="$store.state.showAll=true" v-if="!searchHeaderShow"></span><span v-else @click="blur">取消</span></div>
			</div>

			<div class="tab">
				<router-link to="/findmusic" class="find-music" >发现音乐</router-link>
				<router-link to="/paihang" class="dj" >排行榜</router-link>
			</div>
		</div>
		<div class="search-content" v-if="searchContentShow">
			<div class="search-his" v-show="searchName===''||searchName===null">
				<div class="hot">
					<h2>热门搜索</h2>
					<div class="hotlist">
						<span v-for="hot in searchHot" v-html="hot.first" @click="hotsearch(hot.first)"></span>
					</div>
				</div>
			</div>
			<div class="search-res" v-show="searchName.length>0" ref="wraper">
				<ul class="res-list">
					<li v-for="(res,index) in searchRes" @click="play(index)">
						<span class="ellipsis">{{res.name}}</span>
						<span>{{res.artists[0].name}}</span>
					</li>
					<div class="loading" v-if="loading">加载中</div>
				</ul>
			</div>

		</div>
		<keep-alive><router-view ></router-view></keep-alive>
		<menuPage v-if="$store.state.menuStat"></menuPage>
	</div>
</template>
<style type="text/css">
	.head{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;

	}
	.header{
		
		height: .8rem;
		display: flex;
		background: #FF0000;
		line-height: .8rem;
		
	}
	
	.header .header-left,.header .header-right{
		height: 100%;
		width: .8rem;
		text-align: center;
	}
	.header .header-left span,.header .header-right span{
		font-size: .45rem;
		color: #fff;
	}
	.header .header-center{
		flex: 1;
		padding-top: .14rem;
	}
	.header .header-center input{
		display: inline-block;
		width: 100%;
		height: .56rem;
		border-radius: .28rem;
		vertical-align: top;
	}
	.tab{
		width: 65%;
		height: .8rem;
		margin: 0 auto;

	}
	.tab .router-link-active{
		color: #FF0000;
		border-bottom: .04rem solid #FF0000;
	}
	.tab a{
		height: 100%;
		line-height: .8rem;
		font-size: .25rem;
		box-sizing: border-box;
		color: #000;
	}
	.tab .find-music{
		float: left;
	}
	.tab .dj{
		float: right;
	}
	.a{
		color: #fff;
	}
	.wraper{
		overflow: hidden;
		position: absolute;
		top: 1.6rem;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.headersearch .header-left{
		width: .2rem;
	}
	.headersearch .header-right{
		width: 1rem;
	}
	.headersearch .header-right span{
		font-size: .35rem;
	}
	.header .header-center input{
		padding-left: .2rem;
		box-sizing: border-box;
		font-size: .3rem;
	}
	.search-content{
		position: fixed;
		top:.8rem;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		z-index: 20;
		padding: .2rem;
	}
	.search-content .hot h2{
		font-size: .2rem;
		color: #D3D3D3;
		margin-bottom: .1rem;
	}
	.search-content .hot .hotlist{
		padding-right: .3rem;
	}
	.search-content .hot .hotlist span{
		display: inline-block;
		height: .6rem;
		line-height: .6rem;
		border-radius: .3rem;
		font-size: .28rem;
		border: 1px solid #BEBEBE;
		padding: 0 .2rem;
		margin: .1rem .25rem .1rem 0;

	} 
	.search-res{
		overflow: hidden;
		height: 100%;
	}
	.search-res .res-list li{
		padding: .15rem 0;
		border-bottom: 1px solid #D3D3D3;
	}
	.search-res .res-list li span{
		display: block;
		font-size: .2rem;
		color:#708090;
	}
	.search-res .res-list li span:first-child{
		font-size: .3rem;
		color:#000000;
		line-height: .3rem;
		margin-bottom: .1rem;
	}
	.ellipsis{
		width: 70%  !important;
		overflow: hidden;
		white-space: nowrap;
		word-wrap: break-word;
		display: inline-block;
		text-overflow: ellipsis;
	}
</style>
<script type="text/javascript">
	import bscroll from 'better-scroll'
	import menuPage from '../menu/menu_page.vue'
	export default{
		data(){
			return{
				i:1,
				searchHot:[],
				searchHeaderShow:false,
				searchContentShow:false,
				searchName:'',
				searchRes:[],
				loading:false,
				i:1
			}
		},
		components:{
			menuPage
		},
		methods:{
			focus(){
				let _this=this
				_this.searchContentShow=true
				_this.searchHeaderShow=true
				
			},

			blur(){
				this.searchHeaderShow=false,
				this.searchContentShow=false,
				this.searchName=''
			},
			init(){
				this.$nextTick(()=>{
					this.iscroll=new bscroll(this.$refs.wraper,{
						pullUpLoad: {
          threshold: -150 ,// 当上拉距离超过30px时触发 pullingUp 事件
          stopPropagation:true
      },

      click:true,

  })
					this.scrollend()
				})
			},
			search(){
				this.searchRes=[]
				this.$axios.get('http://localhost:3000'+'/search?keywords='+this.searchName).then( (res)=> {
					this.searchRes=res.data.result.songs
					this.init()
               console.log(res.data.result.songs)


				})
			},
			scrollend(){
				this.iscroll.on('pullingUp', () => {
					this.loading=true
					this.i++
					this.$axios.get('http://localhost:3000'+'/search?keywords='+this.searchName+'&offset='+this.i*30).then( (res)=> {
						for (var j = 0; j <res.data.result.songs.length; j++) {
							this.searchRes.push(res.data.result.songs[j])
						}

					})


					this.loading=false

          this.iscroll.finishPullUp(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
           this.init()
      })

			},
			hotsearch(name){
				this.searchName=name
				this.search()
			},
			addlistener(){

				let _this=this
				_this.$refs.input.addEventListener('focus',_this.focus,false)

			},
			play(index){
				console.log(index)
				this.$store.state.singlist=this.searchRes
				this.$store.dispatch('musicurl',index)
			    this.$store.state.show=true
			    this.$store.state.showAll=true
			}
		},
		
		mounted(){
			this.addlistener()

			if ('/findmusic'!=this.$route.path) {
				this.$router.push({path:"/findmusic"})
			}
			this.$axios.get('http://localhost:3000'+'/search/hot').then( (res)=> {
				this.searchHot=res.data.result.hots
			})
		},

	}
</script>