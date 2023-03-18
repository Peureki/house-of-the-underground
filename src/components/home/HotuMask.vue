<template>
    <div class="full-container" ref="heroContainer">
        <svg>
            <mask id="mask">
                <rect id="inner-rect" :width="rectW" :height="rectH" />
                <text x="50%" y="50%">HOTU</text>
                <circle v-if="isMobile" cx="50%" cy="50%" :r="circleR"/>
                <circle v-else :cx="circleX" :cy="circleY" :r="circleR"/>
            </mask>
            <rect id="masked" :width="rectW" :height="rectH"/>
        </svg>

        <div class="video-container">
            <video autoplay muted loop>
                <source src="@/assets/Videos/hotu-test.mp4" type="video/mp4">
            </video>
        </div>

        <div class="settings">
            <div class="drag-line" ref="dragLine">
                <div class="circle" @mousemove.prevent="mouseDrag" @mouseleave="removeTooltip" @touchmove.passive="touchDrag" @touchend="removeTooltip" ref="dragCircle"></div>
            </div>

            <div class="tooltip" ref="tooltip">
                <p>{{ displayCircleR }}%</p>
            </div>

        </div>

    </div>
</template>

<script>
import { ref, onMounted, inject} from 'vue';

export default{
    props: ['isMobile'],
    setup(){
        let rectW = ref(window.innerWidth),
            rectH = ref(window.innerHeight),
            circleX = ref(0),
            circleY = ref(0),
            circleR = ref(0);

        let halfWindowW = ref(window.innerWidth/2);

        let heroContainer = ref(null),
            tooltip = ref(null);

        let dragCircle = ref(null),
            dragLine = ref(null);
        // Initial circle mask radius
        let displayCircleR = ref(15);

        // Init values for circle mask
        let percent = 0,
            lineValue = 0;

        const isMobile = inject('isMobile');

        // When mouse is over the div circle, users can 'drag' (not really drag, but can move the circle) to scale the circlular mask
        let mouseDrag = (e) => {
            // Move the circle with the mouse position
            dragCircle.value.style.left = `${e.clientX-10}px`;
            tooltip.value.style.left = `${e.clientX+10}px`;
            tooltip.value.style.opacity = 1;
            // lineValue is to track the int progress of the scroll
            lineValue = e.clientX;
            // Prevent the circle from going beyond scope (div is only width: 50%)
            if (e.clientX >= halfWindowW.value){
                dragCircle.value.style.left = `${halfWindowW.value}px`;
                lineValue = halfWindowW.value;
            }
            // Prevent the circle from going neg
            if (e.clientX <= 0){
                dragCircle.value.style.left = `0px`;
            }
            // Take the linevalue/size of the scroll bar and use the % as the size of the circular mask
            percent = lineValue/halfWindowW.value;
            displayCircleR.value = Math.floor(percent*100);
            circleR.value = `${displayCircleR.value}%`;
        }

        let removeTooltip = () => {
            tooltip.value.style.opacity = 0;
        }

        // MOBILE
        // Documentation is similar to above
        let touchDrag = (e) => {
            dragCircle.value.style.left = `${e.changedTouches[0].clientX}px`;
            lineValue = e.changedTouches[0].clientX;
            tooltip.value.style.opacity = 1;

            if (e.changedTouches[0].clientX >= halfWindowW.value){
                dragCircle.value.style.left = `${halfWindowW.value}px`;
                lineValue = halfWindowW.value;
            }
            if (e.changedTouches[0].clientX <= 0){
                dragCircle.value.style.left = '0px';
                lineValue = 0;
            }
            percent = lineValue/halfWindowW.value;
            displayCircleR.value = Math.floor(percent*100);
            circleR.value = `${displayCircleR.value}%`;
        }


        onMounted(() => {
            // On window resize, change the width of the svg rect to match the current size of the window
            // Withouth, the svg rect is the size of what was first loaded in and does not change
            window.addEventListener('resize', (e) => {
                rectW.value = e.target.innerWidth;
                rectH.value = e.target.innerHeight;

                halfWindowW.value = window.innerWidth/2;
            });

            heroContainer.value.addEventListener('mousemove', (e) => {
                circleX.value = e.clientX;
                circleY.value = e.clientY;
            })
            heroContainer.value.addEventListener('mouseenter', () => circleR.value = `${displayCircleR.value}%`);
            heroContainer.value.addEventListener('mouseleave', () => circleR.value = 0);

            
        });

        return {onMounted, rectW, rectH, heroContainer, tooltip,
            circleX, circleY, circleR, displayCircleR,
            halfWindowW,
            dragCircle, dragLine,
            mouseDrag, removeTooltip, touchDrag, isMobile};
    }
}

</script>

<style>

svg {
  width: 100%;
  height: 100%;
}
svg text{
    font-size: var(--fontSize-h1);
    font-family: var(--font-family-h);
    fill: var(--color-bkg);
    text-anchor: middle;
    dominant-baseline: middle;
    transform: translate(-1%, 4.5%);
}
svg circle{
    transition: 0.5s r ease;
}
#inner-rect{
    fill: var(--color-secondary);
}
#masked{
    mask: url(#mask);
    fill: var(--color-bkg);
}
.video-container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 95%;
    height: 95%;
    z-index: -1;
}
video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.title-words{
    position: absolute;
}
.title-words p{
    font-family: var(--font-family-h);
}
.hover-test{
    position: absolute;
}
.settings{
    width: 100%;
    position: absolute;
    top: 90%;
    transform: translateY(-90%);
}
.drag-line{
    width: 50%;
    height: 2px;
    background-color: white;
    position: relative;
}
.circle{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--color-accent);
    position: absolute;
    top: 50%;
    left: 15%;
    transform:translate(-15%, -50%);
    cursor: grab;
    z-index: 1000;
    transition: 0.5s width ease, 0.5s height ease;
}
.circle:hover{
    width: 100px;
    height: 100px;
}
.tooltip{
    width: fit-content;
    position: absolute;
    top: -75px;
    opacity: 0;
    transition: 0.5s opacity ease;
}
@media only screen and (max-width: 768px){
    svg text{
        writing-mode: vertical-rl;
        text-orientation: upright;
        letter-spacing: -7rem;
        font-size: 150px;
        transform: translateY(-10%);
    }
    .settings{
        top: 85%;
        transform: translateY(-85%);
    }
    .tooltip{
        top: -13px;
        left: 60%;
    }
}
</style>