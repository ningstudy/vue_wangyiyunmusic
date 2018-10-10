<template>
	<div class="menu" ref="content">
		<div class="menu-content" ref="menu"> 
			<div class="user" v-if="loginstate">
				<div class="tou"><img :src="userbg"></div>
				<div class="name">{{name}}</div>
				<div class="gedan">
					<div class="list" v-for="(list,index) in userplaylist" @click="getid(list)">
						<div class="listbg"><img :src="list.coverImgUrl"></div>
						<div class="gedanname">
							<div>{{list.name}}</div>
							<div>共{{list.trackCount}}首</div>
						</div>
					</div>
				</div>
			</div>
			<div class="login-btn" @click="tologin" v-if="!loginstate">登录</div>
			<div class="login-btn" @click="loginout" v-else>退出登录</div>
		</div>

	</div>
</template>
<style type="text/css">
	.menu{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		bottom: 0;
		background-color:rgba(0,0,0,0.5);

	}
	.menu-content{
		position: absolute;
		top:0;
		left: 0;
		width: 60%;
		bottom: 0;
		background: #f5f5f5;
		padding-top: .5rem;
	}
	.menu-content .login-btn{
		width: 90%;
		margin: 0 auto;
		line-height: .6rem;
		text-align: center;
		border:1px solid red;
		border-radius: .3rem;
		font-size: .3rem;
		color: red;
	}
	.user .name{
		text-align: center;
	}
	.user .tou img{
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		margin: 0 auto;
	}
	.gedan .list{
		overflow: hidden;
		padding:.2rem;
	}
	.gedan .list .listbg{
		width: 1rem;
		height: 1rem;
		float: left;

	}
	.gedan .list .gedanname{
		float: left;
		font-size: .3rem;
		height: 1rem;
        padding-left: .1rem;
	}
	.gedan .list .gedanname div{
		line-height: .5rem;
	}
</style>
<script type="text/javascript">
	export default{
		data(){
			return{
				userbg:'',
				name:'',
				loginstate:false,
				userplaylist:{}
			}
		},
		methods:{
			listenContent(){
				let _this=this
				_this.$store.state.menuStat=false

			},
			listen(){
				let _this=this
				_this.$refs.content.addEventListener('click',function () {

					_this.listenContent()
				},false)
				_this.$refs.menu.addEventListener('click',function (e) {

					e.stopPropagation()
				},false)
			},
			tologin(){
				this.$router.push({ 
					name: 'login',
				})
			},
			getCookie(name){
				var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
				if(arr=document.cookie.match(reg))
					return unescape(arr[2]);
				else
					return null;
			},
			delCookie(name)
			{
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval=this.getCookie(name);
				if(cval!=null)
					document.cookie= name + "="+cval+";expires="+exp.toGMTString();
			},
			loginout(){
				this.loginstate=false
				this.delCookie('userBg')
				this.delCookie('userId')
				this.delCookie('userName')
				this.delCookie('loginState')
			},
			getid(s){
				this.$store.state.gedandetail=s
				this.$router.push({ 
					name: 'gedandetail',
				})

			}
		},
		mounted(){
			this.listen()
		},
		created(){
			this.userbg=this.getCookie('userBg')
			this.name=this.getCookie('userName')
			this.loginstate=this.getCookie('loginState')
			if (this.getCookie('userId')) {
			this.$axios.get('http://localhost:3000'+'/user/playlist?uid='+this.getCookie('userId')).then((res)=>{
				this.userplaylist=res.data.playlist
			})
			}
		}
	}
</script>