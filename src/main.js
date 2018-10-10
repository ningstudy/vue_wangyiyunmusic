// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import _promise from 'es6-promise';
import axios from 'axios'
import vuex from 'vuex'
_promise.polyfill();
Vue.prototype.$axios=axios
Vue.config.productionTip = false
Vue.use(vuex)
/* eslint-disable no-new */
var store = new vuex.Store({
	state:{
		show:false,
		showAll:true,
		showbar:true,
		musicurl:'',
		singlist:[],
		index:0,
		al:{},
		name:'',
		ar:[],
		id:0,
		bofang:true,
		playWay:0,
        num:0,
        paihangdetail:false,
        menuStat:false,
       

	} ,
	mutations:{
		getmusicurl(state,url){
			state.musicurl=url.url
			
		},
		getmusicdetail(state,detail){
			state.al=detail.al
			state.ar=detail.ar
			state.name=detail.name
		},
		getsinglist(state,index){
			
             state.singlist.splice(index,1)
           if (state.index>index) {
           	state.index-=1
           }
		}
	},
	actions:{
		musicurl(context,index){
			context.state.bofang=true
			if (context.state.id!=context.state.singlist[index].id) {
				context.state.id=context.state.singlist[index].id
				context.state.index=index
				axios.get('http://localhost:3000'+'/song/detail?ids='+context.state.singlist[index].id).then( (res)=> {
				context.commit('getmusicdetail',{al:res.data.songs[0].al,ar:res.data.songs[0].ar,name:res.data.songs[0].name})
			
			})
				axios.get('http://localhost:3000/music/url?id='+context.state.singlist[index].id).then((res)=>{
					context.commit('getmusicurl',{url:res.data.data[0].url})
				})

			}
		},
		nextsong(context){
		context.state.bofang=true
		
			context.state.musicurl=''
			
			if (context.state.playWay==0) {//列表循环
                context.state.num=context.state.index+1
                 if  ( context.state.num+1>=context.state.singlist.length){
				 context.state.num=0
				
			}
			}else if(context.state.playWay==1){//随机播放
				 context.state.num=Math.floor(Math.random()*context.state.singlist.length)
			}else{
				context.state.num=context.state.index
			}
		   axios.get('http://localhost:3000'+'/song/detail?ids='+context.state.singlist[context.state.num].id).then( (res)=> {
				context.commit('getmusicdetail',{al:res.data.songs[0].al,ar:res.data.songs[0].ar,name:res.data.songs[0].name})
			
			})
		   //
					axios.get('http://localhost:3000/music/url?id='+context.state.singlist[ context.state.num].id).then((res)=>{
				
				context.state.index=context.state.num
			context.commit('getmusicurl',{url:res.data.data[0].url})
				if (context.state.playWay==0) {
					 context.state.num= context.state.num+1
				}
			})
			


		},
		prevsong(context){
			context.state.bofang=true
			context.state.musicurl=''
			if (context.state.playWay==0){
				 context.state.num=context.state.index-1
				if (context.state.index<=0) {
				context.state.num=context.state.singlist.length-1

			}
			}else if(context.state.playWay==1){//随机播放
				 context.state.num=Math.floor(Math.random()*context.state.singlist.length)
			}else{
				context.state.num=context.state.index
			}
			
		axios.get('http://localhost:3000'+'/song/detail?ids='+context.state.singlist[context.state.num].id).then( (res)=> {
				context.commit('getmusicdetail',{al:res.data.songs[0].al,ar:res.data.songs[0].ar,name:res.data.songs[0].name})
			})
		//
			axios.get('http://localhost:3000/music/url?id='+context.state.singlist[context.state.num].id).then((res)=>{
				context.state.index=context.state.num
				context. commit('getmusicurl',{url:res.data.data[0].url})
				if (context.state.playWay==0) {
					 context.state.num= context.state.num-1
				}
			})
		}

	}
})
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})

