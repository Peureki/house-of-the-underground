<template>
    <div class="full-container-3x" ref="fullContainer">
        <div class="flex-header-n-img" ref="flexHeaders">
            <div class="headers">
                <div class="special-word-indicator" ref="indicatorLines">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h3>We are here</h3>
                <h3>For the</h3>
                <Transition name="fade"><h2 ref="headerCulture" v-show="toggleCulture">Culture</h2></Transition>              
                <Transition name="fade"><h2 ref="headerCommunity" v-show="toggleCommunity">Community</h2></Transition>
                <Transition name="fade"><h2 ref="headerDance" v-show="toggleDance">Dance</h2></Transition>
                
            </div>
            <div>
                <img src="@/assets/imgs/miso-1.jpg">
            </div>
        </div>
        
        <div class="scroll-checks" ref="scrollChecks">
            <span><p>culture</p></span>
            <span><p>community</p></span>
            <span><p>dance</p></span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import SplitType from 'split-type';


let flexHeaders = ref(null),
    fullContainer = ref(null),
    scrollChecks = ref(null);

let indicatorLines = ref(null),
    headerCulture = ref(null),
    headerCommunity = ref(null),
    headerDance = ref(null);

let toggleCulture = ref(true),
    toggleCommunity = ref(true),
    toggleDance = ref(true);

onMounted(() => {
    //const splitText = new SplitType(specialHeader.value);
    
    // Create IntersectionObserver function to react when users scroll to certain elements
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                if (entry.target.innerText == "culture"){  
                    // Revent other headers
                    gsap.to('.special-header-community',{
                        y: 300,
                        stagger: 0.05,
                        delay: 0.2,
                        duration: 0.1});
                    // Do animation of current header
                    gsap.to('.special-header-culture',{
                        y: 0,
                        stagger: 0.05,
                        delay: 0.2,
                        duration: 0.1
                    });
                    
                    toggleCulture.value = true;
                    toggleCommunity.value = false;
                    toggleDance.value = false;
                }
                if (entry.target.innerText == "community"){
                    // Revert other headers
                    gsap.to('.special-header-culture',{
                        y: 300,
                        stagger: 0.05,
                        delay: 0.2,
                        duration: 0.1});
                    gsap.to('.special-header-dance',{
                        y: 300,
                        stagger: 0.05,
                        delay: 0.2,
                        duration: 0.1});

                    // Do animation of current header
                    gsap.to('.special-header-community',{
                        y: 0,
                        stagger: 0.05,
                        delay: 0.2,
                        duration: 0.1
                    });
                    toggleCulture.value = false;
                    toggleCommunity.value = true;
                    toggleDance.value = false;
                }
                if (entry.target.innerText == "dance"){
                    // Revent other headers
                    gsap.to('.special-header-community',{
                        y: 300,
                        stagger: 0.05,
                        delay: 0.2,
                        duration: 0.1});
                    // Do animation of current header
                    gsap.to('.special-header-dance',{
                        y: 0,
                        stagger: 0.05,
                        delay: 0.2,
                        duration: 0.1
                    });
                    toggleCulture.value = false;
                    toggleCommunity.value = false;
                    toggleDance.value = true;
                }
            }
        })
    }, {threshold: 1});
    // Create array from HTML collection scrollChecks's children and observe each
    Array.from(scrollChecks.value.children).forEach((el) => observer.observe(el)); 

    SplitType.create(headerCulture.value, {charClass: "special-header-culture"});
    SplitType.create(headerCommunity.value, {charClass: "special-header-community"});
    SplitType.create(headerDance.value, {charClass: "special-header-dance"});
    
    
})


</script>

<style>
.full-container-3x{
    position: relative;
    height: 300vh;
    padding-inline: 50px;
}
.flex-header-n-img{
    display: flex;
    flex-basis: 50%;
    min-height: 450px;
    position: sticky;
    top: 25%;
}
.flex-header-n-img > div{
    flex-basis: 50%;
}
.flex-header-n-img img{
    max-width: 40%;
}
.flex-header-n-img .headers{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.special-word-indicator{
    display: flex;
    position: relative;
}
.special-word-indicator span{
    position: absolute;
    width: 100px;
    height: 3px;
    background-color: var(--color-secondary);
}
/* Span 3-6 are on top of the previous 3 and are indicators of progress of the scrolling */
.special-word-indicator span:nth-child(2),
.special-word-indicator span:nth-child(5){
    left: 120px;
}
.special-word-indicator span:nth-child(3),
.special-word-indicator span:nth-child(6){
    left: 240px;
}
.special-word-indicator span:nth-child(1),
.special-word-indicator span:nth-child(2),
.special-word-indicator span:nth-child(3){
    z-index: 1;
    background-color: var(--color-gray);
}
.special-word-indicator span:nth-child(4),
.special-word-indicator span:nth-child(5),
.special-word-indicator span:nth-child(6){
    z-index: 2;
    background-color: var(--color-secondary);
}
.scroll-checks{
    position: absolute;
    height: 100%;
    opacity: 0;
}
.scroll-checks span{
    position: absolute;
}
.scroll-checks span:nth-child(1){
    top: 0;
}
.scroll-checks span:nth-child(2){
    top: 33%;
}
.scroll-checks span:nth-child(3){
    top: 66%;
}
.line{
    background-color: transparent;
}
.headers h2{
    position: absolute;
    bottom: 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transition: 0.3s opacity ease;
}
.special-header-culture,
.special-header-community,
.special-header-dance{
    transform: translateY(300px);
    transition: 0.3s transform;
}
.fade-enter-active,
.fade-leave-active{
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to{
    opacity: 0;
}

</style>