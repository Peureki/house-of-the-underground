<template>
    <div class="full-container" ref="fullContainer">
        <div class="header-overlay" ref="headerOverlay">
            <h2>Who We Are</h2>
            <h2>Who We Are</h2>
            <h2>Who We Are</h2>
            <h2>Who We Are</h2>
            <h2>Who We Are</h2>
        </div>
        <div class="header-img">
            <img src="@/assets/imgs/group-1.jpg" :style="{filter: grayscale}">
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, inject} from 'vue';

let headerOverlay = ref(null),
    fullContainer = ref(null);

let bounds = null,
    containerHalfH = 0,
    containerY = 0,
    grayProgress = 0,
    grayscale = ref(0);

const gsapRepeatWords = inject('gsapRepeatWords');

const scrollGrayscale = () => {
    if (fullContainer.value){
        bounds = fullContainer.value.getBoundingClientRect(); 
        containerHalfH = bounds.height/2; 
        containerY = Math.abs(bounds.y);

        grayProgress = (containerY/containerHalfH);

        grayscale.value = `grayscale(${grayProgress})`;
    }
    
}

onMounted(() => {
    window.addEventListener('scroll', scrollGrayscale);

    let headers = Array.from(headerOverlay.value.children);
    
    gsapRepeatWords(headers);
})


</script>

<style scoped>
.full-container{
    height: 150vh;
}
.header-img{
    display: flex;
    position: sticky;
    justify-content: center;
    align-items: center;
    top: 10%;
    z-index: -1;
}
.header-img img{
    width: 75%;
    filter: grayscale(0);
}
.header-overlay{
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -25%);
}
.header-overlay h2{
    white-space: nowrap;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -25%);
}
@media only screen and (max-width: 768px){
    .full-container{
        height: 100vh;
    }
    .header-overlay{
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .header-img{
        top: 10%;
    }
    .header-img img{
        width: 90%;
    }
}
</style>