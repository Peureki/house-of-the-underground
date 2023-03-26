<template>
    <div class="full-container-3x">
        <div class="flex-header-n-repeat" ref="flexContainer">
            <div>
                <h3>Learn the</h3>
            </div>
            <div ref="repeatHeadersDiv">
                <span class="header-highlight"><h3>Movement</h3></span>
                <span class="header-highlight"><h3>Movement</h3></span>
                <span class="header-highlight"><h3>Movement</h3></span>
                <span class="header-highlight"><h3>Movement</h3></span>
                <span class="header-highlight"><h3>Movement</h3></span>
            </div>
        </div>
        <div class="flex-learn">
            <div class="sticky-buttons">
                <div class="sticky-div">
                    <router-link to="/about">
                        <button ref="stickyButton1" @mouseover="hoverStickyButton($refs.stickyButton1)" @mouseleave="hoverOutStickyButton($refs.stickyButton1)">
                            <span>→</span>About Us<span>←</span>
                        </button>
                    </router-link>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div class="sticky-div">
                    <router-link to="/timeline">
                        <button ref="stickyButton2" @mouseover="hoverStickyButton($refs.stickyButton2)" @mouseleave="hoverOutStickyButton($refs.stickyButton2)">
                            <span>→</span>History<span>←</span>
                        </button>
                    </router-link>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div class="sticky-div">
                    <router-link to="/events">
                        <button ref="stickyButton3" @mouseover="hoverStickyButton($refs.stickyButton3)" @mouseleave="hoverOutStickyButton($refs.stickyButton3)">
                            <span>→</span>Events<span>←</span>
                        </button>
                    </router-link>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div class="sticky-div">
                    <router-link to="/collections">
                        <button ref="stickyButton4" @mouseover="hoverStickyButton($refs.stickyButton4)" @mouseleave="hoverOutStickyButton($refs.stickyButton4)">
                            <span>→</span>Collections<span>←</span>
                        </button>
                    </router-link>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div class="sticky-div">
                    <router-link to="/shuffle">
                        <button ref="stickyButton5" @mouseover="hoverStickyButton($refs.stickyButton5)" @mouseleave="hoverOutStickyButton($refs.stickyButton5)">
                            <span>→</span>Shuffling<span>←</span>
                        </button>
                    </router-link>    
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            </div>
        </div>
    </div>   
</template>

<script setup>
import {ref, onMounted, inject} from 'vue';

let flexContainer = ref(null),
    repeatHeadersDiv = ref(null),
    repeatHeaders = ref(null),
    hoverContent = ref(null);


const hoverStickyButton = (button) => {
    hoverContent.value = Array.from(button.getElementsByTagName('span'));
    hoverContent.value.forEach((el) => {
        el.style.opacity = 1;
        el.style.paddingInline = `${10}px`;
    })
}
const hoverOutStickyButton = (button) => {
    hoverContent.value = Array.from(button.getElementsByTagName('span'));
    hoverContent.value.forEach((el) => {
        el.style.opacity = 0;
        el.style.paddingInline = `${50}px`;
    })
}

const gsapRepeatWords = inject('gsapRepeatWords');

onMounted(() => {
    // Get span tags into array from HTML collection
    repeatHeaders = Array.from(repeatHeadersDiv.value.children);

    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting){
                gsapRepeatWords(repeatHeaders);
            }
        })
    }, {threshold: 1})
    observer.observe(flexContainer.value);

    

    
})

</script>

<style>
.flex-header-n-repeat{
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    width: 100%;
    position: sticky;
    top: 10%;
    margin-top: 500px;
}
/* Makes it look like the headers are in one element */
.flex-header-n-repeat > div:nth-child(1){
    padding-right: 1.7rem;
}
.flex-header-n-repeat span:not(:first-child){
    position: absolute; 
    transform: translate(-50%, 0);
    top: 0;
}
.flex-learn{
    display: flex;
    margin-top: 300px;
    position: relative;
    height: 100%;
}
.sticky-buttons{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: 100%;
}
.sticky-div{
    position: sticky;
    width: 100%;
    height: 20%;
    top: 0;
    background-color: var(--color-bkg);
}
.sticky-div button{
    font-size: var(--fontSize-h5);
    padding: 0;
    width: 75%;
}
.sticky-div p{
    padding-top: 50px;
    width: 75%;
    text-align: left;
    display: block;
    margin: auto;
}
.sticky-div:nth-child(1){
    top: 35%;
    z-index: 1;
}
.sticky-div:nth-child(2){
    top: calc(35% + 83px);
    z-index: 2;
}
.sticky-div:nth-child(3){
    top: calc(35% + 164px);
    z-index: 3;
}
.sticky-div:nth-child(4){
    top: calc(35% + 249px);
    z-index: 4;
}
.sticky-div:nth-child(5){
    top: calc(35% + 332px);
    z-index: 5;
}
.sticky-div span{
    display: inline-block;
    opacity: 0;
    padding-inline: 50px;
    transition: 0.5s all ease;
}
@media only screen and (max-width: 768px){
    .flex-header-n-repeat{
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-top: 0px;
    }
    .flex-header-n-repeat > div:nth-child(1){
        padding-right: 0;
    }
    .sticky-div:nth-child(1){
        top: 10%;
    }
    .sticky-div:nth-child(2){
        top: calc(10% + 50px);
    }
    .sticky-div:nth-child(3){
        top: calc(10% + 100px);
    }
    .sticky-div:nth-child(4){
        top: calc(10% + 150px);
    }
    .sticky-div:nth-child(5){
        top: calc(10% + 200px);
    }
    .sticky-div span{
        display: none;
    }
}
</style>