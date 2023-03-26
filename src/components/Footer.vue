<template>
<div class="full-container">
    <div class="flex-header-n-repeat" ref="flexContainer">
        <div>
            <h3>See you on the</h3>
        </div>
        <div ref="repeatHeadersDiv" id="repeat-headers-div">
            <span><h3>Dance Floor</h3></span>
            <span><h3>Dance Floor</h3></span>
            <span><h3>Dance Floor</h3></span>
            <span><h3>Dance Floor</h3></span>
            <span><h3>Dance Floor</h3></span>
        </div>
    </div>
    <div class="footer-video">
        <div>
            <p>Created by Peu Web Design</p>
            <p>2023 All Rights Reserved - House of the Underground</p>
        </div>
        <video autoplay muted loop>
            <source src="@/assets/Videos/hotu-test.mp4" type="video/mp4">
        </video>
    </div>
</div>

</template>

<script setup>
import {ref, onMounted, inject} from 'vue';

let flexContainer = ref(null),
    repeatHeadersDiv = ref(null);

const gsapRepeatWords = inject('gsapRepeatWords');

onMounted(() => {
    let repeatHeaders = Array.from(repeatHeadersDiv.value.children);

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

<style scoped>
#repeat-headers-div span h3{
    white-space: nowrap;
    color: var(--color-highlight);
}
.footer-video{
    position: absolute;
    display: flex;
    align-items: flex-end;
    top: 0;
    width: 100%;
    height: 90%;
}
.footer-video > div{
    width: 30%;
    text-align: left;
    padding-inline: 50px;
}
.footer-video video{
    position: absolute;
    bottom: 0%;
    right: 0;
    z-index: -1;
    width: 70%;
    height: 70%;
}
@media only screen and (max-width: 786px){
    .full-container{
        margin-top: 300px;
    }
    .footer-video{
        flex-direction: column-reverse;
        height: 80%;
        align-items: center;
    }
    .footer-video > div{
        width: 70%;
        padding-top: 50px;
    }
    .footer-video video{
        position: unset;
        height: 50%;
    }
}

</style>