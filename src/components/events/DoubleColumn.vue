<template>
<div class="double-col-container">
    <div class="left-col-container">
        <div ref="pageTitles">
            <h3>{{ pageTitle }}</h3>
            <h3>{{ pageTitle }}</h3>
            <h3>{{ pageTitle }}</h3>
            <h3>{{ pageTitle }}</h3>
            <h3>{{ pageTitle }}</h3>
        </div>

        <div class="event-list">
            <div class="event-box">
                <div class="event-lines">
                    <svg height="5" width="100%">
                        <line x1="0" y1="0" x2="100%" y2="0" stroke-width="5"></line>
                    </svg>

                    <svg height="100%" width="5">
                        <line x1="0" y1="0" x2="0" y2="50%" stroke-width="5"></line>
                    </svg>

                    <svg height="5" width="100%">
                        <line x1="100%" y1="100%" x2="0" y2="100%" stroke-width="5"></line>
                    </svg>

                    <svg height="100%" width="5">
                        <line x1="100%" y1="100%" x2="100%" y2="50%" stroke-width="5"></line>
                    </svg>
                </div>
                

                <div class="event-desc">
                    <h4>Event Title</h4>
                    <div class="event-info">
                        <p>02/27/23</p>
                        <p>10:00pm</p>
                    </div>
                </div>
            </div>

            <div class="event-box">
                <div class="event-lines">
                    <svg height="5" width="100%">
                        <line x1="0" y1="0" x2="100%" y2="0" stroke-width="5"></line>
                    </svg>

                    <svg height="100%" width="5">
                        <line x1="0" y1="0" x2="0" y2="50%" stroke-width="5"></line>
                    </svg>

                    <svg height="5" width="100%">
                        <line x1="100%" y1="100%" x2="0" y2="100%" stroke-width="5"></line>
                    </svg>

                    <svg height="100%" width="5">
                        <line x1="100%" y1="100%" x2="100%" y2="50%" stroke-width="5"></line>
                    </svg>
                </div>
                

                <div class="event-desc">
                    <h4>Event Title</h4>
                    <div class="event-info">
                        <p>02/27/23</p>
                        <p>10:00pm</p>
                    </div>
                </div>
            </div>


        </div>
        
    </div>


    <div class="right-col-container">

    </div>
</div>

</template>

<script setup>
import { ref, defineProps, inject, onMounted } from 'vue';

const props = defineProps({
    pageTitle: String,
});

let pageTitles = ref(null);

const gsapRepeatWords = inject('gsapRepeatWords');

onMounted(() => {
    gsapRepeatWords(Array.from(pageTitles.value.children));
})


</script>

<style>
.double-col-container{
    display: flex;
    position: relative;
}
.left-col-container, .right-col-container{
    width: 50%;
    position: relative;
    border: 2px solid white;
}
.left-col-container h3{
    position: absolute;
    top: 5%;
    left: 5%;
}
.event-list{
    display: flex;
    flex-direction: column;
    transform: translateY(200px);
}
.event-box{
    margin-left: 5%;
    margin-block: 20px;
    position: relative;
    width: 90%;
    cursor: pointer;
    transition: 0.3s all ease;
}
.event-box:hover{
    background-color: var(--color-accent);
    transition: 0.3s all ease;
}
.event-box:hover h4, .event-box:hover p{
    color: black;
    transition: 0.3s all ease;
}
.event-box svg{
    position: absolute;
    top: 0;
    left: 0;
}
.event-lines line{
    stroke: var(--color-secondary);
    transition: 0.3s all ease;
}
.event-box:hover .event-lines line{
    stroke: var(--color-accent);
    transition: 0.3s all ease;
}

</style>