<template>
	<div class="login">
		<div class="top-bar" ref="topbar">
			<span class="back icon-mjiantou-copy" @click="show()"></span><span class="name">登录</span>
		</div>
		<div class="logincontent">
			<div class="inputcontent">
				<div class="username"><input type="text" name="username" v-model='username'></div>
				<div class="passeword"><input type="password" name="password" v-model='password'></div>
				<div class="log-btn" @click="login">登录</div>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
	.top-bar{
		
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		color: #fff;
		z-index: 20;
		background: rgb(212, 68, 57);
		text-align: center;
	}
	.top-bar .name{
		font-size: .35rem;
		text-align: center;

	}
	.top-bar .back{
		padding: 0 .2rem;
		position: absolute;
		left: 0;

	}
	.top-bar span{
		display: inline-block;
		vertical-align: top;
		font-size: .4rem;
	}
	.inputcontent{
		width: 50%;
		margin: 0 auto;
		margin-top: 20%;
	}
	.inputcontent input{
		display: inline-block;
		width: 100%;
		height: .6rem;
		line-height: .6rem;
		border:1px solid #f5f5f5;
		margin-bottom: .4rem;
	}
	.inputcontent .log-btn {
		width: 100%;
		height: .6rem;
		line-height: .6rem;
		background: red;
		color: #fff;
		text-align: center;
		font-size: .3rem;
	}
</style>
<script type="text/javascript">
	export default{
		data(){
			return{
				username:'',
				password:''
			}
		},
		methods:{
			show(){
				this.$router.back()

			},
		setCookie(name,value){
				var Days = 30;
				var exp = new Date();
				exp.setTime(exp.getTime() + Days*24*60*60*1000);
				document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
			},
			login(){
				this.$axios.get('http://localhost:3000'+'/login/cellphone?phone='+this.username+'&password='+this.password).then( (res)=> {
					if (res.data.code===200) {
						this.setCookie('userBg',res.data.profile.avatarUrl)
						this.setCookie('userId',res.data.profile.userId)
						this.setCookie('userName',res.data.profile.nickname)
						this.setCookie('loginState',true)
						this.$router.back()
					}

				})
			}
		}
	}
</script>