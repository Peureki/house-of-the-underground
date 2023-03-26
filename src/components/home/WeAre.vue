<template>
    <div class="full-container-3x" ref="fullContainer">
        <div class="scroll-checks" ref="scrollChecks">
            <span><p>culture</p></span>
            <span><p>community</p></span>
            <span><p>movement</p></span>
        </div>

        <div class="flex-header-n-img" ref="flexHeaders">
            <div class="headers">
                <div class="special-word-indicator" ref="indicatorLinesParent">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span :style="{width: lineProgressOne}"></span>
                    <span :style="{width: lineProgressTwo}"></span>
                    <span :style="{width: lineProgressThree}"></span>
                </div>
                <h3>We are here</h3>
                <h3>For the</h3>
                <Transition name="fade"><h2 ref="headerCulture" v-show="toggleCulture">Culture</h2></Transition>              
                <Transition name="fade"><h2 ref="headerCommunity" v-show="toggleCommunity">Community</h2></Transition>
                <Transition name="fade"><h2 ref="headerMovement" v-show="toggleMovement">Movement</h2></Transition>
                
            </div>
            <div class="flex-imgs">
                <Transition name="fade-down"><img v-show="toggleCulture" src="@/assets/imgs/miso-1.jpg"></Transition>
                <Transition name="fade-down"><img v-show="toggleCommunity" src="@/assets/imgs/naomi-1.jpg"></Transition>
                <Transition name="fade-down"><img v-show="toggleMovement" src="@/assets/imgs/doggos-1.jpg"></Transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject} from 'vue';
import { gsap } from 'gsap';
import SplitType from 'split-type';

let flexHeaders = ref(null),
    fullContainer = ref(null),
    fullContainerHeight = 0,
    fcHiddenHeight = 0,
    fcHeight33 = 0,
    fcHeight66 = 0,
    fullContainerAbs = 0,
    fullContainerY = 0,
    fcProgress = 0,
    scrollChecks = ref(null);

let indicatorLinesParent = ref(null),
    headerCulture = ref(null),
    headerCommunity = ref(null),
    headerMovement = ref(null);

let toggleCulture = ref(false),
    toggleCommunity = ref(false),
    toggleMovement = ref(false);

let lineProgressOne = ref(0),
    lineProgressTwo = ref(0),
    lineProgressThree = ref(0);

const isMobile = inject('isMobile');

const handleScroll = () => {
    if (fullContainer.value){
        // Get container height
        fullContainerHeight = fullContainer.value.clientHeight;
        // Get container Y
        fullContainerY = fullContainer.value.getBoundingClientRect().y;
        // If the container Y is not above the fold yet, abs value remains 0 until it is above fold
        if (fullContainerY < 0){
            fullContainerAbs = Math.abs(fullContainerY);
        } else {
            fullContainerAbs = 0;
        }
        // Check if the user has started scrolling to where the div appears on screen
        // Take account of the hidden height value to start progress on progress bars
        if (fullContainerY < window.innerHeight && fullContainerY > 0){
            fcHiddenHeight = window.innerHeight - fullContainerY;
        }
        // 33%, 66% thresholds
        fcHeight33 = fullContainerHeight*0.33;
        fcHeight66 = fullContainerHeight*0.66;
        // Track progress of when users first see the container until they see the start of the end
        fcProgress = fullContainerAbs + fcHiddenHeight;
        // Show progress through progress lines
        // Each line is 33%
        // 0-33%
        if (fcProgress <= fcHeight33){
            lineProgressOne.value = `${(fcProgress/fcHeight33)*100}px`;
        }
        // 33-66
        if (fcProgress <= fcHeight66){
            lineProgressTwo.value = `${((fcProgress-fcHeight33)/fcHeight33)*100}px`;
        }
        // 66-100
        if (fcProgress <= fullContainerHeight){
            lineProgressThree.value = `${((fcProgress-fcHeight66)/fcHeight33)*100}px`;
        }
    }
}

onMounted(() => {
    //Init scroll effects
    window.addEventListener('scroll', handleScroll);
    let gsapStagger = 0;
    // Change stagger animation based on if mobile
    isMobile.value ? gsapStagger = 100 : gsapStagger = 300;
    
    // Create IntersectionObserver function to react when users scroll to certain elements
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                if (entry.target.innerText == "culture"){  
                    // Revent other headers
                    gsap.to('.special-header-community',{
                        y: gsapStagger,
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
                    toggleMovement.value = false;
                }
                if (entry.target.innerText == "community"){
                    // Revert other headers
                    gsap.to('.special-header-culture',{
                        y: gsapStagger,
                        stagger: 0.05,
                        delay: 0.2,
                        duration: 0.1});
                    gsap.to('.special-header-movement',{
                        y: gsapStagger,
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
                    toggleMovement.value = false;
                }
                if (entry.target.innerText == "movement"){
                    // Revent other headers
                    gsap.to('.special-header-community',{
                        y: gsapStagger,
                        stagger: 0.05,
                        delay: 0.2,
                        duration: 0.1});
                    // Do animation of current header
                    gsap.to('.special-header-movement',{
                        y: 0,
                        stagger: 0.05,
                        delay: 0.2,
                        duration: 0.1
                    });

                    toggleCulture.value = false;
                    toggleCommunity.value = false;
                    toggleMovement.value = true;
                }
            }
        })
    }, {threshold: 0});
    // Create array from HTML collection scrollChecks's children and observe each
    Array.from(scrollChecks.value.children).forEach((el) => observer.observe(el)); 

    // Make each of the special headers into individual divs for each character
    SplitType.create(headerCulture.value, {charClass: "special-header-culture"});
    SplitType.create(headerCommunity.value, {charClass: "special-header-community"});
    SplitType.create(headerMovement.value, {charClass: "special-header-movement"});

})

</script>

<style>

.flex-header-n-img{
    display: flex;
    flex-basis: 50%;
    min-height: 450px;
    position: sticky;
    top: 25%;
    z-index: 2;
}
.flex-header-n-img > div{
    flex-basis: 50%;
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
    z-index: 1;
}
.scroll-checks span{
    position: absolute;

}
.scroll-checks span:nth-child(1){
    top: 33%;
}
.scroll-checks span:nth-child(2){
    top: 66%;
}
.scroll-checks span:nth-child(3){
    top: 99%;
}
.flex-imgs{
    position: relative;
}
.flex-imgs img{
    object-fit: cover;
    width: clamp(500px, 100%, 1000px);
    max-height: 700px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
.line{
    background-color: transparent;
}
.headers h2{
    position: absolute;
    bottom: 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transition: 0.3s opacity ease;
    color: var(--color-highlight);
    z-index: 5;
}
.special-header-culture,
.special-header-community,
.special-header-movement{
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
.fade-down-enter-active,
.fade-down-leave-active{
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-down-enter-from,
.fade-down-leave-to{
    opacity: 0;
    transform: translateY(100px);
}

@media only screen and (max-width: 768px){
    .full-container-3x{
        padding-inline: 10px;
    }
    .flex-header-n-img{
        flex-direction: column;
        top: 5%;
    }
    .headers h2{
        top: 35%;
        clip-path: polygon(0 0, 100% 0, 100% 25%, 0 25%);
    }
    .special-header-culture,
    .special-header-community,
    .special-header-movement{
        transform: translateY(100px);
    }
    .flex-imgs img{
        width: clamp(300px, 100%, 100vw);
        max-height: 50vh;
    }
}
</style>