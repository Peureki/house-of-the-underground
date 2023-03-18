<template>
  <div class="home">
    <HotuMask/>
    <WeAre/>
  </div>
</template>

<script>
// @ is an alias to /src
import HotuMask from '@/components/home/HotuMask.vue';
import WeAre from '@/components/home/WeAre.vue';

export default {
  name: 'HomeView',
  components: {
    HotuMask, WeAre
  },
  
}
</script>
