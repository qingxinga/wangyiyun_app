<template>
  <div class="home">
    <TopNav/>
    <SwpierTop/>
    <IconList/>
    <MusicList/>
  </div>
</template>

<script>
import TopNav from '@/components/home/TopNav.vue';
import SwpierTop from '@/components/home/SwpierTop.vue';
import IconList from '@/components/home/IconList.vue';
import MusicList from '@/components/home/MusicList.vue';

export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwpierTop,
    IconList,
    MusicList
  }
}
</script>

<!-- 
  >node app.js
 -->
