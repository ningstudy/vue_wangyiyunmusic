<template>
<div class="gedan">
<div class="top-menubar" v-if="$store.state.showbar"><span class="back icon-mjiantou-copy" @click="show()"></span><span class="name ellipsis">歌单</span></div>
	<div class="recommend-content" ref="wraper">

		<ul>
			<li v-for="result in results" class="item" @click="getid(result)">
				<div class="listion-count">{{result.playCount|playCount}}</div>
				<img :src="result.picUrl">
				<div class="txt">{{result.name}}</div>
			</li>
		</ul>
		
	</div>
	<router-view :result="result"></router-view>
	</div>
</template>
<style type="text/css">
.gedan .top-menubar{
		position: fixed;
		top: 0;
		left:0;
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		color: #fff;
		z-index: 20;
		    background: rgb(212, 68, 57);
	}
	.gedan .top-menubar .name{
		font-size: .35rem;
	
	}
	.gedan.top-menubar .back{
		padding: 0 .2rem;
	}
	.gedan .top-menubar span{
		display: inline-block;
		vertical-align: top;
		font-size: .4rem;
	}
	.recommend-content ul{
		overflow: hidden;
	}
	.gedan .recommend-content{
		position: absolute;
		width: 100%;
		top:.8rem;
		left: 0;
		bottom: 0;
	
		overflow: hidden;

	}
	.gedan .recommend-content .item{

		float: left;
		position: relative;
		box-sizing: border-box;
		padding-left:  1%;
		width: 49.5% !important;
		
	}
	.recommend-content .item .listion-count{
		color: #fff;
		position: absolute;
		top: .1rem;
		right: .1rem;
		font-size: .2rem;
	}
	.recommend-content .item .txt{
		height: .6rem;
		line-height: .3rem;
		font-size: .2rem;
		overflow: hidden;
		margin: .1rem 0;
		text-align: left;
	}
	img{
		width: 100%;
		height: 100%;
		display: inline-block;
	}
</style>
<script type="text/javascript">
	import bscroll from 'better-scroll'

	
	export default{

		data(){
			return{
				url:'http://localhost:3000',
				results:[],
				static:false,
				result:{}

			}
		},
	
		created(){
			this.$axios.get(this.url+'/personalized').then( (res)=> {
				this.results=res.data.result
					this.$nextTick(()=>{
						if (!this.iscroll) {
     		this.iscroll=new bscroll(this.$refs.wraper,{
     			click:true,
     		})
     	}else{
     		this.iscroll.refresh()
     	}
     	})
				
			})
		},
		methods:{
			show(){
				this.$router.back()

			},
           getid(s){
             this.result=s
             this.$store.state.showbar=false
            this.$router.push({ 
            	name: 'gedansdetail',
          query: {
           id: s.id
          }})
            
           },
           stat(s){
           	this.static=s
           }

		},
		filters:{
			playCount(val){
				if(val<9999){
					return val
					
				}else{
					return Math.floor(val/10000)+'万'
				}
			}
			
		}
	}
</script>