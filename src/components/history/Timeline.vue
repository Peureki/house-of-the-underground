<template>
<!-- 
FOR PARENT COMPONENTS: 
NEED PROPS {{ title, object }}
let {{ object }} : [
    {
        section: merp,
        title: ["merp", "merp"],
        desc: ["merp merp", "merp merp"],
        src: ["require(@/merp/merp.jpg)", "require(@/merp/merp.jpg)"],
        alt: ["merp is being a merp", "merp is being a merp"]
    }
]
-->
<div class="timeline-menu" ref="timelineMenu">
    <!-- Title of the menu -->
    <h5>{{title}}</h5>
    <ul>
        <!-- 
            Create a list based on the amount of content from the {{ object }} prop 
            Save the index for the nested list
            Display the content.section
        -->
        <li v-for="(content, index) in object" :key="content.section" class="main-li">
            <a :href="`#${content.section}`" ref="sectionLink">{{ content.section}}</a>
            <!-- If there are more than 1 content.title, then create the nested list -->
            <ul v-if="content.title.length > 0">
                <!-- 
                    For every content.title, track the nested index
                    Display the titles under the sections paired with a svg arrow to display what users are currently seeing

                    index * content.title.length + subIndex gives an index for the amount of titles in an ordered list. i.e if there are 4 titles, but under 2 different sections, then there's an index of 0-3. 

                    Clicking the <a> and using the Intersection Observer func to make isViewing true
                -->
                <li v-for="(title, subIndex) in content.title" :key="title[subIndex]" class="content-menu-title" ref="contentMenuTitle">
                    <a :href="`#${addHyphens(title)}`" @click="showArrow(index * content.title.length + subIndex)">{{ title }}</a>
                    <Transition name="arrow"><svg v-show="isViewing[(index * content.title.length + subIndex)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144M392 256H100"/></svg></Transition>
                </li>
            </ul>
        </li>
    </ul>
</div>

<!-- MAIN content block-->
<div class="content-container" v-for="content in object" :key="content.section" ref="contentContainer">
    <div class="header-container" ref="headerContainer">
        <!-- 
            Show content.section as the main header
            Animate using gsapRepeatWords
        -->
        <h3 :id="content.section" ref="contentSection" class="content-section">{{ content.section }}</h3>
        <h3>{{ content.section }}</h3>
        <h3>{{ content.section }}</h3>
        <h3>{{ content.section }}</h3>
        <h3>{{ content.section }}</h3>
    </div>
    <!-- 
        Display the contents of each section title
        For every title, display the title and the desc at index, and the imgs paired with the alt at same [index]
    -->
    <div class="content" ref="content" v-for="(title, index) in content.title" :key="content.title">
        <h4 ref="contentTitle" class="content-title" :id="addHyphens(title)">{{ title }}</h4>
        <p>{{ content.desc[index] }}</p>
        <div class="content-img">
            <div ref="imgFader" class="content-img-fader"></div>
            <img ref="contentImg" :src="content.src[index]" :title="content.alt[index]" :alt="content.alt[index]">
        </div>
        
    </div>
</div>

<!-- <div class="background-img">
    <img src="@/assets/imgs/naomi-1.jpg">
</div> -->

    
</template>

<script setup>
import {ref, onMounted, inject, onUnmounted} from 'vue';

const props = defineProps({
    object: Object,
    title: String,
});

const isMobile = inject('isMobile'),
    gsapRepeatWords = inject('gsapRepeatWords'),
    addHyphens = inject('addHyphens');

let isViewing = ref([]);

let timelineMenu = ref(null),
    timelineMenuWidth = 0,
    contentContainer = ref(null),
    contentImg = ref(null),
    imgFader = ref(null);

let sectionLink = ref(null),
    content = ref(null),
    contentTitle = ref(null),
    contentSection = ref(null);

let headerContainer = ref(null);
// Amount of titles/sections in the timeline
let contentTitleLength = 0;

// Calculate how long the length of the amount of timeline titles/sections there are
for (let i = 0; i < props.object.length; i++){
    for (let j = 0; j < props.object[i].title.length; j++){
        contentTitleLength++;
    }
}

// @click for the <a> titles
// Display the svg arrow
// Set a timeout b/c when clicking the <a> and the page scrolls to the section, could mix up with the Intersection Observer
const showArrow = (arrowIndex) => {
    setTimeout(() => {
        for (let i = 0; i < contentTitleLength; i++){
            if (i == arrowIndex){
                isViewing.value[i] = true; 
            } else {
                isViewing.value[i] = false;
            }
        }
    }, 100);
}

