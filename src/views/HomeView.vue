<template>
  <div class="home">
    <HotuMask/>
    <WeAre/>
    <HotuIs/>
    <Movement/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import HotuMask from '@/components/home/HotuMask.vue';
import WeAre from '@/components/home/WeAre.vue';
import HotuIs from '@/components/home/HotuIs.vue';
import Movement from '@/components/home/Movement.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'HomeView',
  components: {
    HotuMask, WeAre, HotuIs, Movement, Footer
  },
}
</script>
