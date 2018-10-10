<template>
<div>
	<div class="paihang" ref="wraper">

		<ul class="paihangwrap">
			<li v-for="list in results" class="item-paihang" @click="get(list)">
				<div class="icon-paihang"><img :src="list.playlist.coverImgUrl"></div>
				<div class="content-paihang">
					<ul>
						<li v-for="(song,index) in list.playlist.tracks.slice(0,3)">

							<span>{{index}}.</span><span class="ellipsis">{{song.name}}-<span v-for="(singer,index) in song.ar">{{singer.name}}<span v-if="song.ar.length>1&&index<song.ar.length-1">/</span></span></span>
							

						</li>
					</ul>
				</div>
			</li> 
		</ul>
		</div>
		<paihangdetail :result='result' v-if="$store.state.paihangdetail" ></paihangdetail>
	</div>
</template>
<style type="text/css">
	.paihang{
		position: fixed;
		top:1.6rem;
		width: 100%;
		left: 0;
		bottom: 0;
		overflow: hidden;
	}
	
	.paihangwrap .item-paihang{
		display: flex;
		margin-bottom: .1rem;
	}
	.paihangwrap .item-paihang .icon-paihang{
		width: 2rem;
		height: 2rem;

	}
	.paihangwrap .item-paihang .icon-paihang img{
		display: inline-block;
		width: 100%;
		height: 100%;
		background-size: cover;
		border-radius: .1rem;
	}
	.paihangwrap .item-paihang .content-paihang{
		flex: 1;
		overflow: hidden;
		border-bottom: 1px solid #f5f5f5;
		padding: .2rem;
	}
	.paihangwrap .item-paihang .content-paihang li span{
		font-size: .25rem;
		vertical-align: top;
	}
	.paihangwrap .item-paihang .content-paihang li span:first-child{
		padding-right: .1rem;
	}
	.paihangwrap .item-paihang .content-paihang li .ellipsis{
		width: 85% !important;
	}
	.paihangwrap .item-paihang .content-paihang li{
		line-height: .5rem;
	}
</style>

<script type="text/javascript">
	import bscroll from 'better-scroll'
	import paihangdetail from './paihang_detail.vue'
	export default{
		data(){
			return{
				result:{},
				results:[],
				url:'http://localhost:3000',
			}
		},
		components:{
			paihangdetail
		},
		created(){
			for (var i = 0; i <10; i++) {
				this.$axios.get(this.url+'/top/list?idx='+i).then( (res)=> {
					this.results.push(res.data)
					this.$nextTick(()=>{
						this.iscroll=new bscroll(this.$refs.wraper,{
							scrollY:true,
							click:true,
						})
					
					})
				})
			}


		},
		methods:{
			get(res){
				this.result=res
				this.$store.state.paihangdetail=true
				this.$store.state.singlist=this.result.playlist.tracks
			}
		},

	}
</script>