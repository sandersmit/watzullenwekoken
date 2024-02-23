<script setup lang="ts">
import { ref, onMounted } from 'vue';

import iconHome from "../assets/images/home.svg";
import iconLab from "../assets/images/lab.svg";
import iconPlayground from "../assets/images/pallet.svg";
import WaiCheckBoxComp from "../components/forms/WaiCheckBoxComp.vue";

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
  if (argument.chkname === "WAI") {
    element.classList.toggle("wai");
  }
  else {
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
  <!-- comming darkmode feature -->
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

<!-- <style scoped lang="scss">
</style> -->

