<template>

<div class="timeline-menu" ref="timelineMenu">
    <h5>TIMELINE</h5>
    <ul>
        <li v-for="(history, index) in historyObj" :key="history.year">
            <a :href="`#${history.year}`" ref="yearLink">{{ history.year }}</a>
            <Transition name="arrow"><svg v-show="isViewing[index]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144M392 256H100"/></svg></Transition>
        </li>
    </ul>
</div>

<div class="history-container" v-for="history in historyObj" :key="history.year" ref="historyContainer">
    <div class="content-container">
        <div class="header-container" ref="headerContainer">
            <h3 :id="history.year" ref="historyTitle">{{ history.year }}</h3>
            <h3>{{ history.year }}</h3>
            <h3>{{ history.year }}</h3>
            <h3>{{ history.year }}</h3>
            <h3>{{ history.year }}</h3>
        </div>

        <div class="content" v-for="(title, index) in history.title" :key="history.title">
            <h4>{{ title }}</h4>
            <p>{{ history.desc[index] }}</p>
            <div class="content-img">
                <div ref="imgFader" class="content-img-fader"></div>
                <img ref="contentImg" :src="history.src[index]" :title="history.alt[index]" :alt="history.alt[index]">
            </div>
            
        </div>
    </div>
</div>

<!-- <div class="background-img">
    <img src="@/assets/imgs/naomi-1.jpg">
</div> -->

    
</template>

<script setup>
import {ref, onMounted, inject} from 'vue';

const props = defineProps({
    historyObj: {
        type: Object,
        required: true,
    }
});

const isMobile = inject('isMobile'),
    gsapRepeatWords = inject('gsapRepeatWords');

let isViewing = ref([]);

let timelineMenu = ref(null),
    timelineMenuWidth = 0,
    historyContainer = ref(null),
    contentImg = ref(null),
    imgFader = ref(null);

let yearLink = ref(null),
    topLink = ref(null),
    historyTitle = ref(null);

let yellowArrow = ref(null),
    fontCurrent = ref(null);

let headerContainer = ref(null);

onMounted(() => {

    let observerThresh = 0; 
    if (isMobile){
        observerThresh = 0;
    } else{
        observerThresh = 1;
    }

    for (let i = 0; i < props.historyObj.length; i++){
        isViewing.value.push(false);
    }
    
    timelineMenuWidth = timelineMenu.value.offsetWidth;

    for (let i = 0; i < historyContainer.value.length; i++){
        console.log(timelineMenuWidth);
        historyContainer.value[i].style.paddingLeft = `${timelineMenuWidth}px`;
    }

    // Observer specifically for the history object TITLES
    let histObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // For every title that intersects, keep track of the index/order 
            // For the index of the titles, the same index of the TIMELINE menu toggles what's currently being intersected
            if (entry.isIntersecting){
                let intersectionIndex = Array.from(historyTitle.value).indexOf(entry.target);
                for (let i = 0; i < props.historyObj.length; i++){
                    if (i == intersectionIndex){
                        isViewing.value[i] = true;
                        yellowArrow = "var (--color-highlight)";
                        yearLink.value[i].style.fontSize = `clamp(14px, 6vw, 30px)`;
                        yearLink.value[i].style.color = "var(--color-accent)";
                        gsapRepeatWords(Array.from(headerContainer.value[i].children));
                    } else {
                        // For some reason, at index 3, this block of code gets triggered once while transitioning to another page
                        // Using try/catch to prevent an error from breaking site
                        try{
                            isViewing.value[i] = false;
                            yearLink.value[i].style.fontSize = `var(--fontSize-timeline-header)`;
                            yearLink.value[i].style.color = "var(--color-secondary)";
                        }
                        catch(err){
                            console.log(err);
                        }     
                    }
                }
            }
        })
    }, {threshold: observerThresh}); 
    historyTitle.value.forEach((title) => histObserver.observe(title)); 

    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting){
                try{
                    let intersectionIndex = Array.from(imgFader.value).indexOf(entry.target);
                    imgFader.value[intersectionIndex].style.height = 0;
                    imgFader.value[intersectionIndex].style.transform = `translateY(${0}px)`;
                    contentImg.value[intersectionIndex].style.transform = `translateY(${0}px)`;
                }
                catch(err){
                    console.log(err);
                }
                
            }
        })
    }, {threshold: 0.8});

    imgFader.value.forEach((fader) => observer.observe(fader));

    // // GSAP Stagger for headers
    // headerContainer.value.forEach((container) => 
    //     gsapRepeatWords(Array.from(container.children))  
    // );
})

