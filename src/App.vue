<template>
  <div id="app">
   
    <router-view/>
<player v-if='$store.state.show'></player>
  </div>
</template>

<script>
import player from './components/player/player.vue'
export default {
  
  name: 'App',
components:{
      player
    },
}
</script>

<style>

</style>
