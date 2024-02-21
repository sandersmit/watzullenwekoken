<script setup lang="ts">
import { ref, onMounted } from 'vue';

import iconHome from "../assets/images/home.svg";
import iconLab from "../assets/images/lab.svg";
import iconPlayground from "../assets/images/pallet.svg";
import WaiCheckBoxComp from "../components/forms/WaiCheckBoxComp.vue";
// import FilterCheckboxComp from '../components/forms/FilterCheckboxComp.vue';

const activeState = ref(false)
//emited values
const checkboxvalue = ref()
const checkboxname = ref()


//METHODS
function emitCheckboxValue(argument) {
            //console.log(`emited argument is : ${argument.thisSelected},${argument.thisCheckboxName} from ,custom event: emitCheckboxValue
            //,triggerd by the child component to parent component`)
            checkboxvalue.value = argument.chkbool
            checkboxname.value = argument.chkname
            const element = document.querySelector("body");
            if(argument.chkname === "WAI"){
              element.classList.toggle("wai");
            }
            else{
              element.classList.toggle("DARKMODE");
            }
           
            
          }
function addEventWai() {
          const customSwitch = document.querySelector(".switch");
          customSwitch.addEventListener("keydown", (event) => {
              if (event.keyCode === 13) {
                event.target.click();
              }
          });
        }
          onMounted(() => {
            addEventWai()
          })
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
  <wai-check-box-comp ref="checkboxElRef" class="mx-4" :check-id-prop="100" :key="0" :checkbox-value-prop="`wai`" @emit-checkbox-value="emitCheckboxValue" :checkbox-name-prop="'WAI'">
  </wai-check-box-comp>
  <!-- <wai-check-box-comp class="mx-4" :check-id-prop="101" :key="1" :checkbox-value-prop="`darkmode`" @emit-checkbox-value="emitCheckboxValue" :checkbox-name-prop="'Darkmode'">
  </wai-check-box-comp> -->
 
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
    flex-direction: row;
    flex-wrap: nowrap;
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
      display: none;
      @media only screen and (min-width: 768px) {
        flex-direction:row;
        display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
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

