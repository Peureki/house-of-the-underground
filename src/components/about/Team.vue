<template>
<div class="full-container" ref="fullContainer">
    <div class="fixed-img">
        <div class="img-container">
            <Transition name="spin"><img v-if="toggleFirst" src="@/assets/imgs/mama-1.jpg"></Transition>
            <Transition name="spin"><img v-if="toggleSecond" src="@/assets/imgs/peu-1.jpg"></Transition>
            <Transition name="spin"><img v-if="toggleThird" src="@/assets/imgs/daisie-1.jpg"></Transition>
            <Transition name="spin"><img v-if="toggleFourth" src="@/assets/imgs/grin-1.jpg"></Transition>
        </div>
        <div class="team-desc-container" ref="teamDescContainer">
            <div class="team-desc" id="team-1">
                <h3>Mama Tempa</h3>
                <h4>Leader</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <div class="social-media-group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="instagram-icon" viewBox="0 0 512 512"><path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"/><path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"/></svg>
                    <p>mama.tempa</p>
                </div>
                
            </div>
            <div class="team-desc" id="team-2">
                <h3>Peurekii</h3>
                <h4>Leader</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <div class="social-media-group">
                    <a href="https://www.instagram.com/peurekii/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" class="instagram-icon" viewBox="0 0 512 512"><path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"/><path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"/></svg>
                        
                    </a>
                    <a href="https://www.instagram.com/peurekii/" target="_blank"><p>peurekii</p></a>
                </div>
            </div>
            <div class="team-desc" id="team-3">
                <h3>Daisie</h3>
                <h4>Leader</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <div class="social-media-group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="instagram-icon" viewBox="0 0 512 512"><path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"/><path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"/></svg>
                    <p>daisielavish</p>
                </div>
            </div>
            <div class="team-desc" id="team-4">
                <h3>Grinzler</h3>
                <h4>Leader</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <div class="social-media-group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="instagram-icon" viewBox="0 0 512 512"><path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"/><path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"/></svg>
                    <p>grinzler</p>
                    <button>Send Jeff a plate</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import {ref, onMounted, inject} from 'vue';

let fullContainer = ref(null),
    toggleFirst = ref(true),
    toggleSecond = ref(true),
    toggleThird = ref(true),
    toggleFourth = ref(true);

let teamDescContainer = ref(null);


onMounted(() => {
    // Get array from team container
    let teamDescSections = Array.from(teamDescContainer.value.children);
    // Observe each team desc
    // When users reach a particular team's desc, change the toggle to true/false to show/remove respective team member
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting){
                if (entry.target.id.includes('1')){
                    console.log('first');
                    toggleFirst.value = true; 
                    toggleSecond.value = true; 
                    toggleThird.value = true; 
                    toggleFourth.value = true; 
                }
                if (entry.target.id.includes('2')){
                    console.log('second');
                    toggleFirst.value = false; 
                    toggleSecond.value = true; 
                    toggleThird.value = true; 
                    toggleFourth.value = true; 
                }
                if (entry.target.id.includes('3')){
                    console.log('third');
                    toggleFirst.value = false; 
                    toggleSecond.value = false; 
                    toggleThird.value = true; 
                    toggleFourth.value = true; 
                }
                if (entry.target.id.includes('4')){
                    console.log('fourth');
                    toggleFirst.value = false; 
                    toggleSecond.value = false; 
                    toggleThird.value = false; 
                    toggleFourth.value = true; 
                }
            }
        })
    }, {threshold: 0.2})
    teamDescSections.forEach((el) => observer.observe(el));
})

</script>


<style scoped>
.full-container{
    height: 500vh;
    padding-top: 50vh;
}
.fixed-img{
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 100%;
}
.team-desc-container{
    width: 50%;
}
.team-desc{
    text-align: left;
    padding-inline: 50px;
    height: 25%;
}
.team-desc > *{
    padding-block: 20px;
}
.team-desc h3{
    color: var(--color-highlight);
}
.social-media-group{
    display: flex;
    align-items: center;
}
.instagram-icon{
    width: 50px;
    fill: var(--color-accent);
}
.social-media-group p{
    padding-inline: 10px;
    color: var(--color-accent);
}
.img-container{
    position: sticky;
    top: 50%;
    width: 40%;
    height: 80vh;
    transform: translateY(-50%);
}
.fixed-img img{
    width: 100%;
    max-width: 1000px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 10%;
    object-fit: cover;
}
.fixed-img img{
    transition: all 0.7s ease;
}
.fixed-img img:not(:first-child){
    transform: rotate(-5deg);
}
.fixed-img img:nth-child(1){
    z-index: -1;
}
.fixed-img img:nth-child(2){
    z-index: -2;
}
.fixed-img img:nth-child(3){
    z-index: -3;
}
.fixed-img img:nth-child(4){
    z-index: -4;
}
.spin-enter-active,
.spin-leave-active{
    transition: all 2s ease;
}
.spin-enter-from,
.spin-leave-to{
    opacity: 0;
    transform: translateX(-1000px) rotate(-180deg);
}
@media only screen and (max-width: 768px){
    .full-container{
        padding-top: unset;
        height: unset;
    }
    .fixed-img{
        flex-direction: column;
    }
    .img-container{
        width: 100%;
        height: 30vh;
        top: 0%;
        margin-bottom: 100px;
        transform: unset;
        display: block;
        margin-inline: auto;
        background-color: var(--color-bkg);
    }
    .img-container img{
        width: 80%;
        top: 10%;
    }
    .team-desc-container{
        width: 100%;
    }
    .team-desc{
        border-bottom: 1px solid var(--color-secondary);
    }
    .instagram-icon{
        width: 30px;
    }
}
</style>