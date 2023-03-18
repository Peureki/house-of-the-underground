<template>
  <nav>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/timeline">Timeline</router-link>
      <router-link to="/shuffle">Shuffle</router-link>
      <router-link to="/events">Events</router-link>
      <router-link to="/collections">Collections</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
    <div class="nav-button">
      <a href="#"><button>Join the Movement</button></a>
    </div>
    
  </nav>
  <router-view/>
</template>

<script>
import { ref, provide } from 'vue';

export default{
  setup(){
    // Check if screen is mobile size or not
    // Inject isMobile to other child components if needed
    const isMobile = ref(false);
    window.innerWidth <= 768 ? isMobile.value = true : isMobile.value = false; 

    provide('isMobile', isMobile);

    return {isMobile}
  }
}

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
    scroll-behavior: smooth;
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


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
  padding: 10px;
  z-index: 1000;
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
}

nav a.router-link-exact-active {
  color: var(--color-accent);
}

.full-container{
    position: relative;
    width: 100%;
    height: 100vh;
}
:root{
  --font-family-h: 'Koulen', cursive;
  --font-family-p: 'Doppio One', sans-serif;

  --color-bkg: #010313;
  --color-primary: #010313;
  --color-secondary: #FFFFFF; 
  /* --color-accent: #f6ea00; */
  --color-accent: #27e96a;
  /* --color-accent: #f7a000; */
  /* --color-accent: #640fa3; */
  --color-gray: #34352f;

  --fontSize-h1: clamp(200px, 50vw, 1200px);
  --fontSize-h2: clamp(50px, 30vw, 200px);
  --fontSize-h3: clamp(30px, 15vw, 100px);
  --fontSize-p: clamp(16px, 5vw, 20px);
}
</style>
