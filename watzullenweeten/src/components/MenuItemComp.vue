<script setup lang="ts">
import { reactive,computed,defineProps,ref, watch, onMounted } from "vue";
import gsap from 'gsap'

import { useFoodStore } from '../stores/Foodstore';
import { storeToRefs } from "pinia"; 


import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

// defineProps<{ msg: string }>()
//Make Vue aware of the props
//use them with the this.propname - in the whole component. 
//write them with CAMEL case --and use them in the html with DASH - 
//To replace option : props{} 
const props =  defineProps({
    msg: {
        type: String,
        default: "Edit Detailpage",
    }
});

const foodStore = useFoodStore();
const { reactiveOrderMenus } = storeToRefs(useFoodStore()); 


console.log(reactiveOrderMenus.value)

//To replace the data(){}
const CTAbutton = ref(null)
const progress = ref(false);
const menuNumberRef = ref(0)
const totalMenus = ref(
  ["poelier",
  "verse maaltijd deka",
  "verse slager maaltijd",
  "Soep met brood&smeersels",
  "Visboer gerecht",
  "Pannenkoeken & poffertjes",
  "Broodje hamburger",
  "Hotdogs",
  "Frituren",
  "Chickenwings"])

const intervalReducer = 0.5;
let intervalNumber = ref(500) // 1sec
const countdown = ref(5)
const intervalID = ref(0)
const menusReactive = reactive({
        param1: "some menu",
        param2: countdown.value,
        param3: [1,2,3,4],
    })
console.log(reactiveOrderMenus.value.length)


//METHODS
function getRandomInt(max:number) {
  return menuNumberRef.value = Math.floor(Math.random() * max);
}
//     for (var i = 0, randomIndex = 0; i < arr.length; i++) {


function giveNumber(){
  console.log(menuNumberRef.value)
  countdown.value--;
  // intervalNumber.value = intervalNumber.value*intervalReducer;
  console.log("new interval number", intervalNumber.value) // 0 
  return getRandomInt(reactiveOrderMenus.value.length);
}

function start(){
    console.log("start")
    CTAbutton.value.disabled=true;
   progress.value=true;
   intervalID.value = setInterval(giveNumber, intervalNumber.value, "Parameter 1", "Parameter 2");
 
}

function reset(){
  countdown.value = 5; 
  CTAbutton.value.disabled=false;
  progress.value = false;
  console.log("reset - triggered", countdown.value);
 // clearInterval(intervalID.value );
}

//COMPUTED
//const usernameState = computed(() => mapstState(voertuigStore, ["currentUser"]))
const computedMenuTotalMenus = computed(() => reactiveOrderMenus.value.length )
const computedMenuNumber = computed(  
    function compMenuNumb(){
      // console.log("totalMenus.value.length",menuNumberRef.value)
      console.log("giveNumber()", giveNumber())
      //return giveNumber();
    }
  )
const computeReducer = computed({
  get: () => intervalNumber * intervalReducer,
  set: (val) => {
    intervalNumber = val - 1
  }
})
//setting the computed() method 
//computeReducer.value = 1

//WATCHERS
watch(countdown, (choose, prevCount) => {
  if ( countdown.value == 0){
        console.log("watch - triggered clearInterval", countdown.value);
        clearInterval(intervalID.value );
        reset();   
    }
})

watch(menuNumberRef, (n) => {
  console.log("watch number")
  //gsap.to(totalMenus, { duration: 0.5, number: Number(n) || 0 })
  //replaces yourElement's text with "This is the new text" 
  gsap.to(".highlight", {duration: 1, text: reactiveOrderMenus.value[menuNumberRef.value], delay: 1});
})

onMounted(() => {
  console.log("on mounted",countdown.value )
  CTAbutton.value.className = 'true'
  CTAbutton.value.enabled= 'true'
})  
</script>

<template>
  <header>
    <h6>Totaal aantal menus: <span class="number">{{ computedMenuTotalMenus }} </span></h6>
    <h1>{{ msg }}
      <div id="highlight" class="highlight" > {{ totalMenus[menuNumberRef] }}</div>
      <!-- <Transition name="highlightTrans">
        <span v-if="!progress" class="highlight">{{ totalMenus[menuNumberRef] }}</span>
      </Transition> -->
    </h1>
  </header>

  <section class="content">
    <!-- <Transition>
      <p v-if="progress">
        <span id="myText">{{ totalMenus[menuNumberRef] }} </span>
      </p>
    </Transition> -->
    <!-- <div id="myText">wait 1 second please</div> -->
    <Transition name="fadeTrans"> 
        <span  v-if="!progress" class="questionmark">?</span>
    </Transition>
  </section>
  <section>
    <button ref="CTAbutton" type="button" enabled class="CTA" @click="start()">Wat koken we vandaag? </button>
  </section>
  <section class="menu">
    <h2>menu{{ menuNumberRef }}</h2>
    <h3>Ingredienten</h3>
    <h3>Beschrijving</h3>
  </section>
</template>

<style scoped lang="scss">
.highlightTrans-enter-active,
.highlightTrans-leave-active {
  transition: all 1.5s ease;
}

.highlightTrans-enter-from {
  transform: translateX(-1000px);
  opacity: 0;
}

.highlightTrans-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.highlightTrans-leave-to {
  opacity: 0;
  transform: translateX(1000px);
}

.fadeTrans-enter-active,
.fadeTrans-leave-active {
  transition: all 0.3s ease;
}

.fadeTrans-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.fadeTrans-enter-to {
  transform: translateY(0px);
  opacity: 1;
}

.fadeTrans-leave-to {
  transform: translateY(20px);
  opacity: 0;
}


//default vue class v-
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.v-enter-to {
  transform: translateY(0px);
  opacity: 1;
}

.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

header {
  margin-left: -1rem;
  margin-right: -1rem;
  min-height: 350px;
  background-color: #155f3e;
  display: flex;
  flex-direction: column;

  h1 {
    padding: 0rem 1rem;
    word-break:break-word;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #f2f2f2;
  }

  h6 {
    text-align: right;
    padding-right: 2rem;
    font-size: 1rem;
  }
}

.highlight {

  display: block;
}

p {
  // align-self: top;
  font-size: 2rem;
}

button {
  width: 300px;
  padding: 1rem;
  margin: 0 auto;
  align-self: end;
  border: solid 1px #35eb9a;
}

section {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  padding: 2rem;
  justify-content: flex-start;

  &.content {
    min-height: 200px;
    justify-content: center;
  }
}

.menu {
  padding: 2rem;
  background-color: #155f3e;
  color: #888;
}

.highlight {
  color: #35eb9a;
}

.questionmark {
  font-size: 9rem;
  font-weight: 600;
  width: 9rem;
  height: 9rem;
  position: relative;
  display: block;
  border-radius: 100%;
  border: solid 8px #155f3e;
  padding:0px;
  margin: 0px;
  line-height: 1em;
}
.number {
  // position: relative;
  // display: block;
  border-radius: 100%;
  border: solid 8px #155f3e;
  background-color: #242424;
  padding:0.5rem;
  margin: 0px;
  line-height: 1em;

}
</style>
