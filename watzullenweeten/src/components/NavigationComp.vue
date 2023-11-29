<script setup lang="ts">
import { ref } from 'vue';

import iconHome from "../assets/images/home.svg";
import iconLab from "../assets/images/lab.svg";
import iconPlayground from "../assets/images/pallet.svg";


const activeState = ref(false)

</script>
<template>
    <!-- USING 2 properties - Data properties & Props properties
    Prop properties you can use with only the prop name {{ nameProp }}
    Data properties you need to call with the dot notation: by {{Object.propertiename}} -->    
<nav>
  <ul class="nav nav-pills">
    <li class="nav-item" :class="{ active: activeState }"><img alt="home" :src="iconHome"><router-link class="nav-link" aria-current="page" to="/mainpage">Main app</router-link></li>
    <li class="nav-item" :class="{ active: activeState }"><img alt="lab" :src="iconLab"><router-link class="nav-link" to="/labpage">Lab app</router-link></li>
    <li class="nav-item" :class="{ active: activeState }"><img alt="lab" :src="iconPlayground"><router-link class="nav-link" to="/playgroundpage">Playground</router-link></li>
  </ul>
  <div class="logo">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
</nav> 
</template>

<style scoped lang="scss">
.logo{

  margin-left: auto;
  align-content: center;
  flex-wrap: wrap;
  padding: 0;
  height: auto;
  display: none;
  @media only screen and (min-width: 768px) {
    display: flex;
      }

  img{
    width: auto;
    height: auto;
    padding: 1rem;
  }
}
 .nav, nav{
  display: flex;
  margin: 0px;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0px;
      flex-direction:column;
      @media only screen and (min-width: 768px) {
        flex-direction:row;
      }

  li{
    padding: 1rem;
    text-decoration: none;
    list-style: none;
    display: flex;
    
  }
  img{
    color:#35eb9a;
    width: 1rem;
  }
 }
       a{
        color: #f2f2f2;
         &.active,
         &.router-link-exact-active{
          color:#35eb9a
        }
        &.nav-link{
          padding: 0rem 1rem;
          line-height: 2rem;
          display: block;
          &:hover{
              color:#f2f2f2
          }
        } 
      }

  nav{
    .nav-item{
        &.active{
            a{
                color:#35eb9a
            }
        }
      }
  }
</style>

