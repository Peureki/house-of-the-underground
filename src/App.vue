<template>
  <nav>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/history">History</router-link>
      <router-link to="/shuffle">Shuffle</router-link>
      <router-link to="/events">Events</router-link>
      <router-link to="/collections">Collections</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
    <div class="nav-button">
      <a href="#"><button>Join the Movement</button></a>
    </div>
    
  </nav>
  <!-- <router-view/> -->
  <router-view v-slot="{Component}">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup>
import { ref, provide } from 'vue';
import { gsap } from 'gsap';

// Check if screen is mobile size or not
// Inject isMobile to other child components if needed
const isMobile = ref(false);
window.innerWidth <= 768 ? isMobile.value = true : isMobile.value = false; 

const gsapRepeatWords = (words) => {
  let gsapStagger = 0,
      gsapOpacity = 0; 

  for (let i = 1; i < words.length; i++){
    if (i < 3){
      gsapStagger = 100;
      gsapOpacity = 0.2;

      if (isMobile.value){
        gsapStagger = 50;
      }
    } else if (i >= 3){
      gsapStagger = 200;
      gsapOpacity = 0.1;

      if (isMobile.value){
        gsapStagger = 100;
      }
    }
    if (i % 2 == 0){
      //even
      gsap.to(words[i], {
        y: gsapStagger,
        duration: 2,
        opacity: gsapOpacity,
        ease: "power3"
      });
  } else {
      // odd
      gsap.to(words[i], {
        y: -gsapStagger,
        duration: 2,
        opacity: gsapOpacity,
        ease: "power3"
      });
    }
  }
}
const scrollToTop = () => {
  window.scrollTo(0,0);
}

const addHyphens = (str) => {
  return str.replace(/\s+/g, "-");
}

provide('isMobile', isMobile);
provide('gsapRepeatWords', gsapRepeatWords);
provide('addHyphens', addHyphens);



</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Doppio+One&family=Koulen&display=swap');

html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}
html,body
{
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    /* overflow-x: hidden;  */
}
html{
  overflow-x: hidden;
}

body {
    font-family: var(--font-family-p);
    position: relative;
    background-color: var(--color-bkg);
    color: var(--color-secondary);
    line-height:1;
}
p{
    line-height: 1.5;
    font-size: var(--fontSize-p);
    color: var(--color-secondary);
}

article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section {
    display:block;
}

nav ul {
    list-style:none;
}

blockquote, q {
    quotes:none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content:'';
    content:none;
}

a {
    margin:0;
    padding:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
    text-decoration: none;
}

/* change colours to suit your needs */
ins {
    background-color:#ff9;
    color:#000;
    text-decoration:none;
}

/* change colours to suit your needs */
mark {
    background-color:#ff9;
    color:#000;
    font-style:italic;
    font-weight:bold;
}

del {
    text-decoration: line-through;
}

abbr[title], dfn[title] {
    border-bottom:1px dotted;
    cursor:help;
}

table {
    border-collapse:collapse;
    border-spacing:0;
}

/* change border colour to suit your needs */
hr {
    display:block;
    height:1px;
    border:0;  
    border-top:1px solid #cccccc;
    margin:1em 0;
    padding:0;
}

input, select {
    vertical-align:middle;
}
h1, h2, h3, h4, h5{
  font-family: var(--font-family-h);
  color: var(--color-secondary);
  font-weight: lighter;
  text-align: left;
}
h1{
  font-size: var(--fontSize-h1);
  letter-spacing: 1rem;
}
h2{
  font-size: var(--fontSize-h2);
}
h3{
  font-size: var(--fontSize-h3);
}
h4{
  font-size: var(--fontSize-h4);
}
h5{
  font-size: var(--fontSize-h5);
}
.header-highlight h3{
  color: var(--color-highlight);
}


#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-secondary);
  background-color: var(--color-bkg);
  padding: 10px;
  z-index: 10000;
}
nav a {
  color: var(--color-secondary);
  font-family: var(--font-family-h);
  font-size: var(--fontSize-p);
  padding-inline: 20px;
}
nav button{
  margin-right: 50px;
}
button{
  font-family: var(--font-family-h);
  font-size: var(--fontSize-p);
  padding: 5px;
  background-color: var(--color-accent);
  border: none;
  cursor: pointer;
}

nav a.router-link-exact-active {
  color: var(--color-accent);
}

.full-container{
    position: relative;
    width: 100%;
    height: 100vh;
}
.full-container-3x{
  position: relative;
  height: 300vh;
  padding-inline: 50px;
  padding-bottom: 25vh;
}
/*
 *
 *
 ROUTE TRANSITIONS
 *
 *
 */
.route-enter-from{
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active{
  transition: all 0.3s ease; 
}
.route-leave-to{
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active{
  transition: all 0.3s ease;
}

:root{
  --font-family-h: 'Koulen', cursive;
  --font-family-p: 'Doppio One', sans-serif;

  --color-bkg: #010313;
  --color-primary: #010313;
  --color-secondary: #FFFFFF; 
  /* --color-accent: #f6ea00; */
  --color-accent: #27e96a;
  --color-highlight: #f6ea00;
  /* --color-accent: #f7a000; */
  /* --color-accent: #640fa3; */
  --color-gray: #34352f;

  --fontSize-h1: clamp(200px, 50vw, 1200px);
  --fontSize-h2: clamp(75px, 15vw, 500px);
  --fontSize-h3: clamp(50px, 10vw, 100px);
  --fontSize-h4: clamp(40px, 8vw, 60px);
  --fontSize-h5: clamp(30px, 7vw, 40px);
  --fontSize-p: clamp(16px, 3vw, 20px);
  --fontSize-timeline-title: clamp(15px, 6vw, 40px);
  --fontSize-timeline-header: clamp(14px, 4vw, 20px);
  --fontSize-timeline-subheader: clamp(13px, 1.5vw, 16px);

  --svg-arrow-size: clamp(30px, 5vw, 50px);
}
</style>
