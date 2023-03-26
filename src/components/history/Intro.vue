<template>
<div class="full-container">
    <div class="headers-container" ref="headerContainer">
        <h2>History</h2>
        <h2>History</h2>
        <h2>History</h2>
        <h2>History</h2>
        <h2>History</h2>
    </div>
    
    <div class="timelineLine"></div>
    <div class="scrollArrow"></div>
</div>

</template>

<script setup>
import {ref, onMounted, inject} from 'vue';

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
.timelineLine{
    position: absolute;
    top: 80%;
    width: 100%;
    height: 2px;
    background-color: var(--color-secondary);
}
</style>