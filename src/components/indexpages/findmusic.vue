<template>
<div class="wraper" ref="wraper">
	<div class="find" style="z-index:-10">
         
		<slide></slide>
	
		<div class="recommend">
			<div class="recommend-title">
				<h2>推荐歌单</h2>
			</div>
			<div class="recommend-content">
				<ul>
					<li v-for="result in results" class="item" @click="getid(result)">
						<div class="listion-count">{{result.playCount|playCount}}</div>
						<img :src="result.picUrl">
						<div class="txt">{{result.name}}</div>
					</li>
				</ul>
			</div>
		</div>
		
	</div>
<router-view></router-view>
	</div>
</template>
<style type="text/css">
	.tab-bar{
		display: flex;
		margin: .2rem 0;

	}
	.tab-bar .tablist{
		flex: 1;
		
	}
	.tab-bar .tablist a{
		display: inline-block;
		width: 100%;
		text-align: center;
		font-size: .24rem;
		color: #000;
	}
	.tab-bar .tablist span{
		display: block;
		height: 1rem;
		line-height: 1rem;
		font-size: .6rem;
		color: #ff0000;
	}
	.recommend .recommend-title{
		margin: .3rem 0;
	}
	.recommend .recommend-title a{
		height: .38rem;
		font-size: .28rem;
		color: #000;
		font-weight: 200;
		border-left: .05rem solid #ff0000;
		padding-left: .2rem;
	}
	.recommend .recommend-title h2{
		font-size: .28rem;
		margin-left: .1rem;
		vertical-align: top;
	}
	.recommend-content ul{
		overflow: hidden;
	}
	.recommend-content .item{

		float: left;
		position: relative;
		box-sizing: border-box;
		width: 33%;
		padding-left:  1%;
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
</style>
<script type="text/javascript">
	import bscroll from 'better-scroll'
	import slide from '../slider/slider.vue'
	
	export default{

		data(){
			return{
				url:'http://localhost:3000',
				results:[],
				list:{},
				static:false,
				id:0,
				img:'',
				result:{}

			}
		},
		components:{
			slide,
			
		},
		created(){
			this.$axios.get(this.url+'/personalized').then( (res)=> {
				this.results=res.data.result
					this.$nextTick(()=>{
     		this.iscroll=new bscroll(this.$refs.wraper,{
     			scrollY:true,
     			click:true,
     			stopPropagation:true
     		})
     	})
				
			})
		},
		methods:{
           getid(s){
             this.$store.state.gedandetail=s
            this.$router.push({ 
            	name: 'gedandetail'
            })
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