<template>
<div class="full-container">
    <div class="headers-container" ref="headerContainer">
        <h2>{{ title }}</h2>
        <h2>{{ title }}</h2>
        <h2>{{ title }}</h2>
        <h2>{{ title }}</h2>
        <h2>{{ title }}</h2>
    </div>
</div>

</template>

<script setup>
import {ref, onMounted, inject} from 'vue';

const props = defineProps({
    title: String,
});

let headerContainer = ref(null);
const gsapRepeatWords = inject('gsapRepeatWords');

onMounted(() => {
    let headers = Array.from(headerContainer.value.children);
    gsapRepeatWords(headers);
})

</script>

<style scoped>
.headers-container{
    width: 100%;
    height: 100%;
}
.headers-container h2{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>