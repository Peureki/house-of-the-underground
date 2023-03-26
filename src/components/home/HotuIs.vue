<template>
    <div class="full-container">
        <div class="flex-column" ref="flexColumn">
            <h3 class="top-header">House of the</h3>
            <!-- Animate the rest -->
            <h3 class="top-header">House of the</h3>
            <h3 class="top-header">House of the</h3>
            <h3 class="top-header">House of the</h3>
            <h3 class="top-header">House of the</h3>
            <!-- x animation -->
            <h3 class="top-header">House of the</h3>
            <h3 class="top-header">House of the</h3>
            <h3 class="top-header">House of the</h3>
            <h3 class="top-header">House of the</h3>
            <p class="middle-p" ref="middleP">is a movement of collections curating for different projects under one house. Orchestrated by several leaders/mentors to make the house functional. Representing the old & new generation of shufflers. Prioritizing the underground scene/aesthetics of shuffle culture.</p>
            <h3 class="bottom-header">Underground</h3>
            <h3 class="bottom-header">Underground</h3>
            <h3 class="bottom-header">Underground</h3>
            <h3 class="bottom-header">Underground</h3>
            <h3 class="bottom-header">Underground</h3>

            
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, inject} from 'vue';

const gsapRepeatWords = inject('gsapRepeatWords');

let flexColumn = ref(null),
    middleP = ref(null);

onMounted(() => {
    let topHeaders = document.querySelectorAll('.top-header'),
        bottomHeaders = document.querySelectorAll('.bottom-header');
    
    // Observer the whole div of this component
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Aniamte headers
            if (entry.target.className == "flex-column"){
                if (entry.isIntersecting){
                    gsapRepeatWords(topHeaders);
                    gsapRepeatWords(bottomHeaders);
                }
            }
            // Animate p 
            if (entry.target.className == "middle-p"){
                if(entry.isIntersecting){
                    entry.target.classList.add('observer-fade');
                }
            }
        })
    }, {threshold: 0.7})
    observer.observe(flexColumn.value);
    observer.observe(middleP.value);

})

</script>

<style>
.flex-column{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
}
.flex-column h3{
    position: absolute;
    color: var(--color-highlight)
}
.top-header{
    top: 25%;
    /* transform: translateY(-25%); */
}
.middle-p{
    position: absolute;
    text-align: left;
    width: 50%;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
}
.bottom-header{
    top: 75%;
    /* transform: translateY(-75%); */
}
/*
 *
 *
 *
 Observer transitions
 */
 .observer-fade{
  opacity: 1;
  transition: 1s opacity ease;
}
@media only screen and (max-width: 768px){
    .middle-p{
        width: 90%;
    }
}
</style>