const onWindowResize = () => {
    // For all the containers, apply a paddingLeft that is the same length as the timeline menu so it can approipiately never overlap
    for (let i = 0; i < contentContainer.value.length; i++){
        contentContainer.value[i].style.paddingLeft = `${timelineMenuWidth + 30}px`;
    }
}

onMounted(() => {

    window.addEventListener('resize', onWindowResize);
    

    let observerThresh = 0; 
    if (isMobile){
        observerThresh = 0;
    } else{
        observerThresh = 1;
    }

    for (let i = 0; i < props.object.length; i++){
        isViewing.value.push(false);
    }
    
    timelineMenuWidth = timelineMenu.value.offsetWidth;
    // For all the containers, apply a paddingLeft that is the same length as the timeline menu so it can approipiately never overlap
    for (let i = 0; i < contentContainer.value.length; i++){
        contentContainer.value[i].style.paddingLeft = `${timelineMenuWidth + 30}px`;
    }

    

    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting){
                // FOR IMAGE FADERS
                if (entry.target.className.includes('fader')){
                    try{
                        // Get the index of the current img fader being observed
                        // Height = 0, tranform to normal place
                        let intersectionIndex = Array.from(imgFader.value).indexOf(entry.target);
                        imgFader.value[intersectionIndex].style.height = 0;
                        imgFader.value[intersectionIndex].style.transform = `translateY(${0}px)`;
                        contentImg.value[intersectionIndex].style.transform = `translateY(${0}px)`;
                    }
                    catch(err){
                        console.log(err);
                    }
                }  
            }
        })
    }, {threshold: 0.8});
    // Observer specifically for having a very low threshold
    let immediateObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting){
                // FOR CONTENT TITLES FOR THE SIDE MENU
                if (entry.target.className.includes('content')){
                    // Get index of current title being observed
                    let intersectionIndex = Array.from(content.value).indexOf(entry.target);
                    // For every content title, if it matches the index, then do something
                    // else, every other is removed
                    for (let i = 0; i < contentTitleLength; i++){
                        if (i == intersectionIndex){
                            isViewing.value[i] = true;
                        } else {
                            isViewing.value[i] = false;
                        }
                    }
                }  
                // FOR CONTENT CONTAINER FOR THE BOTH SIDE MENU AND MAIN BLOCK
                if (entry.target.className.includes('content-container')){
                    let intersectionIndex = Array.from(contentContainer.value).indexOf(entry.target);
                    // Create for loop based on the amount of sections ( = length of object)
                    // If index matches => highlight section in the menu, animate sections
                    // Else => don't highlight section in menu
                    try {
                        for (let i = 0; i < props.object.length; i++){
                            if (i == intersectionIndex){
                                sectionLink.value[i].style.fontSize = `clamp(14px, 6vw, 30px)`;
                                sectionLink.value[i].style.color = "var(--color-accent)";
                                gsapRepeatWords(Array.from(headerContainer.value[i].children));
                            } else {
                                sectionLink.value[i].style.fontSize = `var(--fontSize-timeline-header)`;
                                sectionLink.value[i].style.color = "var(--color-secondary)";
                            }
                        }
                    } 
                    catch (err) {
                        console.log(err);
                    }
                    
                }
            }
        })
    }, {threshold: 0});
    // Init observers
    imgFader.value.forEach((fader) => observer.observe(fader));
    content.value.forEach((title) => immediateObserver.observe(title));
    contentContainer.value.forEach((container) => immediateObserver.observe(container));

    // // GSAP Stagger for headers
    // headerContainer.value.forEach((container) => 
    //     gsapRepeatWords(Array.from(container.children))  
    // );
})

onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize);
})
    


</script>

<style scoped>
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
    max-width: 200px;
}
.timeline-menu ul{
    width: 100%;
    text-align: left;
}
.timeline-menu .content-menu-title{
    font-size: var(--fontSize-timeline-subheader);
    padding-left: 20px;
    display: flex;
    align-items: center;
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
    list-style-type: none;
    color: var(--color-secondary);
    font-size: var(--fontSize-p);
    padding-block: 10px;
}
.timeline-menu svg{
    transform: rotate(180deg) translateX(-25px);
    width: var(--fontSize-p);
    min-width: 25px;
    position: absolute;
    right: 0;
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
        max-width: 75px;
    }
    .timeline-menu .content-menu-title{
        padding-left: 5px;
        line-height: 1.2;
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