import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/indexpages/index.vue'
import findmusic from '@/components/indexpages/findmusic.vue'
import paihang from '@/components/indexpages/paihang.vue'
import gedandetail from '@/components/indexpages/gedan_detail.vue'
import login from '@/components/login/login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect: '/findmusic',
      children:[
       {
      path: '/findmusic',
      name: 'findmusic',
      component: findmusic,
      hidden: true ,
      children:[
         {
         	  hidden: true ,
         	 path: '/gedandetail',
      name: 'gedandetail',
      component: gedandetail,
      
         }
      ]
    },
      {
      path: '/paihang',
      name: 'paihang',
      component: paihang,
       children:[
         {
         	  hidden: true ,
         	 path: '/gedandetail',
      name: 'gedandetail_paihang',
      component: gedandetail,
      
         }
      ]
    },
    
      ]
    },
 {
 	   path: '/login',
      name: 'login',
      component: login,
 },
   {path: '/', redirect: '/index'}
  ]
})