</script>

<style scoped>
.history-container{
    display: flex;
}
.timeline-container{
    position: relative;
    background-color: gray;
    width: 10%;
}
.timeline-line{
    position: absolute;
    height: 100%;
    width: 5px;
    background-color: var(--color-secondary);
    top: 0;
    left: 100%;
    transform: translate(-100%, 0);
}
/*
 *
 *
 CONTENT CONTAINER
 This is where all the content from HistoryView.vue's object is displayed
*/
.header-container{
    position: relative;
    height: clamp(100px, 10vh, 200px);
}
.content-container{
    width: 90%;
    padding-inline: 50px;
    padding-bottom: 100px;
    text-align: left;
}
.content{
    display: grid;
    grid-template-areas: 
        "one two"
        "three two";
    gap: 50px;
    padding-block: 50px;
    /* max-width: 2000px; */
}
.content h4{
    grid-area: one;
}
.content p{
    width: clamp(100px, 100%, 1000px);
    grid-area: three;
}
.content-img{
    width: clamp(100px, 100%, 800px);
    grid-area: two;
    display: block;
    margin-inline: auto;
    position: relative;
}
.content-img img{
    /* width: clamp(400px, 80%, 800px); */
    width: 100%;
    height: 100%;
    transform: translateY(-100px);
    transition: 0.8s all ease;
    object-fit: cover;
}
.content-img-fader{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--color-bkg);
    transform: translateY(-100px);
    transition: 0.8s all ease;
    z-index: 1000;
}

@media only screen and (max-width: 768px){
    .content-container{
        padding-inline: unset;
        padding-left: 50px;
        padding-right: 10px;
    }
    .content{
        grid-template-areas: 
            "one"
            "four"
            "three"
            "two"
    }
}

.intro-circle{
    position: absolute;
    fill: var(--color-highlight);
    width: 100px;
    height: 100px;
    top: 50%;
    left: 100%;
    transform: translate(-100%, -50%);
}
.arrow-enter-active,
.arrow-leave-active{
    transition: all 0.3s ease;
}
.arrow-enter-from,
.arrow-leave-to{
    opacity: 0;
    transform: translateX(0px);
}

/*
 *
 *
 TIMELINE MENU
 */
.timeline-menu{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    padding-left: 25px;
    top: 2%;
    left: 0;
}
.timeline-menu ul{
    width: 100%;
}
.timeline-menu a{
    color: var(--color-secondary);
    transition: font-size 0.3s ease;
}
.timeline-menu a:hover{
    color: var(--color-accent);
    transition: color 0.3s ease;
}
.timeline-menu h5{
    font-size: var(--fontSize-timeline-title);
}
.timeline-menu li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    color: var(--color-secondary);
    font-size: var(--fontSize-p);
    padding-block: 10px;
}
.timeline-menu svg{
    transform: rotate(180deg) translateX(-25px);
    width: var(--fontSize-p);
}
.timeline-menu svg path{
    color: var(--color-highlight);
}

.header-container h3{
    position: absolute;
    color: var(--color-highlight);
}

@media only screen and (max-width: 768px){
    .timeline-menu{
        padding-left: 10px;
    }
}

.background-img{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -100;
}
.background-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.1;
}
</style>